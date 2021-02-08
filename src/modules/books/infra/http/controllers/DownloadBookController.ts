import { Request, Response } from 'express';

import { container } from 'tsyringe';

import DownloadBookService from '@modules/books/services/DownloadBookService';

export default class DownloadBookController {
    async download(request: Request, response: Response): Promise<void> {
        const { bookFileName, vendor_id } = request.body;

        const downloadBook = container.resolve(DownloadBookService);

        const { file, size } = await downloadBook.execute({
            bookFileName,
            vendor_id,
        });

        response.setHeader('Content-Length', size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader(
            'Content-Disposition',
            'attachment; filename=quote.pdf',
        );

        if (file) file.pipe(response);
    }
}
