// src/components/loans/LoanForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { LoanFormData, Book, Member } from "@/types";
import { getBooks } from "@/lib/api/bookService";
import { getMembers } from "@/lib/api/memberService";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { format, addDays } from "date-fns";

interface LoanFormProps {
  onSubmit: (data: LoanFormData) => void;
  isLoading?: boolean;
}

export default function LoanForm({
  onSubmit,
  isLoading = false,
}: LoanFormProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<LoanFormData>({
    defaultValues: {
      book_id: "",
      member_id: "",
      loan_date: format(new Date(), "yyyy-MM-dd"),
      due_date: format(addDays(new Date(), 14), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksData, membersData] = await Promise.all([
          getBooks(),
          getMembers(),
        ]);

        // Filtrer uniquement les livres disponibles
        const availableBooks = booksData.filter((book) => book.is_available);

        setBooks(availableBooks);
        setMembers(membersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Observer la date d'emprunt pour mettre à jour automatiquement la date d'échéance
  const loanDate = watch("loan_date");
  useEffect(() => {
    if (loanDate) {
      const dueDate = addDays(new Date(loanDate), 14);
      setValue("due_date", format(dueDate, "yyyy-MM-dd"));
    }
  }, [loanDate, setValue]);

  const bookOptions = books.map((book) => ({
    value: book.id,
    label: `${book.title} (${book.author})`,
  }));

  const memberOptions = members.map((member) => ({
    value: member.id,
    label: `${member.first_name} ${member.last_name} (${member.email})`,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {books.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucun livre disponible pour l&apos;emprunt. Assurez-vous que
                tous les livres ne sont pas déjà empruntés.
              </p>
            </div>
          </div>
        </div>
      )}

      {members.length === 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Aucun membre enregistré. Veuillez d&apos;abord ajouter des
                membres.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          id="book_id"
          label="Livre *"
          options={bookOptions}
          error={errors.book_id?.message}
          disabled={books.length === 0}
          {...register("book_id", {
            required: "Veuillez sélectionner un livre",
          })}
        />

        <Select
          id="member_id"
          label="Membre *"
          options={memberOptions}
          error={errors.member_id?.message}
          disabled={members.length === 0}
          {...register("member_id", {
            required: "Veuillez sélectionner un membre",
          })}
        />

        <Input
          id="loan_date"
          label="Date d'emprunt *"
          type="date"
          error={errors.loan_date?.message}
          {...register("loan_date", {
            required: "La date d'emprunt est obligatoire",
          })}
        />

        <Input
          id="due_date"
          label="Date d'échéance *"
          type="date"
          error={errors.due_date?.message}
          {...register("due_date", {
            required: "La date d'échéance est obligatoire",
          })}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={books.length === 0 || members.length === 0}
        >
          Enregistrer l&apos;emprunt
        </Button>
      </div>
    </form>
  );
}
