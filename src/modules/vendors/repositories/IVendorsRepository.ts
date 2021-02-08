import ICreateVendorDto from '@modules/vendors/dtos/ICreateVendorDTO';
import IFIndVendorByUserId from '../dtos/IFindVendorById.DTO';
import Vendor from '../infra/typeorm/entities/Vendor';

export default interface IVendorsRepository {
    create(data: ICreateVendorDto): Promise<Vendor>;
    findVendorById(string: IFIndVendorByUserId): Promise<Vendor | undefined>;
}
