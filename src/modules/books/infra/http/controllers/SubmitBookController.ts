import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UploadBookService from '@modules/books/services/UploadBookService';
import FindBooksCatalogByVendorService from '@modules/books_catalog/services/FindBooksCatalogByVendorService';
import BooksMatchCatalogService from '@modules/books/services/BooksMatchCatalogService';
import UpdateBooksCatalogMatchService from '@modules/books_catalog/services/UpdateBooksCatalogMatchService';

export default class SubmitBookController {
    async submit(request: Request, response: Response): Promise<Response> {
        // upload book
        const bookFileName = request.file.filename;

        const createBooksCatalog = container.resolve(UploadBookService);

        const uploadFileName = await createBooksCatalog.execute({
            bookFileName,
        });

        // get all books calalog of the vendor
        const { vendor_id } = request.user;

        const createFindBooksCatalogByVendor = container.resolve(
            FindBooksCatalogByVendorService,
        );

        const booksCatalog = await createFindBooksCatalogByVendor.execute({
            vendor_id,
        });

        // compare matching title catalog and file upload

        const createMatches = container.resolve(BooksMatchCatalogService);

        const bookCatalogMatch = await createMatches.execute({
            booksCatalog,
            uploadFileName,
        });

        if (bookCatalogMatch) {
            // update vendor match on books catalog
            const { id } = bookCatalogMatch;
            const createUpdateBookVendorMatch = container.resolve(
                UpdateBooksCatalogMatchService,
            );
            const booksCatalogMatched = createUpdateBookVendorMatch.execute({
                uploadFileName,
                booksCatalogId: id,
            });
            return response.json({ uploadFileName, booksCatalogMatched });
        }

        return response.json({ uploadFileName });
    }
}
