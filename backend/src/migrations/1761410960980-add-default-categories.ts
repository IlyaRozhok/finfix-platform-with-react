import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultCategories1761410960980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Insert default categories
    const categories = [
      { name: "House" },
      { name: "Food & Drinks" },
      { name: "Transport" },
      { name: "Restaurant" },
      { name: "Coffee or snacks" },
      { name: "Sport" },
      { name: "Health" },
      { name: "Personal Care" },
      { name: "Cinema" },
      { name: "Gifts" },
      { name: "Telecommunication" },
      { name: "Emergency fund" },
      { name: "Family" },
    ];

    for (const category of categories) {
      await queryRunner.query(
        `INSERT INTO "categories" ("name", "user_id") VALUES ($1, NULL)`,
        [category.name]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove default categories
    await queryRunner.query(`DELETE FROM "categories" WHERE "user_id" IS NULL`);
  }
}
