import { Request, Response } from 'express';

import { container } from 'tsyringe';

import FindAllBooksCatalogService from '@modules/books_catalog/services/FindAllBooksCatalogService';

export default class SelectBooksCatalogController {
    async findAll(request: Request, response: Response): Promise<Response> {
        const {
            publisherValue,
            publicationDateOrder,
            priceValue,
            priceOrder,
        } = request.query;

        const findBooksCatalogByVendor = container.resolve(
            FindAllBooksCatalogService,
        );

        const booksCatalog = await findBooksCatalogByVendor.execute({
            publisherValue,
            publicationDateOrder,
            priceValue,
            priceOrder,
        });

        return response.json({ booksCatalog });
    }
}
