// src/app/books/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BookFormData } from "@/types";
import { createBook } from "@/lib/api/bookService";
import BookForm from "@/components/books/BookForm";
import Card from "@/components/ui/Card";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BookFormData) => {
    try {
      setLoading(true);
      await createBook(data);
      toast.success("Livre ajouté avec succès");
      router.push("/books");
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre:", error);
      toast.error("Erreur lors de l'ajout du livre");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Ajouter un livre
      </h1>
      <Card>
        <BookForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
}
