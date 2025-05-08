// src/types/index.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  publication_year?: number;
  category?: string;
  description?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  id_card_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: string;
  book_id: string;
  member_id: string;
  loan_date: string;
  due_date: string;
  return_date?: string;
  returned: boolean;
  is_overdue: boolean;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn?: string;
  publication_year?: number;
  category?: string;
  description?: string;
}

export interface MemberFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  id_card_number?: string;
}

export interface LoanFormData {
  book_id: string;
  member_id: string;
  loan_date?: string;
  due_date?: string;
}

export interface Stats {
  totalBooks: number;
  availableBooks: number;
  totalMembers: number;
  activeLoans: number;
}
