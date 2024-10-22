import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBookingsDetailsTable1725890046457 implements MigrationInterface {
    name = 'UpdateBookingsDetailsTable1725890046457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payment\` ADD \`bookingId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD UNIQUE INDEX \`IDX_5738278c92c15e1ec9d27e3a09\` (\`bookingId\`)`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD \`paymentId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD UNIQUE INDEX \`IDX_b6e3240be778554ea319f31684\` (\`paymentId\`)`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_5738278c92c15e1ec9d27e3a09\` ON \`payment\` (\`bookingId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_b6e3240be778554ea319f31684\` ON \`bookings\` (\`paymentId\`)`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_5738278c92c15e1ec9d27e3a098\` FOREIGN KEY (\`bookingId\`) REFERENCES \`bookings\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookings\` ADD CONSTRAINT \`FK_b6e3240be778554ea319f316841\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP FOREIGN KEY \`FK_b6e3240be778554ea319f316841\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_5738278c92c15e1ec9d27e3a098\``);
        await queryRunner.query(`DROP INDEX \`REL_b6e3240be778554ea319f31684\` ON \`bookings\``);
        await queryRunner.query(`DROP INDEX \`REL_5738278c92c15e1ec9d27e3a09\` ON \`payment\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP INDEX \`IDX_b6e3240be778554ea319f31684\``);
        await queryRunner.query(`ALTER TABLE \`bookings\` DROP COLUMN \`paymentId\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP INDEX \`IDX_5738278c92c15e1ec9d27e3a09\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP COLUMN \`bookingId\``);
    }

}
