import { api } from "@/shared/api/axios";
import { ReqUserCurrency } from "../model/types";

export const postUserCurrency = async (params: ReqUserCurrency) => {
  const { uid, currency } = params;
  try {
    const user = api.post("api/onboarding/currencies", { uid, currency });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
