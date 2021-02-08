import ICreateBooksCatalogDTO from '@modules/books_catalog/dtos/ICreateBookCatalogDTO';
import IBooksCatalogRepository from '@modules/books_catalog/repositories/IBooksCatalogRepository';
import { getRepository, Repository, SelectQueryBuilder } from 'typeorm';
import AppError from '@shared/messages/AppError';
import IFindVendorIdDTO from '@modules/books_catalog/dtos/IFindVendorIdDTO';
import IUpdateBookVendorMatchIdBookCatalogDTO from '@modules/books_catalog/dtos/IUpdateBookVendorMatchIdBookCatalogDTO';
import IFindAllWithParamsDTO from '@modules/books_catalog/dtos/IFindAllWithParamsDTO';
import BooksCatalog from '../entities/BooksCatalog';

class BooksCatalogRepository implements IBooksCatalogRepository {
    private ormRepository: Repository<BooksCatalog>;

    constructor() {
        this.ormRepository = getRepository(BooksCatalog);
    }

    public async updateBookVendorMatchId(
        bookVendorMatchIdData: IUpdateBookVendorMatchIdBookCatalogDTO,
    ): Promise<BooksCatalog> {
        const { bookVendorMatchId, booksCatalogId } = bookVendorMatchIdData;
        const booksCatalog = await this.ormRepository.save({
            id: booksCatalogId,
            bookVendorMatchId,
        });

        return booksCatalog;
    }

    public async create(
        booksData: ICreateBooksCatalogDTO,
    ): Promise<BooksCatalog> {
        const booksCatalog = this.ormRepository.create(booksData);

        await this.ormRepository.save(booksCatalog);
        return booksCatalog;
    }

    public async bulkCreate(
        booksData: ICreateBooksCatalogDTO[],
    ): Promise<void> {
        try {
            const booksCatalog = await this.ormRepository.create(booksData);
            await this.ormRepository
                .createQueryBuilder()
                .insert()
                .into(BooksCatalog)
                // .onConflict(`("numPages") DO UPDATE SET "numPages" = null`)
                // .onConflict(`("price") DO UPDATE SET "price" = null`)
                .values(booksCatalog)
                .execute();
        } catch (err) {
            console.log(err);
            throw new AppError('ocorreu um erro no servidor', 500);
        }
    }

    public async findByVendorId(
        findData: IFindVendorIdDTO,
    ): Promise<BooksCatalog[]> {
        const { vendor_id } = findData;
        const booksCatalog = await this.ormRepository.find({
            where: { vendor_id },
        });
        return booksCatalog;
    }

    public async findAll({
        publisherValue,
        publicationDateOrder,
        priceValue,
        priceOrder,
    }: IFindAllWithParamsDTO): Promise<BooksCatalog[]> {
        const booksCatalog = await this.findAllParams({
            publisherValue,
            publicationDateOrder,
            priceValue,
            priceOrder,
        }).execute();
        return booksCatalog;
    }

    private findAllParams({
        publisherValue,
        publicationDateOrder,
        priceValue,
        priceOrder,
    }: IFindAllWithParamsDTO): SelectQueryBuilder<BooksCatalog> {
        const alias = 'books';
        const queryBuilder = this.ormRepository.createQueryBuilder(alias);
        let hasWhere = false;
        if (publisherValue) {
            queryBuilder.where(`${alias}.publisher = :publisherValue`, {
                publisherValue,
            });
            hasWhere = true;
        }
        if (priceValue) {
            if (hasWhere) {
                queryBuilder.andWhere(`${alias}.price = :priceValue`, {
                    priceValue,
                });
            } else {
                queryBuilder.where(`${alias}.price = :priceValue`, {
                    priceValue,
                });
            }
        }

        let hasOrderBy = false;
        if (publicationDateOrder) {
            queryBuilder.orderBy(
                `${alias}.publicationDate`,
                publicationDateOrder,
            );
            hasOrderBy = true;
        }

        console.log(priceOrder);
        if (priceOrder) {
            if (!hasOrderBy) {
                queryBuilder.orderBy(`${alias}.price`, priceOrder);
            } else {
                queryBuilder.addOrderBy(`${alias}.price`, priceOrder);
            }
        }

        return queryBuilder;
    }
}

export default BooksCatalogRepository;
