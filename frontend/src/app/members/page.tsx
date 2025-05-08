// src/app/members/page.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Member } from "@/types";
import { getMembers, deleteMember } from "@/lib/api/memberService";
import MemberList from "@/components/members/MemberList";
import Card from "@/components/ui/Card";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des membres:", error);
      toast.error("Erreur lors du chargement des membres");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (memberId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      try {
        await deleteMember(memberId);
        setMembers(members.filter((member) => member.id !== memberId));
        toast.success("Membre supprimé avec succès");
      } catch (error) {
        console.error("Erreur lors de la suppression du membre:", error);
        toast.error("Erreur lors de la suppression du membre");
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
        <MemberList members={members} onDelete={handleDelete} />
      </Card>
    </div>
  );
}
