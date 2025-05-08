import { Loan, LoanFormData } from "@/types";
import apiClient from "./axios";

export const getLoans = async (): Promise<Loan[]> => {
  const response = await apiClient.get("/loans");
  return response.data;
};

export const getLoan = async (id: string): Promise<Loan> => {
  const response = await apiClient.get(`/loans/${id}`);
  return response.data;
};

export const createLoan = async (loanData: LoanFormData): Promise<Loan> => {
  const response = await apiClient.post("/loans", loanData);
  return response.data;
};

export const returnLoan = async (id: string): Promise<Loan> => {
  const response = await apiClient.put(`/loans/${id}/return`, {});
  return response.data;
};
