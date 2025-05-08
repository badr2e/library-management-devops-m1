// src/components/books/BookList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Book } from "@/types";
import Button from "@/components/ui/Button";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface BookListProps {
  books: Book[];
  onDelete: (bookId: string) => void;
}

export default function BookList({ books, onDelete }: BookListProps) {
  const [filterTerm, setFilterTerm] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(filterTerm.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(filterTerm.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Liste des Livres
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher un livre..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <Link href="/books/add">
            <Button variant="primary">Ajouter un livre</Button>
          </Link>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">Aucun livre trouvé</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Titre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Auteur
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ISBN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Catégorie
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Disponibilité
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/books/${book.id}`}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {book.isbn || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {book.category || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {book.is_available ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Disponible
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Emprunté
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/books/edit/${book.id}`}>
                          <Button variant="secondary" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(book.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
