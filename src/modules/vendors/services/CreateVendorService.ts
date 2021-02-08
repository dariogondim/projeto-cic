import { injectable, inject } from 'tsyringe';

import { isBefore, subYears, isEqual } from 'date-fns';

import AppError from '@shared/messages/AppError';
import IVendorsRepository from '../repositories/IVendorsRepository';
import Vendor, { GENRE_VENDOR } from '../infra/typeorm/entities/Vendor';

interface IRequest {
    name: string;
    birthday: Date;
    address: string;
    genre: GENRE_VENDOR;
    user_id: string;
}

@injectable()
class CreateVendorService {
    constructor(
        @inject('VendorsRepository')
        private vendorsRepository: IVendorsRepository,
    ) {}

    public async execute({
        name,
        birthday,
        address,
        genre,
        user_id,
    }: IRequest): Promise<Vendor> {
        // checks whether genre has a valid value
        const genreValid: GENRE_VENDOR =
            GENRE_VENDOR[(genre as unknown) as keyof typeof GENRE_VENDOR];
        if (!genreValid && genreValid !== 0) {
            throw new AppError('The genre type contains an invalid value');
        }

        // check if you are older than 18
        const dateLimit = subYears(new Date(), 18);
        const dateBirthday = new Date(birthday);

        const isOlderThan18Yers =
            isBefore(dateBirthday, dateLimit) ||
            isEqual(dateBirthday, dateLimit);

        if (!isOlderThan18Yers) {
            throw new AppError('the vendor must be over 18 years old');
        }

        const vendor = await this.vendorsRepository.create({
            name,
            birthday,
            address,
            genre,
            user_id,
        });

        return vendor;
    }
}

export default CreateVendorService;
