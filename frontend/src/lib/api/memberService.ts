// src/lib/api/memberService.ts
import { Member, MemberFormData } from "@/types";
import apiClient from "./axios";

export const getMembers = async (): Promise<Member[]> => {
  const response = await apiClient.get("/members");
  return response.data;
};

export const getMember = async (id: string): Promise<Member> => {
  const response = await apiClient.get(`/members/${id}`);
  return response.data;
};

export const createMember = async (
  memberData: MemberFormData
): Promise<Member> => {
  const response = await apiClient.post("/members", memberData);
  return response.data;
};

export const updateMember = async (
  id: string,
  memberData: Partial<MemberFormData>
): Promise<Member> => {
  const response = await apiClient.put(`/members/${id}`, memberData);
  return response.data;
};

export const deleteMember = async (id: string): Promise<void> => {
  await apiClient.delete(`/members/${id}`);
};
