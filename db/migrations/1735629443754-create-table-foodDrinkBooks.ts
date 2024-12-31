import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFoodDrinkBooks1735629443754
  implements MigrationInterface
{
  name = 'CreateTableFoodDrinkBooks1735629443754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`food_drink_books\` ADD CONSTRAINT \`FK_bcea7ac6b37ea97b04c04a7acf5\` FOREIGN KEY (\`foodDrinksId\`) REFERENCES \`food_drinks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`food_drink_books\` ADD CONSTRAINT \`FK_fb1c22afe707e03a32b0feeeb0d\` FOREIGN KEY (\`bookingId\`) REFERENCES \`bookings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`food_drink_books\` DROP FOREIGN KEY \`FK_fb1c22afe707e03a32b0feeeb0d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`food_drink_books\` DROP FOREIGN KEY \`FK_bcea7ac6b37ea97b04c04a7acf5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(`DROP TABLE \`food_drink_books\``);
  }
}
