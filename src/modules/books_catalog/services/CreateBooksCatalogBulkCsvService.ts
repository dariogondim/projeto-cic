import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import AppSuccess from '@shared/messages/AppSucess';

import AppError from '@shared/messages/AppError';

import csv from 'csv-parser';

import IBooksCatalogRepository from '../repositories/IBooksCatalogRepository';
import BooksCatalog from '../infra/typeorm/entities/BooksCatalog';

interface IRequest {
    booksFilePath: string;
    vendor_id: string;
}

@injectable()
class CreateBulkCsvBooksCatalogService {
    constructor(
        @inject('BooksCatalogRepository')
        private booksCatalogRepository: IBooksCatalogRepository,
    ) {}

    public async execute({
        booksFilePath,
        vendor_id,
    }: IRequest): Promise<AppSuccess | undefined> {
        const resultCsv: BooksCatalog[] = await this.readCsv(booksFilePath);
        const resultWithAddPropertyVendorId: BooksCatalog[] = this.addVendorIdInBooksCatalog(
            resultCsv,
            vendor_id,
        );
        try {
            await this.booksCatalogRepository.bulkCreate(
                resultWithAddPropertyVendorId,
            );

            return new AppSuccess(
                'the books catalog has been successfully inserted',
            );
        } catch (err) {
            console.log(err);
            throw new AppError('ocorreu um erro inesperado no servidor', 500);
        }
    }

    private readCsv(booksFilePath: string): Promise<BooksCatalog[]> {
        return new Promise((resolve, reject) => {
            const booksCatalog: BooksCatalog[] = [];
            fs.createReadStream(booksFilePath)
                .pipe(csv({ escape: `'` }))
                .on('data', data => booksCatalog.push(data))
                .on('end', () => resolve(booksCatalog))
                .on('error', error => reject(error));
        });
    }

    private addVendorIdInBooksCatalog(
        booksCatalog: BooksCatalog[],
        vendor_id: string,
    ): BooksCatalog[] {
        const booksCatalogsCopy = booksCatalog.map(item => ({
            ...item,
            vendor_id,
        }));

        return booksCatalogsCopy;
    }
}

export default CreateBulkCsvBooksCatalogService;
