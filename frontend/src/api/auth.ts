import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import client from "./client";
import { User } from "@/types/models";

export async function login(body: LoginSchema) {
  const response = await client.post<{
    type: string;
    token: string;
    expiresAt: string;
  }>("/auth/login", body);
  return response.data;
}

export async function register(body: RegisterSchema) {
  const response = await client.post("/users", body);
  return response.data as void;
}

export async function getCurrentUser() {
  const response = await client.get<User>("/auth/me");
  return response.data;
}
