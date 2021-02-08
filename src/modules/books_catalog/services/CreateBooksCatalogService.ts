import { injectable, inject } from 'tsyringe';
import AppError from '@shared/messages/AppError';
import IBooksCatalogRepository from '../repositories/IBooksCatalogRepository';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';

interface IRequest {
    title: string;
    numPages: number;
    publicationDate: Date;
    publisher: string;
    price: number;
    vendor_id: string;
}

@injectable()
class CreateBooksCatalogService {
    constructor(
        @inject('BooksCatalogRepository')
        private booksCatalogRepository: IBooksCatalogRepository,
    ) {}

    public async execute({
        title,
        numPages,
        publicationDate,
        publisher,
        price,
        vendor_id,
    }: IRequest): Promise<BooksCatalog> {
        if (vendor_id) {
            const booksCatalog = await this.booksCatalogRepository.create({
                title,
                numPages,
                publicationDate,
                publisher,
                price,
                vendor_id,
            });
            return booksCatalog;
        }

        throw new AppError('The vendor key not found');
    }
}

export default CreateBooksCatalogService;
