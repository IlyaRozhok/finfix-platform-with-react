import { User } from "@/entities/user.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from "typeorm";

export enum CategoryKind {
  EXPENSE = "expense",
  INCOME = "income",
}

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id", type: "uuid", nullable: true })
  userId: string;

  @Index()
  @Column({ length: 64 })
  name: string;

  @Column({ name: "icon", nullable: true, type: "varchar", length: 32 })
  icon: string;
}
