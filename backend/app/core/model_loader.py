import joblib

def load_model_and_scaler(category: str):
    try:
        # Tentukan path model berdasarkan kategori
        if category == "Beverage":
            model_path = "model/cityblock/Beverage_single_cityblock_model.pkl"
        elif category == "Bread":
            model_path = "model/cityblock/Bread_single_cityblock_model.pkl"
        elif category == "Dairy":
            model_path = "model/cosine/Dairy_average_cosine_model.pkl"
        elif category == "Dessert":
            model_path = "model/cosine/Dessert_average_cosine_model.pkl"
        elif category == "Fruits_and_Vegetables":
            model_path = "model/euclidean/Fruits__and__Vegetables_average_euclidean_model.pkl"
        elif category == "Grains":
            model_path = "model/cityblock/Grains_average_cityblock_model.pkl"
        elif category == "Lunch":
            model_path = "model/cosine/Lunch_average_cosine_model.pkl"
        elif category == "Meat":
            model_path = "model/cosine/Meat_average_cosine_model.pkl"
        elif category == "Pasta":
            model_path = "model/cosine/Pasta_complete_cosine_model.pkl"
        elif category == "Poultry":
            model_path = "model/cityblock/Poultry_average_cityblock_model.pkl"
        elif category == "Sauces and Dressings":
            model_path = "model/cityblock/Sauces_and_Dressings_average_cityblock_model.pkl"
        elif category == "Seafood":
            model_path = "model/cosine/Seafoodt_average_cosine_model.pkl"
        elif category == "Soup":
            model_path = "model/cityblock/Soup_single_cityblock_model.pkl"
        elif category == "Spreads":
            model_path = "model/cityblock/Spreads_single_cityblock_model.pkl"
        else:
            raise ValueError(f"Unknown category: {category}")

        # Load model dan scaler (scaler sama untuk semua)
        model = joblib.load(model_path)
        scaler = joblib.load("model/scaler.pkl")
        return model, scaler
    
    except Exception as e:
        print(f"Error loading model or scaler for category {category}: {e}")
        raise e