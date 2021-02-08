import { GENRE_VENDOR } from '../infra/typeorm/entities/Vendor';

export default interface ICreateVendorDTO {
    name: string;
    birthday: Date;
    address: string;
    genre: GENRE_VENDOR;
    user_id: string;
}
