import { CreateInstallmentDto } from "@/installments/dto";
import { BadRequestException } from "@nestjs/common";
import { addMonths, format, parseISO } from "date-fns";

export const generateInstallment = (dto: CreateInstallmentDto) => {
  const interestRate = 1.9;
  const monthlyPayment = Math.floor(
    Number(dto.totalAmount) / Number(dto.totalPayments),
  );
  const monthlyInterest = (Number(dto.totalAmount) / 100) * interestRate;
  const totalInterest = monthlyInterest * dto.totalPayments;

  const start = parseISO(dto.startDate);
  if (isNaN(start.getTime())) {
    throw new BadRequestException(
      "Invalid startDate format. Expected ISO format: 2024-03-18T00:00:00.000Z",
    );
  }
  const end = addMonths(start, Number(dto.totalPayments));
  const startDateSQL = format(start, "yyyy-MM-dd");
  const endDateSQL = format(end, "yyyy-MM-dd");

  return  {
    userId: dto.userId,
    startDate: startDateSQL,
    endDate: endDateSQL,
    totalAmount: Number(dto.totalAmount) + totalInterest,
    totalPayments: dto.totalPayments,
    monthlyPayment: monthlyPayment + monthlyInterest,
    description: dto.description.trim(),
  };
};