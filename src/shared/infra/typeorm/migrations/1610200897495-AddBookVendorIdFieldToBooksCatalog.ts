import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddBookVendorIdFieldToBooksCatalog1610200897495
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'books_catalog',
            new TableColumn({
                name: 'bookVendorMatchId',
                type: 'varchar',
                isNullable: true,
                isUnique: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('books_catalog', 'bookVendorMatchId');
    }
}
