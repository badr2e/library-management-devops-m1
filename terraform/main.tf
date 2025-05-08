// main.tf
terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
  backend "gcs" {
    bucket = "library-management-terraform-state"
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# Activer les APIs nécessaires
resource "google_project_service" "firestore" {
  project = var.project_id
  service = "firestore.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}

resource "google_project_service" "run" {
  project = var.project_id
  service = "run.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}

resource "google_project_service" "artifactregistry" {
  project = var.project_id
  service = "artifactregistry.googleapis.com"

  disable_dependent_services = true
  disable_on_destroy         = false
}

# Base de données Firestore
resource "google_firestore_database" "database" {
  name        = "(default)"
  location_id = var.firestore_location
  type        = "FIRESTORE_NATIVE"

  depends_on = [google_project_service.firestore]
}

# Artifact Registry pour stocker les images Docker
resource "google_artifact_registry_repository" "repository" {
  provider = google
  location = var.region
  repository_id = "library-management"
  description = "Repository pour les images Docker de l'application de gestion de bibliothèque"
  format = "DOCKER"

  depends_on = [google_project_service.artifactregistry]
}

# Service Account pour le backend
resource "google_service_account" "backend_service_account" {
  account_id   = "library-backend-sa"
  display_name = "Service Account pour l'API de gestion de bibliothèque"
}

# Donner les permissions Firestore au service account
resource "google_project_iam_member" "firestore_user" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.backend_service_account.email}"
}

# Cloud Run service pour le backend
resource "google_cloud_run_service" "backend" {
  name     = "library-backend"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/library-backend:latest"
        
        env {
          name  = "PROJECT_ID"
          value = var.project_id
        }
      }
      service_account_name = google_service_account.backend_service_account.email
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_project_service.run]
}

# Rendre le backend publiquement accessible
resource "google_cloud_run_service_iam_member" "backend_public" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Storage bucket pour héberger le frontend
resource "google_storage_bucket" "frontend_bucket" {
  name          = "${var.project_id}-frontend"
  location      = var.region
  force_destroy = true

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  cors {
    origin          = ["*"]
    method          = ["GET", "HEAD", "OPTIONS"]
    response_header = ["*"]
    max_age_seconds = 3600
  }
}

# Rendre le bucket accessible publiquement
resource "google_storage_bucket_iam_member" "frontend_public" {
  bucket = google_storage_bucket.frontend_bucket.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Outputs
output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}

output "frontend_url" {
  value = "https://storage.googleapis.com/${google_storage_bucket.frontend_bucket.name}/index.html"
}