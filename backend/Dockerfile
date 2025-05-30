# Gunakan image Python
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy semua file
COPY . .

# Install dependensi
RUN pip install --no-cache-dir -r requirements.txt

# Expose port FastAPI
EXPOSE 8000

# Jalankan uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
