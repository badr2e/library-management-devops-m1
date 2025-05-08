FROM python:3.11-slim

WORKDIR /app

# Installer les dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code
COPY . .

# Variables d'environnement
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PORT=8080

# Exposition du port
EXPOSE 8080

# Commande de démarrage
CMD exec gunicorn --bind 0.0.0.0:$PORT app:app