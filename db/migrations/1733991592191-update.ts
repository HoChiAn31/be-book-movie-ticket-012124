import { MigrationInterface, QueryRunner } from 'typeorm';

export class Update1733991592191 implements MigrationInterface {
  name = 'Update1733991592191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Kiểm tra sự tồn tại của các cột và thay đổi chúng nếu cần
    const hasLanguageCodeColumn = await queryRunner.hasColumn(
      'branch_translation',
      'languageCode',
    );
    if (hasLanguageCodeColumn) {
      await queryRunner.query(
        `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) NULL DEFAULT NULL`,
      );
    }

    const hasFlagColumn = await queryRunner.hasColumn(
      'category_language',
      'flag',
    );
    if (hasFlagColumn) {
      await queryRunner.query(
        `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) NULL DEFAULT NULL`,
      );
    }

    const hasRefreshTokenColumn = await queryRunner.hasColumn(
      'user',
      'refreshToken',
    );
    if (hasRefreshTokenColumn) {
      await queryRunner.query(
        `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT NULL`,
      );
    }

    const hasAvatarColumn = await queryRunner.hasColumn('user', 'avatar');
    if (hasAvatarColumn) {
      await queryRunner.query(
        `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) NULL DEFAULT NULL`,
      );
    }

    // Kiểm tra sự tồn tại của khóa ngoại trước khi thêm
    const foreignKeyExistsMovie = await this.checkForeignKeyExists(
      queryRunner,
      'comments',
      'FK_bb2283b93a5414b9cfe834a181a',
    );
    if (!foreignKeyExistsMovie) {
      await queryRunner.query(
        `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_bb2283b93a5414b9cfe834a181a\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
      );
    }

    const foreignKeyExistsUser = await this.checkForeignKeyExists(
      queryRunner,
      'comments',
      'FK_7e8d7c49f218ebb14314fdb3749',
    );
    if (!foreignKeyExistsUser) {
      await queryRunner.query(
        `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_7e8d7c49f218ebb14314fdb3749\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Kiểm tra sự tồn tại của các khóa ngoại trước khi xóa
    const foreignKeyExistsMovie = await this.checkForeignKeyExists(
      queryRunner,
      'comments',
      'FK_bb2283b93a5414b9cfe834a181a',
    );
    if (foreignKeyExistsMovie) {
      await queryRunner.query(
        `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_7e8d7c49f218ebb14314fdb3749\``,
      );
    }

    const foreignKeyExistsUser = await this.checkForeignKeyExists(
      queryRunner,
      'comments',
      'FK_7e8d7c49f218ebb14314fdb3749',
    );
    if (foreignKeyExistsUser) {
      await queryRunner.query(
        `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_bb2283b93a5414b9cfe834a181a\``,
      );
    }

    // Thực hiện rollback các thay đổi cột
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`avatar\` \`avatar\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`category_language\` CHANGE \`flag\` \`flag\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branch_translation\` CHANGE \`languageCode\` \`languageCode\` varchar(255) CHARACTER SET "utf8mb4" COLLATE "utf8mb4_0900_ai_ci" NULL`,
    );
  }

  private async checkForeignKeyExists(
    queryRunner: QueryRunner,
    tableName: string,
    foreignKeyName: string,
  ): Promise<boolean> {
    const result = await queryRunner.query(
      `
            SELECT COUNT(*) as count
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_NAME = ?
            AND CONSTRAINT_NAME = ?
        `,
      [tableName, foreignKeyName],
    );

    return result[0].count > 0;
  }
}
