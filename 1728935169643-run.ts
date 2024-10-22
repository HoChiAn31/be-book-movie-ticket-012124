import { MigrationInterface, QueryRunner } from "typeorm";

export class Run1728935169643 implements MigrationInterface {
    name = 'Run1728935169643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie_translations\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryLanguageId\` varchar(36) NULL, \`movieId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_genre_translations\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`categoryLanguageId\` varchar(36) NULL, \`movieGenresId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_genres\` (\`id\` varchar(36) NOT NULL, \`NumberCategory\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`moviesId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_translations\` ADD CONSTRAINT \`FK_97c8a0f7d6200ee8d3178ac6c70\` FOREIGN KEY (\`categoryLanguageId\`) REFERENCES \`category_language\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_translations\` ADD CONSTRAINT \`FK_5a9455456ad65299d94c3ca8d1d\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` ADD CONSTRAINT \`FK_00014d3a72861ffdd0700b95852\` FOREIGN KEY (\`categoryLanguageId\`) REFERENCES \`category_language\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` ADD CONSTRAINT \`FK_9cf5ac3ae0e51c7657512562ee4\` FOREIGN KEY (\`movieGenresId\`) REFERENCES \`movie_genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` ADD CONSTRAINT \`FK_6414c430d7ed6fd0821e56964ba\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genres\` DROP FOREIGN KEY \`FK_6414c430d7ed6fd0821e56964ba\``);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` DROP FOREIGN KEY \`FK_9cf5ac3ae0e51c7657512562ee4\``);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` DROP FOREIGN KEY \`FK_00014d3a72861ffdd0700b95852\``);
        await queryRunner.query(`ALTER TABLE \`movie_translations\` DROP FOREIGN KEY \`FK_5a9455456ad65299d94c3ca8d1d\``);
        await queryRunner.query(`ALTER TABLE \`movie_translations\` DROP FOREIGN KEY \`FK_97c8a0f7d6200ee8d3178ac6c70\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL`);
        await queryRunner.query(`DROP TABLE \`movie_genres\``);
        await queryRunner.query(`DROP TABLE \`movie_genre_translations\``);
        await queryRunner.query(`DROP TABLE \`movie_translations\``);
    }

}
