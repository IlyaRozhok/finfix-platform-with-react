import { Debt } from "@/entities/debts/model";
import { ReqCreateDebt } from "../model/types";

export const prepareNewDebtsForApi = (
  debts: Debt[],
  userId: string
): ReqCreateDebt[] => {
  return debts
    .filter((debt) => !debt.id)
    .map((debt) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = debt;
      return {
        ...rest,
        userId: userId,
      };
    });
};
