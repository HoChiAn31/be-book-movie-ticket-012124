import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingsDetailsTable1725877971722 implements MigrationInterface {
    name = 'UpdateBookingsDetailsTable1725877971722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`seat_number\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`seatNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
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
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`seatNumber\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`seat_number\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
