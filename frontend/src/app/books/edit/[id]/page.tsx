"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Book, BookFormData } from "@/types";
import { getBook, updateBook } from "@/lib/api/bookService";
import BookForm from "@/components/books/BookForm";
import Card from "@/components/ui/Card";

export default function EditBookPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
      router.push("/books");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: BookFormData) => {
    try {
      setSubmitting(true);
      await updateBook(id as string, data);
      toast.success("Livre mis à jour avec succès");
      router.push(`/books/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du livre:", error);
      toast.error("Erreur lors de la mise à jour du livre");
      setSubmitting(false);
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
            <p className="text-gray-500">Livre non trouvé</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Modifier le livre
      </h1>
      <Card>
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          isLoading={submitting}
          isEditMode={true}
        />
      </Card>
    </div>
  );
}
