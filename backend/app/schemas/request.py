from pydantic import BaseModel

class PredictRequest(BaseModel):
    category: str
    calories: float
    fat_content: float
    saturated_fat_content: float
    cholesterol_content: float
    sodium_content: float
    carbohydrate_content: float
    fiber_content: float
    sugar_content: float
    protein_content: float