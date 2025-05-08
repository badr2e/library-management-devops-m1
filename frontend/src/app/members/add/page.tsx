// src/app/members/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MemberFormData } from "@/types";
import { createMember } from "@/lib/api/memberService";
import MemberForm from "@/components/members/MemberForm";
import Card from "@/components/ui/Card";

export default function AddMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: MemberFormData) => {
    try {
      setLoading(true);
      await createMember(data);
      toast.success("Membre ajouté avec succès");
      router.push("/members");
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre:", error);
      toast.error("Erreur lors de l'ajout du membre");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Ajouter un membre
      </h1>
      <Card>
        <MemberForm onSubmit={handleSubmit} isLoading={loading} />
      </Card>
    </div>
  );
}
