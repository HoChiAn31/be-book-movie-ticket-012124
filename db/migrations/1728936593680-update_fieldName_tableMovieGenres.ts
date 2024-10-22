import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldNameTableMovieGenres1728936593680 implements MigrationInterface {
    name = 'UpdateFieldNameTableMovieGenres1728936593680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` DROP FOREIGN KEY \`FK_9cf5ac3ae0e51c7657512562ee4\``);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` CHANGE \`NumberCategory\` \`numberCategory\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` ADD CONSTRAINT \`FK_9cf5ac3ae0e51c7657512562ee4\` FOREIGN KEY (\`movieGenresId\`) REFERENCES \`movie_genres\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` DROP FOREIGN KEY \`FK_9cf5ac3ae0e51c7657512562ee4\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` CHANGE \`numberCategory\` \`NumberCategory\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_genre_translations\` ADD CONSTRAINT \`FK_9cf5ac3ae0e51c7657512562ee4\` FOREIGN KEY (\`movieGenresId\`) REFERENCES \`movie_genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
