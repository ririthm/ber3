import pandas as pd
import numpy as np
import json
from sqlalchemy import create_engine, text
from ..core.model_loader import load_model_and_scaler

# Koneksi ke database PostgreSQL
DATABASE_URL = "postgresql://postgres:wdd123@localhost:5432/NutriMatch"
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

    # 7. Scaling fitur resep untuk menghitung jarak
    db_features = scaler.transform(cluster_recipes[feature_cols])

    # 8. Hitung jarak terdekat maksimal 15
    distances = np.linalg.norm(db_features - scaled_user, axis=1)
    sorted_indices = np.argsort(distances)
    top_recipes = cluster_recipes.iloc[sorted_indices[:15]]

    # Siapkan data untuk disimpan (gunakan array/list)
    recipe_ids = [row['recipe_id'] for _, row in top_recipes.iterrows()]
    recipe_names = [row['name'] for _, row in top_recipes.iterrows()]
    similarity_scores = []

    # Hitung skor kecocokan berdasarkan jarak
    for distance in distances[sorted_indices[:15]]:
        similarity_score = round(1 / (1 + distance) * 100, 2)
        similarity_scores.append(similarity_score)

    # 9. Simpan input user, user cluster, dan top recipes dalam tabel predictions
    insert_query = """
        INSERT INTO predictions (category, calories, fat_content, saturated_fat_content, cholesterol_content,
                                sodium_content, carbohydrate_content, fiber_content, sugar_content, protein_content,    
                                user_cluster, recipe_ids, recipe_names, similarity_scores)
        VALUES (:category, :calories, :fat_content, :saturated_fat_content, :cholesterol_content,        
                :sodium_content, :carbohydrate_content, :fiber_content, :sugar_content, :protein_content,
                :user_cluster, :recipe_ids, :recipe_names, :similarity_scores)
    """

    # Menyimpan hanya satu baris
    with engine.connect() as connection:
        with connection.begin():  # Memastikan transaksi di-commit
            connection.execute(text(insert_query), {
                "category": category,
                "calories": user_features.get('calories', None),
                "fat_content": user_features.get('fat_content', None),
                "saturated_fat_content": user_features.get('saturated_fat_content', None),
                "cholesterol_content": user_features.get('cholesterol_content', None),
                "sodium_content": user_features.get('sodium_content', None),
                "carbohydrate_content": user_features.get('carbohydrate_content', None),
                "fiber_content": user_features.get('fiber_content', None),
                "sugar_content": user_features.get('sugar_content', None),
                "protein_content": user_features.get('protein_content', None),
                "user_cluster": user_cluster,
                "recipe_ids": json.dumps(recipe_ids),  # Menyimpan sebagai JSON array
                "recipe_names": json.dumps(recipe_names),  # Menyimpan sebagai JSON array
                "similarity_scores": json.dumps(similarity_scores)  # Menyimpan sebagai JSON array
            })

    # 10. Ambil bahan resep dari tabel ingredients
    recipe_ids_str = ','.join(map(str, recipe_ids))  # Convert to string for SQL
    ingredient_query = f"""
        SELECT recipe_id, ingredient_quantity, ingredient_parts
        FROM ingredients
        WHERE recipe_id = ANY(ARRAY[{recipe_ids_str}])
    """
    ingredients_df = pd.read_sql_query(ingredient_query, engine)

    # 11. Gabungkan hasil akhir
    results = []
    for i, row in enumerate(top_recipes.iterrows()):
        recipe_id = row[1]['recipe_id']
        ingredients = ingredients_df[ingredients_df['recipe_id'] == recipe_id][[
            'ingredient_quantity', 'ingredient_parts'
        ]].to_dict(orient='records')

        result = {
            "recipe_id": recipe_id,
            "name": row[1]["name"],
            "description": row[1]["description"],
            "nutrition": {key: row[1][key] for key in feature_cols},
            "ingredients": ingredients,
            "similarity": similarity_scores[i]  # Add similarity percentage for each recipe
        }
        results.append(result)

    return results