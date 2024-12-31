import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttribiteTableBookingDetail1735635232087 implements MigrationInterface {
    name = 'AddAttribiteTableBookingDetail1735635232087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` ADD CONSTRAINT \`FK_c067c75f6f4a9703798662dc463\` FOREIGN KEY (\`bookingDetailsId\`) REFERENCES \`booking_details\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD CONSTRAINT \`FK_1427be6173c48d8e6743f80356b\` FOREIGN KEY (\`roomId\`) REFERENCES \`room\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`FK_db5d5eba41dd017cf9956fe9d54\` FOREIGN KEY (\`bookingDetailsId\`) REFERENCES \`booking_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`FK_db5d5eba41dd017cf9956fe9d54\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP FOREIGN KEY \`FK_1427be6173c48d8e6743f80356b\``);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` DROP FOREIGN KEY \`FK_c067c75f6f4a9703798662dc463\``);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
    }

}
