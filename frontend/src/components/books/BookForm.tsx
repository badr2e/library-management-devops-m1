// src/components/books/BookForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { BookFormData } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface BookFormProps {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export default function BookForm({
  initialData,
  onSubmit,
  isLoading = false,
  isEditMode = false,
}: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({
    defaultValues: initialData || {
      title: "",
      author: "",
      isbn: "",
      publication_year: undefined,
      category: "",
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="title"
          label="Titre *"
          error={errors.title?.message}
          {...register("title", { required: "Le titre est obligatoire" })}
        />

        <Input
          id="author"
          label="Auteur *"
          error={errors.author?.message}
          {...register("author", { required: "L'auteur est obligatoire" })}
        />

        <Input
          id="isbn"
          label="ISBN"
          error={errors.isbn?.message}
          {...register("isbn")}
        />

        <Input
          id="publication_year"
          label="Année de publication"
          type="number"
          error={errors.publication_year?.message}
          {...register("publication_year", {
            valueAsNumber: true,
            validate: (value) =>
              !value ||
              (value > 0 && value <= new Date().getFullYear()) ||
              "L'année doit être valide",
          })}
        />

        <Input
          id="category"
          label="Catégorie"
          error={errors.category?.message}
          {...register("category")}
        />

        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            {...register("description")}
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
