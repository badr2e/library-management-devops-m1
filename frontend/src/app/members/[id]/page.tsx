// src/app/members/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Member } from "@/types";
import { getMember, deleteMember } from "@/lib/api/memberService";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function MemberDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre ?")) {
      try {
        await deleteMember(id as string);
        toast.success("Membre supprimé avec succès");
        router.push("/members");
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

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Membre non trouvé</p>
            <Link href="/members">
              <Button>Retour à la liste</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {member.first_name} {member.last_name}
        </h1>
        <div className="flex space-x-2">
          <Link href={`/members/edit/${member.id}`}>
            <Button variant="secondary">
              <PencilIcon className="h-4 w-4 mr-1" />
              Modifier
            </Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            <TrashIcon className="h-4 w-4 mr-1" />
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Coordonnées</h3>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 font-medium">Email:</span>
                <p>{member.email}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">Téléphone:</span>
                <p>{member.phone || "-"}</p>
              </div>
              <div>
                <span className="text-gray-600 font-medium">
                  Numéro de carte d'identité:
                </span>
                <p>{member.id_card_number || "-"}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Adresse</h3>
            <p className="text-gray-600">
              {member.address || "Aucune adresse enregistrée"}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <div>
              <span className="text-gray-600 text-sm">
                Inscrit le: {new Date(member.created_at).toLocaleDateString()}
              </span>
              <br />
              <span className="text-gray-600 text-sm">
                Dernière mise à jour:{" "}
                {new Date(member.updated_at).toLocaleDateString()}
              </span>
            </div>
            <Link href="/members">
              <Button variant="secondary">Retour à la liste</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
