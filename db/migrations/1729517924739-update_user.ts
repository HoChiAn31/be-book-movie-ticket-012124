import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateUser1729517924739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    // Kiểm tra cột `resetPasswordToken` đã tồn tại
    const resetPasswordTokenExists = table?.columns.some(
      (column) => column.name === 'resetPasswordToken',
    );

    if (!resetPasswordTokenExists) {
      await queryRunner.addColumn(
        'user',
        new TableColumn({
          name: 'resetPasswordToken',
          type: 'varchar',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');

    // Xóa cột `resetPasswordToken` nếu tồn tại
    const resetPasswordTokenExists = table?.columns.some(
      (column) => column.name === 'resetPasswordToken',
    );

    if (resetPasswordTokenExists) {
      await queryRunner.dropColumn('user', 'resetPasswordToken');
    }
  }
}
