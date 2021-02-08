import User from '@modules/users/infra/typeorm/entities/User';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

export enum GENRE_VENDOR {
    male,
    female,
}

@Entity('vendors')
class Vendor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('date')
    birthday: Date;

    @Column()
    address: string;

    @Column({ enum: GENRE_VENDOR })
    genre: GENRE_VENDOR;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Vendor;
