import joblib
import os

def load_model_and_scaler(category: str):
    try:
        # Tentukan path model berdasarkan kategori
        if category == "Beverage":
            model_path = os.path.abspath("backend/model/cityblock/Beverage_single_cityblock_model.pkl")
        elif category == "Bread":
            model_path = os.path.abspath("backend/model/cityblock/Bread_single_cityblock_model.pkl")
        elif category == "Dairy":
            model_path = os.path.abspath("backend/model/cosine/Dairy_average_cosine_model.pkl")
        elif category == "Dessert":
            model_path = os.path.abspath("backend/model/cosine/Dessert_average_cosine_model.pkl")
        elif category == "Fruits & Vegetables":
            model_path = os.path.abspath("backend/model/euclidean/Fruits__and__Vegetables_average_euclidean_model.pkl")
        elif category == "Grains":
            model_path = os.path.abspath("backend/model/cityblock/Grains_average_cityblock_model.pkl")
        elif category == "Lunch":
            model_path = os.path.abspath("backend/model/cosine/Lunch_average_cosine_model.pkl")
        elif category == "Meat":
            model_path = os.path.abspath("backend/model/cosine/Meat_average_cosine_model.pkl")
        elif category == "Pasta":
            model_path = os.path.abspath("backend/model/cosine/Pasta_complete_cosine_model.pkl")
        elif category == "Poultry":
            model_path = os.path.abspath("backend/model/cityblock/Poultry_average_cityblock_model.pkl")
        elif category == "Sauces and Dressings":
            model_path = os.path.abspath("backend/model/cityblock/Sauces_and_Dressings_average_cityblock_model.pkl")
        elif category == "Seafood":
            model_path = os.path.abspath("backend/model/cosine/Seafood_average_cosine_model.pkl")
        elif category == "Soup":
            model_path = os.path.abspath("backend/model/cityblock/Soup_single_cityblock_model.pkl")
        elif category == "Spreads":
            model_path = os.path.abspath("backend/model/cityblock/Spreads_single_cityblock_model.pkl")
        else:
            raise ValueError(f"Unknown category: {category}")

        # Load model dan scaler (scaler sama untuk semua)
        # model = joblib.load(model_path)
        # scaler = joblib.load("model/scaler.pkl")
        # return model, scaler
        model = joblib.load(model_path)
        return model
    
    except Exception as e:
        print(f"Error loading model or scaler for category {category}: {e}")
        raise e