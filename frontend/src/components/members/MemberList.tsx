// src/components/members/MemberList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Member } from "@/types";
import Button from "@/components/ui/Button";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

interface MemberListProps {
  members: Member[];
  onDelete: (memberId: string) => void;
}

export default function MemberList({ members, onDelete }: MemberListProps) {
  const [filterTerm, setFilterTerm] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.first_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      (member.phone && member.phone.includes(filterTerm))
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Liste des Membres
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher un membre..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <Link href="/members/add">
            <Button variant="primary">Ajouter un membre</Button>
          </Link>
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-500">Aucun membre trouvé</p>
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
                    Nom
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Téléphone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID Card
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
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/members/${member.id}`}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        {member.first_name} {member.last_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.phone || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {member.id_card_number || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/members/edit/${member.id}`}>
                          <Button variant="secondary" size="sm">
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDelete(member.id)}
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
