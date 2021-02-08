import { injectable, inject } from 'tsyringe';
import IBooksCatalogRepository from '../repositories/IBooksCatalogRepository';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';
import IFindAllWithParamsDTO from '../dtos/IFindAllWithParamsDTO';

interface IRequest {
    publisherValue: any;
    publicationDateOrder: any;
    priceValue: any;
    priceOrder: any;
}

@injectable()
class FindAllBooksCatalogService {
    constructor(
        @inject('BooksCatalogRepository')
        private booksCatalogRepository: IBooksCatalogRepository,
    ) {}

    public async execute({
        publisherValue,
        publicationDateOrder,
        priceValue,
        priceOrder,
    }: IRequest): Promise<BooksCatalog[]> {
        const params = this.convertParamsValues({
            publisherValue,
            publicationDateOrder,
            priceValue,
            priceOrder,
        });
        const booksCatalog = await this.booksCatalogRepository.findAll(params);

        return booksCatalog;
    }

    private convertParamsValues({
        publisherValue,
        publicationDateOrder,
        priceValue,
        priceOrder,
    }: IRequest): IFindAllWithParamsDTO {
        let auxPublicationDateOrder: 'ASC' | 'DESC' | undefined;
        let auxPriceOrder: 'ASC' | 'DESC' | undefined;

        if (publicationDateOrder) {
            auxPublicationDateOrder =
                publicationDateOrder === 'ASC' ||
                publicationDateOrder === 'DESC'
                    ? publicationDateOrder
                    : 'DESC';
        } else {
            auxPublicationDateOrder = undefined;
        }

        if (priceOrder) {
            auxPriceOrder =
                priceOrder === 'ASC' || priceOrder === 'DESC'
                    ? priceOrder
                    : 'ASC';
        } else {
            auxPriceOrder = undefined;
        }

        return {
            publisherValue,
            priceValue: priceValue ? parseFloat(priceValue) : undefined,
            publicationDateOrder: auxPublicationDateOrder,
            priceOrder: auxPriceOrder,
        };
    }
}

export default FindAllBooksCatalogService;
