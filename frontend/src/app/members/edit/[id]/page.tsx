// src/app/members/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Member, MemberFormData } from "@/types";
import { getMember, updateMember } from "@/lib/api/memberService";
import MemberForm from "@/components/members/MemberForm";
import Card from "@/components/ui/Card";

export default function EditMemberPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchMember(id as string);
    }
  }, [id]);

  const fetchMember = async (memberId: string) => {
    try {
      setLoading(true);
      const data = await getMember(memberId);
      setMember(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du membre:", error);
      toast.error("Erreur lors du chargement du membre");
      router.push("/members");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: MemberFormData) => {
    try {
      setSubmitting(true);
      await updateMember(id as string, data);
      toast.success("Membre mis à jour avec succès");
      router.push(`/members/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du membre:", error);
      toast.error("Erreur lors de la mise à jour du membre");
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

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500">Membre non trouvé</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Modifier le membre
      </h1>
      <Card>
        <MemberForm
          initialData={member}
          onSubmit={handleSubmit}
          isLoading={submitting}
          isEditMode={true}
        />
      </Card>
    </div>
  );
}
