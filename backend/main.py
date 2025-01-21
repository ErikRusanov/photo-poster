from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from services.image_processor import ImageProcessor
from services.text_generator import TextGenerator
from models.request_models import GeneratePostResponse
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI(title="Photo Poster API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
image_processor = ImageProcessor()
text_generator = TextGenerator()  # This will ensure the model is pulled

@app.post("/api/generate-post", response_model=GeneratePostResponse)
async def generate_post(image: UploadFile, description: str = None):
    """Generate a social media post from an image and optional description."""
    try:
        # Validate image
        if not image.content_type.startswith('image/'):
            raise HTTPException(
                status_code=415,
                detail="Uploaded file is not an image"
            )
        
        # Process image
        image_caption = await image_processor.process_image(image)
        
        # Generate post text
        post_text = await text_generator.generate_post(
            image_caption,
            description
        )
        
        return GeneratePostResponse(generated_text=post_text)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/models")
async def list_models():
    """List available Ollama models."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("http://localhost:11434/api/tags")
            if response.status_code != 200:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to fetch models"
                )
            return response.json()
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching models: {str(e)}"
        )

@app.post("/api/models/pull/{model_name}")
async def pull_model(model_name: str):
    """Pull a new model from Ollama."""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:11434/api/pull",
                json={"name": model_name}
            )
            if response.status_code != 200:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to pull model"
                )
            return {"message": f"Model {model_name} pulled successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error pulling model: {str(e)}"
        )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 