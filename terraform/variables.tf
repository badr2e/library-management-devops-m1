variable "project_id" {
  description = "L'ID du projet Google Cloud"
  type        = string
}

variable "region" {
  description = "La région Google Cloud à utiliser"
  type        = string
  default     = "europe-west1"
}

variable "zone" {
  description = "La zone Google Cloud à utiliser"
  type        = string
  default     = "europe-west1-b"
}

variable "firestore_location" {
  description = "Localisation de la base de données Firestore"
  type        = string
  default     = "eur3"
}