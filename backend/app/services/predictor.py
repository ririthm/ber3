import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from ..core.model_loader import load_model_and_scaler

# Koneksi ke database PostgreSQL
DATABASE_URL = "postgresql://postgres:riri1605@localhost:5432/NutriMatch"
engine = create_engine(DATABASE_URL)

def predict_and_get_recipes(category: str, user_features: dict):
    # 1. Load model, scaler, dan parameter fitur
    model, scaler, scaling_params = load_model_and_scaler(category)
    feature_cols = scaling_params["feature_names"]

    # 2. Validasi fitur input user
    missing = [f for f in feature_cols if f not in user_features]
    if missing:
        return {"error": f"Missing user input for features: {missing}"}

    # 3. Buat DataFrame dari input user dan scaling
    user_df = pd.DataFrame([user_features])
    scaled_user = scaler.transform(user_df[feature_cols])
    user_cluster = int(model.predict(scaled_user)[0])  # pastikan tipe int

    # === Cetak hasil cluster user ke terminal ===
    print(f"Predicted user cluster: {user_cluster}")

    # 4. Ambil data resep dari database berdasarkan kategori
    recipe_query = f"""
        SELECT recipe_id, name, description, cluster, {", ".join(feature_cols)}
        FROM recipes
        WHERE recipe_category = %s
    """
    recipes_df = pd.read_sql_query(recipe_query, engine, params=(category,))
    if recipes_df.empty:
        return {"error": f"No recipes found for category '{category}'"}

    recipes_df['cluster'] = recipes_df['cluster'].astype(int)

    # === Cetak semua cluster yang tersedia ===
    unique_clusters = recipes_df['cluster'].unique()
    print(f"Clusters available in DB: {np.sort(unique_clusters)}")

    # 5. Filter resep sesuai cluster user
    cluster_recipes = recipes_df[recipes_df['cluster'] == user_cluster]

    # 6. Fallback jika tidak ada resep di cluster tersebut
    if cluster_recipes.empty:
        most_common_cluster = recipes_df['cluster'].mode()[0]
        cluster_recipes = recipes_df[recipes_df['cluster'] == most_common_cluster]

    # 7. Scaling fitur resep untuk menghitung jarak
    db_features = scaler.transform(cluster_recipes[feature_cols])

    # 8. Hitung jarak terdekat
    sorted_indices = np.argsort(np.linalg.norm(db_features - scaled_user, axis=1))
    top_recipes = cluster_recipes.iloc[sorted_indices[:15]]

    # 9. Ambil bahan resep dari tabel ingredients
    recipe_ids = top_recipes['recipe_id'].tolist()
    if not recipe_ids:
        return []

    ingredient_query = """
        SELECT recipe_id, ingredient_quantity, ingredient_parts
        FROM ingredients
        WHERE recipe_id = ANY(%s)
    """
    ingredients_df = pd.read_sql_query(ingredient_query, engine, params=(recipe_ids,))

    # 10. Gabungkan hasil akhir
    results = []
    for _, row in top_recipes.iterrows():
        recipe_id = row['recipe_id']
        ingredients = ingredients_df[ingredients_df['recipe_id'] == recipe_id][[
            'ingredient_quantity', 'ingredient_parts'
        ]].to_dict(orient='records')

        result = {
            "recipe_id": recipe_id,
            "name": row["name"],
            "description": row["description"],
            "nutrition": {key: row[key] for key in feature_cols},
            "ingredients": ingredients
        }
        results.append(result)

    return results
