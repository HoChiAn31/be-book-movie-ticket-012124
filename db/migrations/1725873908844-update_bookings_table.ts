import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingsTable1725873908844 implements MigrationInterface {
    name = 'UpdateBookingsTable1725873908844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`total_tickets\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`total_amount\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`totalTickets\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`totalAmount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`totalAmount\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`totalTickets\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`total_amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`total_tickets\` int NOT NULL`);
    }

}
