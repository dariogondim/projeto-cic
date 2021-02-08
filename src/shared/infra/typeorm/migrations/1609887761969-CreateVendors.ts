import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class CreateVendors1609887761969 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'vendors',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'birthday',
                        type: 'date',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                    {
                        name: 'genre',
                        type: 'enum',
                        enum: ['male', 'female'],
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
            'vendors',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
            }),
        );
        await queryRunner.createForeignKey(
            'vendors',
            new TableForeignKey({
                name: 'UserId',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('vendors', 'UserId');
        await queryRunner.dropColumn('vendors', 'user_id');
        await queryRunner.dropTable('vendors');
    }
}
