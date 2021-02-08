import { injectable, inject } from 'tsyringe';
import IBooksCatalogRepository from '../repositories/IBooksCatalogRepository';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';

interface IRequest {
    vendor_id: string;
}

@injectable()
class FindBooksCatalogByVendorService {
    constructor(
        @inject('BooksCatalogRepository')
        private booksCatalogRepository: IBooksCatalogRepository,
    ) {}

    public async execute({ vendor_id }: IRequest): Promise<BooksCatalog[]> {
        const booksCatalog = await this.booksCatalogRepository.findByVendorId({
            vendor_id,
        });

        return booksCatalog;
    }
}

export default FindBooksCatalogByVendorService;
