// src/app/loans/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Loan, Book, Member } from "@/types";
import { getLoans, returnLoan } from "@/lib/api/loanService";
import { getBooks } from "@/lib/api/bookService";
import { getMembers } from "@/lib/api/memberService";
import LoanList from "@/components/loans/LoanList";
import Card from "@/components/ui/Card";

export default function LoansPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [loansData, booksData, membersData] = await Promise.all([
        getLoans(),
        getBooks(),
        getMembers(),
      ]);
      setLoans(loansData);
      setBooks(booksData);
      setMembers(membersData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      toast.error("Erreur lors du chargement des données");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId: string) => {
    if (window.confirm("Confirmez-vous le retour de ce livre ?")) {
      try {
        const updatedLoan = await returnLoan(loanId);

        // Mettre à jour la liste des emprunts
        setLoans(
          loans.map((loan) => (loan.id === loanId ? updatedLoan : loan))
        );

        // Mettre à jour le statut du livre
        setBooks(
          books.map((book) =>
            book.id === updatedLoan.book_id
              ? { ...book, is_available: true }
              : book
          )
        );

        toast.success("Livre retourné avec succès");
      } catch (error) {
        console.error("Erreur lors du retour du livre:", error);
        toast.error("Erreur lors du retour du livre");
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
        <LoanList
          loans={loans}
          books={books}
          members={members}
          onReturn={handleReturn}
        />
      </Card>
    </div>
  );
}
