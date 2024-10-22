import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingsDetailsTable1725880010089 implements MigrationInterface {
    name = 'UpdateBookingsDetailsTable1725880010089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP FOREIGN KEY \`FK_db5d5eba41dd017cf9956fe9d54\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` DROP COLUMN \`bookingDetailsId\``);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD \`ticketsId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` ADD CONSTRAINT \`FK_f60f2b45f58b5ea86a0fe3a7a93\` FOREIGN KEY (\`ticketsId\`) REFERENCES \`tickets\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP FOREIGN KEY \`FK_f60f2b45f58b5ea86a0fe3a7a93\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`booking_details\` DROP COLUMN \`ticketsId\``);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD \`bookingDetailsId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`tickets\` ADD CONSTRAINT \`FK_db5d5eba41dd017cf9956fe9d54\` FOREIGN KEY (\`bookingDetailsId\`) REFERENCES \`booking_details\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
