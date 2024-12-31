import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttribiteTableBookingDetail1735635559459 implements MigrationInterface {
    name = 'AddAttribiteTableBookingDetail1735635559459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`booking_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD UNIQUE INDEX \`IDX_be5cd3c6d04d0ce156fcadd7e7\` (\`booking_id\`)`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_be5cd3c6d04d0ce156fcadd7e7\` ON \`booking_details\` (\`booking_id\`)`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD CONSTRAINT \`FK_be5cd3c6d04d0ce156fcadd7e72\` FOREIGN KEY (\`booking_id\`) REFERENCES \`bookings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP FOREIGN KEY \`FK_be5cd3c6d04d0ce156fcadd7e72\``);
        await queryRunner.query(`DROP INDEX \`REL_be5cd3c6d04d0ce156fcadd7e7\` ON \`booking_details\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP INDEX \`IDX_be5cd3c6d04d0ce156fcadd7e7\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`booking_id\``);
    }

}
