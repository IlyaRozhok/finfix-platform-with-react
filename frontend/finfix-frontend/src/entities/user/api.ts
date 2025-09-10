import { api } from "@/shared/api/axios";
import type { User } from "./model";

export async function getMe(): Promise<User | null> {
  try {
    const { data } = await api.get("/api/auth/me");
    return data as User;
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await api.post("/api/auth/logout");
}
