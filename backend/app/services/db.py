import psycopg2

def get_recipe_details(recipe_id: int):
    conn = psycopg2.connect(
        dbname="NutriMatch",
        user="postgres",
        password="riri1605",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()

    query = """
    SELECT r.description, i.ingredient_parts, i.ingredient_quantity
    FROM recipes r
    JOIN ingredients i ON r.recipe_id = i.recipe_id
    WHERE r.recipe_id = %s
    """

    cursor.execute(query, (recipe_id,))
    rows = cursor.fetchall()
    conn.close()

    if not rows:
        return None

    return {
        "description": rows[0][0],
        "ingredients": [
            {"ingredient_parts": row[1], "ingredient_quantity": row[2]}
            for row in rows
        ]
    }
