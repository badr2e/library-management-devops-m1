// src/components/members/MemberForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { MemberFormData } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface MemberFormProps {
  initialData?: Partial<MemberFormData>;
  onSubmit: (data: MemberFormData) => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export default function MemberForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditMode = false,
}: MemberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberFormData>({
    defaultValues: initialData || {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      id_card_number: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="first_name"
          label="Prénom *"
          error={errors.first_name?.message}
          {...register("first_name", { required: "Le prénom est obligatoire" })}
        />

        <Input
          id="last_name"
          label="Nom *"
          error={errors.last_name?.message}
          {...register("last_name", { required: "Le nom est obligatoire" })}
        />

        <Input
          id="email"
          label="Email *"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "L'email est obligatoire",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Veuillez entrer un email valide",
            },
          })}
        />

        <Input
          id="phone"
          label="Téléphone"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          id="id_card_number"
          label="Numéro de carte d'identité"
          error={errors.id_card_number?.message}
          {...register("id_card_number")}
        />

        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adresse
          </label>
          <textarea
            id="address"
            rows={3}
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            {...register("address")}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Annuler
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEditMode ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
