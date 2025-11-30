import { api } from "@/shared/api/axios";
import { AllIncomes } from "../model/types";

export const fetchAllIncomes = async (): Promise<AllIncomes> => {
  try {
    const response = await api.get("api/incomes/all/find");
    return response.data;
  } catch (err) {
    console.error("Failed to fetch incomes:", err);
    throw err;
  }
};

export const createRegularIncome = async (data: { amount: number; description: string }) => {
  try {
    const response = await api.post("api/incomes/regular/create", data);
    return response.data;
  } catch (err) {
    console.error("Failed to create regular income:", err);
    throw err;
  }
};

export const createEventIncome = async (data: { amount: number; description: string; date: string }) => {
  try {
    const response = await api.post("api/incomes/event/create", {
      ...data,
      date: new Date(data.date), // Convert string to Date object
    });
    return response.data;
  } catch (err) {
    console.error("Failed to create event income:", err);
    throw err;
  }
};

export const deleteRegularIncome = async (id: string) => {
  try {
    const response = await api.delete(`api/incomes/regular/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete regular income:", err);
    throw err;
  }
};

export const deleteEventIncome = async (id: string) => {
  try {
    const response = await api.delete(`api/incomes/event/${id}`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete event income:", err);
    throw err;
  }
};
