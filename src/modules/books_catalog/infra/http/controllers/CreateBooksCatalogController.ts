import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBooksCatalogService from '@modules/books_catalog/services/CreateBooksCatalogService';
import CreateBulkCsvBooksCatalogService from '@modules/books_catalog/services/CreateBooksCatalogBulkCsvService';

export default class CreateBooksCatalogController {
    async create(request: Request, response: Response): Promise<Response> {
        const {
            title,
            numPages,
            publicationDate,
            publisher,
            price,
        } = request.body;

        const { vendor_id } = request.user;

        const createBooksCatalog = container.resolve(CreateBooksCatalogService);

        const booksCatalog = await createBooksCatalog.execute({
            title,
            numPages,
            publicationDate,
            publisher,
            price,
            vendor_id,
        });

        return response.json({ booksCatalog });
    }

    async bulkCreate(request: Request, response: Response): Promise<Response> {
        const booksFilePath = request.file.path;

        const { vendor_id } = request.user;

        const createBulkBooksCatalog = container.resolve(
            CreateBulkCsvBooksCatalogService,
        );

        const messageSuccess = await createBulkBooksCatalog.execute({
            booksFilePath,
            vendor_id,
        });

        return response.json(messageSuccess);
    }
}
