import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1729517924739 implements MigrationInterface {
    name = 'UpdateUser1729517924739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`resetPasswordExpires\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordExpires\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`resetPasswordToken\``);
    }

}
