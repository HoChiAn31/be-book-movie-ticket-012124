import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAttributeMovieTableMovieMovieGenresTableMovieGenres1735546093252 implements MigrationInterface {
    name = 'UpdateAttributeMovieTableMovieMovieGenresTableMovieGenres1735546093252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`);
        await queryRunner.query(`ALTER TABLE \`movie_genres_movies\` ADD CONSTRAINT \`FK_e4934d528e3fba6d6e0c90731a6\` FOREIGN KEY (\`movie_id\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_genres_movies\` ADD CONSTRAINT \`FK_eb9b513380d3662a47a8578e993\` FOREIGN KEY (\`genre_id\`) REFERENCES \`movie_genres\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genres_movies\` DROP FOREIGN KEY \`FK_eb9b513380d3662a47a8578e993\``);
        await queryRunner.query(`ALTER TABLE \`movie_genres_movies\` DROP FOREIGN KEY \`FK_e4934d528e3fba6d6e0c90731a6\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`);
    }

}
