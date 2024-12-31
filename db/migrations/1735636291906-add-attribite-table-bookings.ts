import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAttribiteTableBookings1735636291906 implements MigrationInterface {
    name = 'AddAttribiteTableBookings1735636291906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`food_drinks\` DROP FOREIGN KEY \`FK_362fabe8288fab6b210e4f68e62\``);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` DROP FOREIGN KEY \`FK_fb1c22afe707e03a32b0feeeb0d\``);
        await queryRunner.query(`DROP INDEX \`IDX_be5cd3c6d04d0ce156fcadd7e7\` ON \`booking_details\``);
        await queryRunner.query(`ALTER TABLE \`food_drinks\` DROP COLUMN \`bookingId\``);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` DROP COLUMN \`bookingId\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`showTimesId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`movieId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_702ad92007a3b91c7946e23f529\` FOREIGN KEY (\`showTimesId\`) REFERENCES \`show_times\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_bbc4861064727b47676f90d1997\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_bbc4861064727b47676f90d1997\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_702ad92007a3b91c7946e23f529\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`movieId\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`showTimesId\``);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` ADD \`bookingId\` varchar(36) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`food_drinks\` ADD \`bookingId\` varchar(36) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_be5cd3c6d04d0ce156fcadd7e7\` ON \`booking_details\` (\`booking_id\`)`);
        await queryRunner.query(`ALTER TABLE \`food_drink_books\` ADD CONSTRAINT \`FK_fb1c22afe707e03a32b0feeeb0d\` FOREIGN KEY (\`bookingId\`) REFERENCES \`bookings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`food_drinks\` ADD CONSTRAINT \`FK_362fabe8288fab6b210e4f68e62\` FOREIGN KEY (\`bookingId\`) REFERENCES \`bookings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
