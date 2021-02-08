import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class CreateBooksCatalog1610066367415
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'books_catalog',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                    },
                    {
                        name: 'numPages',
                        type: 'int',
                    },
                    {
                        name: 'publicationDate',
                        type: 'date',
                    },
                    {
                        name: 'publisher',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'float',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
        await queryRunner.addColumn(
            'books_catalog',
            new TableColumn({
                name: 'vendor_id',
                type: 'uuid',
                isNullable: false,
            }),
        );
        await queryRunner.createForeignKey(
            'books_catalog',
            new TableForeignKey({
                name: 'VendorId',
                columnNames: ['vendor_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'vendors',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('books_catalog', 'VendorId');
        await queryRunner.dropColumn('books_catalog', 'vendor_id');
        await queryRunner.dropTable('books_catalog');
    }
}
