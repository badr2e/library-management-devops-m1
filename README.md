# Système de Gestion de Bibliothèque

Un système complet pour gérer les livres, les membres et les emprunts d'une bibliothèque, avec un backend Flask et un frontend Next.js.
Le backend suit les normes PEP-8

## Technologies utilisées

### Backend

- Flask (Python)
- Google Cloud Firestore
- Flask-CORS

### Frontend

- Next.js (React)
- TypeScript
- Tailwind CSS
- Axios pour les appels API
- React Hook Form

### Infrastructure & Déploiement

- Google Cloud Platform (Cloud Run, Artifact Registry)
- Docker
- GitHub Actions (CI/CD)

## Structure du projet

```
├── backend/                    # API Flask
│   ├── models/                 # Modèles de données
│   ├── routes/                 # Routes API
│   ├── services/               # Services métier
│   ├── tests/                  # Tests unitaires et d'intégration
│   ├── app.py                  # Point d'entrée de l'application
│   ├── config.py               # Configuration
│   ├── requirements.txt        # Dépendances Python
│   └── Dockerfile              # Configuration Docker
│
├── frontend/                   # Application Next.js
│   ├── __tests__               # Tests frontend
│   ├── src/
│   │   ├── app/                # Pages de l'application
│   │   ├── components/         # Composants React
│   │   ├── lib/                # Utilitaires et services API
│   │   └── types/              # Définitions TypeScript
│   ├── public/                 # Fichiers statiques
│   ├── package.json            # Dépendances JavaScript
│   └── next.config.js          # Configuration Next.js
│
└── .github/
    └── workflows/              # Workflows GitHub Actions
        └── ci-cd.yml           # Pipeline CI/CD
```

## Fonctionnalités

- **Gestion des livres** : Ajouter, modifier, supprimer et consulter des livres
- **Gestion des membres** : Ajouter, modifier, supprimer et consulter des membres
- **Gestion des emprunts** : Enregistrer les emprunts et les retours de livres
- **Tableau de bord** : Visualiser les statistiques de la bibliothèque

## Installation et démarrage en local

### Prérequis

- Python 3.11+
- Node.js 18+
- Compte Google Cloud avec Firestore activé

### Backend

```bash
# Cloner le dépôt
git clone https://github.com/badr2e/library-management-devops-m1.git
cd library-management-devops-m1/backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer le fichier .env avec vos configurations

# Démarrer le serveur de développement
flask run
```

### Frontend

```bash
# Dans un nouveau terminal
cd library-management-devops-m1/frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer le fichier .env.local avec l'URL de votre API

# Démarrer le serveur de développement
npm run dev
```

## Déploiement

Le déploiement est automatisé via GitHub Actions. Le pipeline CI/CD gère la construction, les tests et le déploiement des applications frontend et backend sur Google Cloud Platform.

### Configuration du déploiement

1. Configurer le projet Google Cloud et activer les APIs nécessaires (Cloud Run, Artifact Registry)
2. Configurer les secrets GitHub Actions suivants :
   - `GCP_PROJECT_ID` : L'ID de votre projet Google Cloud
   - `GCP_SA_KEY` : La clé JSON de votre compte de service GCP avec les permissions nécessaires
3. Pousser vers la branche main pour déclencher le déploiement automatique

### Pipeline CI/CD

Notre pipeline CI/CD comprend les étapes suivantes :
1. Construction des images Docker du frontend et du backend
2. Exécution des tests automatisés
3. Publication des images sur Google Artifact Registry
4. Déploiement sur Google Cloud Run
5. Vérification post-déploiement et configuration de la surveillance

## Documentation API

### Livres

- `GET /api/books` : Liste tous les livres
- `GET /api/books/:id` : Récupère un livre par son ID
- `POST /api/books` : Ajoute un nouveau livre
- `PUT /api/books/:id` : Met à jour un livre existant
- `DELETE /api/books/:id` : Supprime un livre

### Membres

- `GET /api/members` : Liste tous les membres
- `GET /api/members/:id` : Récupère un membre par son ID
- `POST /api/members` : Ajoute un nouveau membre
- `PUT /api/members/:id` : Met à jour un membre existant
- `DELETE /api/members/:id` : Supprime un membre

### Emprunts

- `GET /api/loans` : Liste tous les emprunts
- `GET /api/loans/:id` : Récupère un emprunt par son ID
- `POST /api/loans` : Enregistre un nouvel emprunt
- `PUT /api/loans/:id/return` : Enregistre le retour d'un livre

### Statistiques

- `GET /api/stats` : Récupère les statistiques de la bibliothèque

## Licence

MIT License

Copyright (c) [2025] [Library Management Devops]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
