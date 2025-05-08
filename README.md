# Système de Gestion de Bibliothèque

Un système complet pour gérer les livres, les membres et les emprunts d'une bibliothèque, avec un backend Flask et un frontend Next.js.

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

- Google Cloud Platform
- Terraform
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
│   ├── src/
│   │   ├── app/                # Pages de l'application
│   │   ├── components/         # Composants React
│   │   ├── lib/                # Utilitaires et services API
│   │   └── types/              # Définitions TypeScript
│   ├── public/                 # Fichiers statiques
│   ├── package.json            # Dépendances JavaScript
│   └── next.config.js          # Configuration Next.js
│
├── terraform/                  # Infrastructure as Code
│   ├── main.tf                 # Configuration principale
│   ├── variables.tf            # Définition des variables
│   └── terraform.tfvars        # Valeurs des variables
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
git clone https://github.com/username/library-management-system.git
cd library-management-system/backend

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
cd library-management-system/frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer le fichier .env.local avec l'URL de votre API

# Démarrer le serveur de développement
npm run dev
```

## Déploiement

Le déploiement est automatisé via GitHub Actions et Terraform. Consultez le guide de déploiement dans le dossier `terraform/` pour plus de détails.

### Configuration du déploiement

1. Configurer le projet Google Cloud et activer les APIs nécessaires
2. Configurer les secrets GitHub Actions
3. Pousser vers la branche main pour déclencher le déploiement automatique

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

MIT
