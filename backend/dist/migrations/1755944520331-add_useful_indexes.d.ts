import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddUsefulIndexes1755944520331 implements MigrationInterface {
    name: string;
    up(q: QueryRunner): Promise<void>;
    down(q: QueryRunner): Promise<void>;
}
