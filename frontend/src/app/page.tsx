// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStats } from "@/lib/api/statsService";
import { Stats } from "@/types";
import {
  BookOpenIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des statistiques:", err);
        setError("Impossible de charger les statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-800">
                  <BookOpenIcon className="h-8 w-8" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm">Total des livres</p>
                  <h3 className="font-bold text-3xl text-gray-700">
                    {stats?.totalBooks || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-800">
                  <CheckCircleIcon className="h-8 w-8" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm">Livres disponibles</p>
                  <h3 className="font-bold text-3xl text-gray-700">
                    {stats?.availableBooks || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-800">
                  <UserGroupIcon className="h-8 w-8" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm">Total des membres</p>
                  <h3 className="font-bold text-3xl text-gray-700">
                    {stats?.totalMembers || 0}
                  </h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-100 text-amber-800">
                  <ClipboardDocumentListIcon className="h-8 w-8" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 text-sm">Emprunts actifs</p>
                  <h3 className="font-bold text-3xl text-gray-700">
                    {stats?.activeLoans || 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Accès rapide</h3>
              <div className="space-y-4">
                <Link
                  href="/books/add"
                  className="btn btn-primary block text-center"
                >
                  Ajouter un livre
                </Link>
                <Link
                  href="/members/add"
                  className="btn btn-primary block text-center"
                >
                  Ajouter un membre
                </Link>
                <Link
                  href="/loans/add"
                  className="btn btn-primary block text-center"
                >
                  Enregistrer un emprunt
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">
                Système de Gestion de Bibliothèque
              </h3>
              <p className="text-gray-600 mb-4">
                Bienvenue dans votre système de gestion de bibliothèque. Cette
                application vous permet de:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Gérer votre catalogue de livres</li>
                <li>Suivre les adhésions de vos membres</li>
                <li>Gérer les emprunts et retours</li>
                <li>Consulter des statistiques sur votre bibliothèque</li>
              </ul>
              <p className="mt-4 text-gray-600">
                Utilisez la barre latérale pour naviguer entre les différentes
                sections de l&apos;application.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
