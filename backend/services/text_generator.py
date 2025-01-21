import os
import httpx
from fastapi import HTTPException
from dotenv import load_dotenv

load_dotenv()

class TextGenerator:
    def __init__(self):
        self.api_url = "http://localhost:11434/api/generate"
        self.model = os.getenv("OLLAMA_MODEL", "llama2")  # Default to "llama2" if not set

    async def ensure_model_pulled(self):
        """Ensure the model is pulled from Ollama"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "http://localhost:11434/api/pull",
                    json={"name": self.model}
                )
                if response.status_code != 200:
                    raise HTTPException(status_code=500, detail=f"Failed to pull model {self.model}")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error pulling model {self.model}: {str(e)}")

    async def generate_post(self, image_caption: str, description: str = None) -> str:
        """Generate a social media post based on image caption and description."""
        await self.ensure_model_pulled()
        try:
            # Prepare prompt
            context = f"Image description: {image_caption}"
            if description:
                context += f"\nAdditional context: {description}"
                
            prompt = (
                f"Based on this context: {context}\n\n"
                "Generate an engaging social media post that captures the essence "
                "of the image and resonates with the audience. The post should be "
                "creative, authentic, and suitable for platforms like Instagram or "
                "Telegram. Keep the tone natural and engaging. Include relevant "
                "emotional elements where appropriate.\n\n"
                "Generate only the post text without any explanations or "
                "additional formatting."
            )

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    self.api_url,
                    json={
                        "model": self.model,
                        "prompt": prompt,
                        "system": "You are a creative social media content writer."
                    },
                    timeout=30.0
                )
                
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=500,
                        detail=f"Error from Ollama API: {response.text}"
                    )
                
                return response.json()["response"].strip()
                
        except httpx.TimeoutException:
            raise HTTPException(
                status_code=504,
                detail="Request to Ollama API timed out"
            )
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error generating post: {str(e)}"
            ) 