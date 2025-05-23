import joblib
import os
import json

def load_model_and_scaler(category: str):
    try:
        category_map = {
            "Beverage": "Beverage_kmeans_model.pkl",
            "Bread": "Bread_kmeans_model.pkl",
            "Dairy": "Dairy_kmeans_model.pkl",
            "Dessert": "Dessert_kmeans_model.pkl",
            "Fruits & Vegetables": "Fruits__and__Vegetables_kmeans_model.pkl",
            "Grains": "Grains_kmeans_model.pkl",
            "Lunch": "Lunch_kmeans_model.pkl",
            "Meat": "Meat_kmeans_model.pkl",
            "Pasta": "Pasta_kmeans_model.pkl",
            "Poultry": "Poultry_kmeans_model.pkl",
            "Sauces and Dressings": "Sauces_and_Dressings_kmeans_model.pkl",
            "Seafood": "Seafood_kmeans_model.pkl",
            "Soup": "Soup_kmeans_model.pkl",
            "Spreads": "Spreads_kmeans_model.pkl"
        }

        if category not in category_map:
            raise ValueError(f"Unknown category: {category}")

        model_path = os.path.abspath(os.path.join("model/kmeans", category_map[category]))
        scaler_path = os.path.abspath("model/scaler.pkl")
        scaling_params_path = os.path.abspath("model/scaling_params.json")

        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)

        with open(scaling_params_path, "r") as f:
            scaling_params = json.load(f)

        return model, scaler, scaling_params

    except Exception as e:
        print(f"Error loading model or scaler for category '{category}': {e}")
        raise
