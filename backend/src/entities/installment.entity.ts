import { User } from "@/entities/user.entity";
import { Type } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";

@Entity("installments")
export class Installment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid" })
  userId: string;

  @ManyToOne(() => User, (u) => u.installments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "text" })
  description: string;

  @Index()
  @Column({ name: "start_date", type: "date" })
  startDate: string;

  @Index()
  @Column({ name: "end_date", type: "date" })
  endDate: string;

  @Type(() => Number)
  @Column({ name: "total_amount", type: "numeric", precision: 14, scale: 2 })
  totalAmount: number;

  @Type(() => Number)
  @Column({ name: "monthly_payment", type: "numeric", precision: 14, scale: 2 })
  monthlyPayment: number;

  @Type(() => Number)
  @Column({ name: "total_payments", type: "int" })
  totalPayments: number;

  @Column({ name: "status", type: "varchar", length: 50, default: "active" })
  status: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt: Date;
}
