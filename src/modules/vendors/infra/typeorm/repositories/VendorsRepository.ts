import ICreateVendorDTO from '@modules/vendors/dtos/ICreateVendorDTO';
import IFindVendorById from '@modules/vendors/dtos/IFindVendorById.DTO';
import IVendorsRepository from '@modules/vendors/repositories/IVendorsRepository';
import { getRepository, Repository } from 'typeorm';
import Vendor from '../entities/Vendor';

class VendorsRepository implements IVendorsRepository {
    private ormRepository: Repository<Vendor>;

    constructor() {
        this.ormRepository = getRepository(Vendor);
    }

    public async findVendorById(
        findData: IFindVendorById,
    ): Promise<Vendor | undefined> {
        const { vendor_id } = findData;
        const vendor = await this.ormRepository.findOne(vendor_id);
        return vendor;
    }

    public async create(vendorData: ICreateVendorDTO): Promise<Vendor> {
        const vendor = this.ormRepository.create(vendorData);

        await this.ormRepository.save(vendor);

        return vendor;
    }
}

export default VendorsRepository;
