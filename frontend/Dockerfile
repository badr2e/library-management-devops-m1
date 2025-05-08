# Étape de build
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]