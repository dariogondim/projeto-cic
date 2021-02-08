import { injectable, inject } from 'tsyringe';

import AppError from '@shared/messages/AppError';
import IVendorsRepository from '../repositories/IVendorsRepository';
import Vendor from '../infra/typeorm/entities/Vendor';

interface IRequest {
    vendor_id: string;
}

@injectable()
class FindVendorIdService {
    constructor(
        @inject('VendorsRepository')
        private vendorsRepository: IVendorsRepository,
    ) {}

    public async execute(vendor_id: IRequest): Promise<Vendor> {
        const vendor = await this.vendorsRepository.findVendorById(vendor_id);

        if (!vendor) {
            throw new AppError('vendor key not found');
        }

        return vendor;
    }
}

export default FindVendorIdService;
