// src/lib/api/bookService.ts
import { Book, BookFormData } from "@/types";
import apiClient from "./axios";

export const getBooks = async (): Promise<Book[]> => {
  const response = await apiClient.get("/books");
  return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  const response = await apiClient.post("/books", bookData);
  return response.data;
};

export const updateBook = async (
  id: string,
  bookData: Partial<BookFormData>
): Promise<Book> => {
  const response = await apiClient.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await apiClient.delete(`/books/${id}`);
};
