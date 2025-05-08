// src/app/books/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Book } from "@/types";
import { getBooks, deleteBook } from "@/lib/api/bookService";
import BookList from "@/components/books/BookList";
import Card from "@/components/ui/Card";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
      toast.error("Erreur lors du chargement des livres");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
      try {
        await deleteBook(bookId);
        setBooks(books.filter((book) => book.id !== bookId));
        toast.success("Livre supprimé avec succès");
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

  return (
    <div className="max-w-7xl mx-auto">
      <Card>
        <BookList books={books} onDelete={handleDelete} />
      </Card>
    </div>
  );
}
