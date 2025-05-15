from fastapi import FastAPI, HTTPException
from app.schemas.request import PredictRequest
from app.services.predictor import predict_and_get_recipes

app = FastAPI()

@app.post("/predict")
async def predict(request: PredictRequest):
    try:
        user_features = {
            "calories": request.calories,
            "fat_content": request.fat_content,
            "saturated_fat_content": request.saturated_fat_content,
            "cholesterol_content": request.cholesterol_content,
            "sodium_content": request.sodium_content,
            "carbohydrate_content": request.carbohydrate_content,
            "fiber_content": request.fiber_content,
            "sugar_content": request.sugar_content,
            "protein_content": request.protein_content,
        }
        result = predict_and_get_recipes(request.category, user_features)
        
        if "error" in result:
            raise HTTPException(status_code=404, detail=result["error"])
        
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
