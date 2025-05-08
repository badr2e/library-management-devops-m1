// src/app/loans/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LoanFormData } from "@/types";
import { createLoan } from "@/lib/api/loanService";
import LoanForm from "@/components/loans/LoanForm";
import Card from "@/components/ui/Card";

export default function AddLoanPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: LoanFormData) => {
    try {
      setLoading(true);
      await createLoan(data);
      toast.success("Emprunt enregistré avec succès");
      router.push("/loans");
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement de l'emprunt:", error);

      // Afficher un message d'erreur spécifique si le livre n'est pas disponible
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Ce livre n'est pas disponible"
      ) {
        toast.error("Ce livre n'est pas disponible pour l'emprunt.");
      } else {
        toast.error("Erreur lors de l'enregistrement de l'emprunt");
      }

      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nouvel Emprunt</h1>
      <Card>
        <LoanForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
}
