# Étape de build
FROM node:18-alpine AS build

WORKDIR /app

# Copier les fichiers du projet
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Étape de production avec Nginx
FROM nginx:alpine

# Copier le build du frontend
COPY --from=build /app/out /usr/share/nginx/html

# Configuration de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]