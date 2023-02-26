import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondSet1676839281584 implements MigrationInterface {
    name = 'SecondSet1676839281584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "expense_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_478b68a9314d8787fb3763a2298" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense_categorisation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expenseId" uuid, "categoryId" uuid, CONSTRAINT "PK_15f9dfd513479fe8e856a9bf9f6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "expense_categorisation" ADD CONSTRAINT "FK_b4c11ba79e2c3d9bf38bc4dc807" FOREIGN KEY ("expenseId") REFERENCES "expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "expense_categorisation" ADD CONSTRAINT "FK_f9aa822bdcbfe8db637fb30f380" FOREIGN KEY ("categoryId") REFERENCES "expense_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense_categorisation" DROP CONSTRAINT "FK_f9aa822bdcbfe8db637fb30f380"`);
        await queryRunner.query(`ALTER TABLE "expense_categorisation" DROP CONSTRAINT "FK_b4c11ba79e2c3d9bf38bc4dc807"`);
        await queryRunner.query(`DROP TABLE "expense_categorisation"`);
        await queryRunner.query(`DROP TABLE "expense_category"`);
    }

}
