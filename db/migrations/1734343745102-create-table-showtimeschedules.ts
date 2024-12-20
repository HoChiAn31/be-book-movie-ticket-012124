import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableShowtimeschedules1734343745102
  implements MigrationInterface
{
  name = 'CreateTableShowtimeschedules1734343745102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Thay đổi bộ ký tự và collation cho cột movieId trong bảng show_time_schedules
    await queryRunner.query(
      `ALTER TABLE \`show_time_schedules\` MODIFY COLUMN \`movieId\` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL`,
    );

    // Các thay đổi khác của migration
    await queryRunner.query(
      `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`show_time_schedules\` ADD CONSTRAINT \`FK_31bc50376dea74370c5e4014b1a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Thực hiện rollback các thay đổi trên
    await queryRunner.query(
      `ALTER TABLE \`show_time_schedules\` DROP FOREIGN KEY \`FK_31bc50376dea74370c5e4014b1a\``,
    );

    // Quay lại bộ ký tự cũ nếu cần
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );

    // Quay lại bộ ký tự ban đầu của bảng show_time_schedules nếu cần
    await queryRunner.query(
      `ALTER TABLE \`show_time_schedules\` MODIFY COLUMN \`movieId\` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NULL`,
    );
  }
}
