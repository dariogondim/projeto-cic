import User from '@modules/users/infra/typeorm/entities/User';
import Vendor from '@modules/vendors/infra/typeorm/entities/Vendor';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity('books_catalog')
class BooksCatalog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    numPages: number;

    @Column('date')
    publicationDate: Date;

    @Column()
    publisher: string;

    @Column()
    price: number;

    @Column()
    bookVendorMatchId: string;

    @Column()
    vendor_id: string;

    @ManyToOne(() => Vendor)
    @JoinColumn({ name: 'vendor_id' })
    vendor: Vendor;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default BooksCatalog;
