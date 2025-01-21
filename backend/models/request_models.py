from pydantic import BaseModel


class GeneratePostResponse(BaseModel):
    generated_text: str 