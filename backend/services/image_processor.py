from fastapi import UploadFile, HTTPException
from transformers import AutoProcessor, AutoModelForImageTextToText
from PIL import Image
import io
import torch


class ImageProcessor:
    def __init__(self):
        try:
            self.processor = AutoProcessor.from_pretrained(
                "Salesforce/blip-image-captioning-base"
            )
            self.model = AutoModelForImageTextToText.from_pretrained(
                "Salesforce/blip-image-captioning-base"
            )
            if torch.cuda.is_available():
                self.model = self.model.to("cuda")
        except Exception as e:
            raise Exception(f"Failed to load BLIP model: {str(e)}")

    async def process_image(self, image: UploadFile) -> str:
        """Process an image and return its caption."""
        try:
            # Read and process image
            image_content = await image.read()
            pil_image = Image.open(io.BytesIO(image_content))
            
            # Convert RGBA to RGB if necessary
            if pil_image.mode == 'RGBA':
                pil_image = pil_image.convert('RGB')
            
            # Process image with BLIP
            inputs = self.processor(pil_image, return_tensors="pt")
            if torch.cuda.is_available():
                inputs = {k: v.to("cuda") for k, v in inputs.items()}
            
            # Generate caption
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=50
            )
            caption = self.processor.decode(
                outputs[0],
                skip_special_tokens=True
            )
            
            return caption
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error processing image: {str(e)}"
            ) 