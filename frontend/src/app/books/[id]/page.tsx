// src/app/books/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Book } from "@/types";
import { getBook, deleteBook } from "@/lib/api/bookService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function BookDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBook(id as string);
    }
  }, [id]);

  const fetchBook = async (bookId: string) => {
    try {
      setLoading(true);
      const data = await getBook(bookId);
      setBook(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du livre:", error);
      toast.error("Erreur lors du chargement du livre");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      try {
        await deleteBook(id as string);
        toast.success("Livre supprimé avec succès");
        router.push("/books");
      } catch (error) {
        console.error("Erreur lors de la suppression du livre:", error);
        toast.error("Erreur lors de la suppression du livre");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Livre non trouvé</p>
            <Link href="/books">
              <Button>Retour à la liste</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
        <div className="flex space-x-2">
          <Link href={`/books/edit/${book.id}`}>
            <Button variant="secondary">
              <PencilIcon className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            <TrashIcon className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">Auteur:</span>
                <p>{book.author}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">ISBN:</span>
                <p>{book.isbn || "-"}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">
                  Année de publication:
                </span>
                <p>{book.publication_year || "-"}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Catégorie:</span>
                <p>{book.category || "-"}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">
                  Disponibilité:
                </span>
                <p>
                  {book.is_available ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Disponible
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Emprunté
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Description</h3>
            <p className="text-gray-600">
              {book.description || "Aucune description disponible"}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <div>
              <span className="text-gray-600 text-sm">
                Créé le: {new Date(book.created_at).toLocaleDateString()}
              </span>
              <br />
              <span className="text-gray-600 text-sm">
                Dernière mise à jour:{" "}
                {new Date(book.updated_at).toLocaleDateString()}
              </span>
            </div>
            <Link href="/books">
              <Button variant="secondary">Retour à la liste</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
