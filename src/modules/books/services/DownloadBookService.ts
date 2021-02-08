import { injectable } from 'tsyringe';
import uploadConfig from '@config/upload';

import fs, { ReadStream } from 'fs';

// import AppSuccess from '@shared/success/AppSucesss';

import AppError from '@shared/messages/AppError';

interface IRequest {
    bookFileName: string;
    vendor_id: string;
}

interface IResponse {
    file: ReadStream | undefined;
    size: any;
}

@injectable()
class DownloadBookService {
    public async execute({ bookFileName }: IRequest): Promise<IResponse> {
        const book = this.downloadBook(uploadConfig.directory, bookFileName);
        if (book.file) {
            return book;
        }

        throw new AppError(
            'the book does not exist or is not yet available for download',
        );
    }

    private downloadBook(
        uploadDiretory: string,
        booksFileName: string,
    ): IResponse {
        const fileLocation = `${uploadDiretory}/${booksFileName}${'.pdf'}`;

        try {
            const stat = fs.statSync(fileLocation);
            const file = fs.createReadStream(fileLocation);
            return { file, size: stat.size };
        } catch (err) {
            return { file: undefined, size: undefined };
        }
    }
}

export default DownloadBookService;
