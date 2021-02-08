import { injectable, inject } from 'tsyringe';
import IBooksCatalogRepository from '../repositories/IBooksCatalogRepository';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';

interface IRequest {
    uploadFileName: string;
    booksCatalogId: string;
}

@injectable()
class UpdateBooksCatalogMatchService {
    constructor(
        @inject('BooksCatalogRepository')
        private booksCatalogRepository: IBooksCatalogRepository,
    ) {}

    public async execute({
        uploadFileName,
        booksCatalogId,
    }: IRequest): Promise<BooksCatalog> {
        // here,($) is a character separator for get firts part on the filename,
        // that represents the key used for match in books catalog
        const bookVendorMatchId = uploadFileName.split('($)')[0];
        const booksCatalog = await this.booksCatalogRepository.updateBookVendorMatchId(
            {
                bookVendorMatchId,
                booksCatalogId,
            },
        );
        return booksCatalog;
    }
}

export default UpdateBooksCatalogMatchService;
