// src/components/loans/LoanList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { format, isAfter } from "date-fns";
import { fr } from "date-fns/locale";
import { Loan, Book, Member } from "@/types";
import Button from "@/components/ui/Button";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface LoanListProps {
  loans: Loan[];
  books: Book[];
  members: Member[];
  onReturn: (loanId: string) => void;
}

export default function LoanList({
  loans,
  books,
  members,
  onReturn,
}: LoanListProps) {
  const [filterTerm, setFilterTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fonction pour obtenir des informations sur les livres et les membres
  const getBookTitle = (bookId: string): string => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.title : "Livre inconnu";
  };

  const getMemberName = (memberId: string): string => {
    const member = members.find((m) => m.id === memberId);
    return member
      ? `${member.first_name} ${member.last_name}`
      : "Membre inconnu";
  };

  // Filtrer les emprunts
  const filteredLoans = loans.filter((loan) => {
    // Filtre par terme de recherche (titre du livre ou nom du membre)
    const searchMatch =
      getBookTitle(loan.book_id)
        .toLowerCase()
        .includes(filterTerm.toLowerCase()) ||
      getMemberName(loan.member_id)
        .toLowerCase()
        .includes(filterTerm.toLowerCase());

    // Filtre par statut
    let statusMatch = true;
    if (filterStatus === "active") {
      statusMatch = !loan.returned;
    } else if (filterStatus === "returned") {
      statusMatch = loan.returned;
    } else if (filterStatus === "overdue") {
      statusMatch = !loan.returned && loan.is_overdue;
    }

    return searchMatch && statusMatch;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Liste des Emprunts
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="returned">Retournés</option>
              <option value="overdue">En retard</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
          </div>
          <Link href="/loans/add">
            <Button variant="primary">Nouveau Emprunt</Button>
          </Link>
        </div>
      </div>

      {filteredLoans.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">Aucun emprunt trouvé</p>
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
                    Livre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Membre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date d'emprunt
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date d'échéance
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Statut
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
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/books/${loan.book_id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {getBookTitle(loan.book_id)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/members/${loan.member_id}`}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        {getMemberName(loan.member_id)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {format(new Date(loan.loan_date), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {format(new Date(loan.due_date), "dd MMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {loan.returned ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Retourné le{" "}
                          {loan.return_date
                            ? format(
                                new Date(loan.return_date),
                                "dd MMM yyyy",
                                { locale: fr }
                              )
                            : "-"}
                        </span>
                      ) : loan.is_overdue ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          En retard
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          En cours
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!loan.returned && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => onReturn(loan.id)}
                        >
                          <ArrowPathIcon className="h-4 w-4 mr-1" />
                          Retourner
                        </Button>
                      )}
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
