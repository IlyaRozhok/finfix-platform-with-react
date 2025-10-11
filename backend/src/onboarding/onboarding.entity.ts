import { User } from "@/users/user.entity";
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

  // @ManyToOne(() => User, (u) => u.categories, { onDelete: "CASCADE" })
  // @JoinColumn({ name: "user_id" })
  // user: User;

  // @Column({ type: "enum", enum: CategoryKind, enumName: "category_kind" })
  // kind: CategoryKind;

  @Index()
  @Column({ length: 64 })
  name: string;

  // @Column({ name: "is_system", type: "boolean", default: false })
  // isSystem: boolean;
}
