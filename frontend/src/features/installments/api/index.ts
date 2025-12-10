import { api } from "@/shared/api/axios";
import { Installment } from "../model/types";

export const fetchUserInstallments = async (): Promise<Installment[]> => {
  try {
    const response = await api.get("api/installments");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch user installments:", err);
    throw err;
  }
};
