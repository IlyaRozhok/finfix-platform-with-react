import { Installment } from "../model/types";

export const newInstallmentPayload = (
  installments: Installment[],
  userId: string
) => {
  return installments.map((i) => {
    return {
      userId,
      description: i.description,
      startDate: i.startDate,
      totalAmount: i.totalAmount,
      totalPayments: i.totalPayments,
    };
  });
};
