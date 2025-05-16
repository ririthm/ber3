import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances_argmin_min
from sqlalchemy import create_engine
from ..core.model_loader import load_model_and_scaler

# Koneksi ke database PostgreSQL
DATABASE_URL = "postgresql://postgres:wdd123@localhost:5432/NutriMatch"
engine = create_engine(DATABASE_URL)

def predict_and_get_recipes(category: str, user_features: dict):
    # 1. Load scaler (model tidak digunakan)
    model = load_model_and_scaler(category)

    # 2. Buat DataFrame dari input user
    features_df = pd.DataFrame([user_features])

    # 3. Gunakan data asli dari user (TANPA SCALING)
    user_data = features_df.values

    # 4. Kolom fitur nutrisi yang digunakan
    feature_cols = [
        'calories', 'fat_content', 'saturated_fat_content', 'cholesterol_content',
        'sodium_content', 'carbohydrate_content', 'fiber_content', 'sugar_content', 'protein_content'
    ]
    
    # 5. Ambil data resep dari database untuk kategori tertentu
    recipe_query = f"""
        SELECT recipe_id, name, description, cluster, {", ".join(feature_cols)}
        FROM recipes
        WHERE recipe_category = %s
    """
    recipes_df = pd.read_sql_query(recipe_query, engine, params=(category,))

    # 6. Validasi jika data resep kosong
    if recipes_df.empty:
        return {"error": f"No recipes found for category '{category}'"}

    # 7. Scaling hanya untuk data dari database
    db_features = recipes_df[feature_cols].values
    # db_scaled = scaler.transform(db_features)

    # 8. Cari resep terdekat dari input user
    closest_idx, _ = pairwise_distances_argmin_min(user_data, db_features)
    user_cluster = recipes_df.iloc[closest_idx[0]]['cluster']

    # 9. Filter semua resep dalam cluster yang sama
    cluster_recipes = recipes_df[recipes_df['cluster'] == user_cluster]

    # 10. Ambil 5 resep teratas
    top_recipes = cluster_recipes.head(15)

    # 11. Ambil bahan resep dari tabel ingredients
    recipe_ids = tuple(top_recipes['recipe_id'].tolist())
    ingredient_query = f"""
        SELECT recipe_id, ingredient_quantity, ingredient_parts
        FROM ingredients
        WHERE recipe_id IN {recipe_ids if len(recipe_ids) > 1 else f"({recipe_ids[0]},)"}
    """
    ingredients_df = pd.read_sql_query(ingredient_query, engine)

    # 12. Gabungkan data resep dan bahan ke hasil akhir
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