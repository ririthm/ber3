# NutriMatch: Food Recommendation System

NutriMatch is a food recommendation system that provides personalized meal suggestions based on users' nutritional preferences. The application is containerized using Docker and accessible through a user-friendly web interface, offering seamless and efficient food recommendations.

## Struktur File
```
.
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/
│   │   ├── main.py
│   │   ├── core/
│   │   │   └── model_loader.py
│   │   ├── schemas/
│   │   │   └── request.py
│   │   └── services/
│   │       └── predictor.py
│   └── model/
│       ├── scaler.pkl
│       ├── scaling_params.json
│       └── kmeans/
│           ├── Beverage_kmeans_model.pkl
│           ├── Bread_kmeans_model.pkl
│           ├── Dairy_kmeans_model.pkl
│           ├── Dessert_kmeans_model.pkl
│           ├── Fruits_and_Vegetables_kmeans_model.pkl
│           ├── Grains_kmeans_model.pkl
│           ├── Lunch_kmeans_model.pkl
│           ├── Meat_kmeans_model.pkl
│           ├── Pasta_kmeans_model.pkl
│           ├── Poultry_kmeans_model.pkl
│           ├── Sauces_and_Dressings_kmeans_model.pkl
│           ├── Seafood_kmeans_model.pkl
│           ├── Soup_kmeans_model.pkl
│           └── Spreads_kmeans_model.pkl
├── frontend/
│   ├── Dockerfile
│   ├── globals.css
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   │   │   └── recommendation/
│   │   │       └── route.ts
│   │   ├── faq/
│   │   │   └── page.tsx
│   │   └── recommendations/
│   │       └── page.tsx
│   ├── components/
│   │   ├── navbar.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── slider.tsx
│   ├── lib/
│   │   └── utils.ts
│   └── public/
│       ├── article-1.png
│       ├── article-2.png
│       ├── article-3.png
│       ├── food-hero.png
│       ├── logo-white-2.png
│       ├── logo-white.png
│       └── logo.png
├── .gitignore
├── docker-compose.yml
└── NutriMatch.sql
```

## Feature
- Food recommendation system using knowledge-based and content-based filtering
- PostgreSQL backend for data storage
- FastAPI backend
- Dockerized architecture with Docker Compose
- SQL import automation

## Model Overview
NutriMatch utilizes a knowledge-based and content-based recommender system trained on user-food interactions and nutritional profiles.

The system leverages:
- Clustering algorithms, with KMeans, to group similar food items based on their nutritional attributes, enabling better segmentation of user input.
- Euclidean distance as a similarity metric to measure how close food items are to user preference profiles within the feature space.
- Content-based filtering that recommends the top 15 food items with the lowest Euclidean distance, effectively suggesting nutritionally similar foods tailored to the user.

## Installation

1. Clone the repository
```bash
git clone https://github.com/ririthm/ber3.git
cd ber3
```
2. Start services using Docker Compose
```bash
docker-compose up --build
```
3. Open a new terminal window (keep the original terminal running Docker Compose open) to import SQL data into the running database container

3.1. Copy SQL file into the container
```bash
docker cp NutriMatch.sql ber3-db-1:/NutriMatch.sql
```
3.2. Enter the database container
```bash
docker exec -it ber3-db-1 bash
```
3.3. Create the database manually
```bash
psql -U postgres
```
```bash
CREATE DATABASE "NutriMatch";
\q
```
3.4 Execute SQL script
```bash
psql -U postgres -d NutriMatch -f /NutriMatch.sql
```
4. Access the Interface
- Open Docker Desktop and ensure containers are running.
- Navigate to the web interface
```bash
http://localhost:3002
```
- Navigate to the API with FastAPI
```bash
http://localhost:8000/docs
```

## Open the `predictions` Table 
1. Access the database container
```bash
docker exec -it ber3-db-1 bash
```
2. Open the PostgreSQL client connected to the `NutriMatch` database
```bash
psql -U postgres -d NutriMatch
```
3. List all tables
```bash
\dt
```
4. View the top 10 rows from the `predictions` table
```bash
SELECT * FROM predictions LIMIT 10;
```

## Contributing
- Fork this repository
- Create a new branch
- Make changes and commit
- Push and open a pull request

## License
This project is licensed under the BER3 Team Applied Data Science - Politeknik Elektronika Negeri Surabaya License.