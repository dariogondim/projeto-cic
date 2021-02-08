import { injectable } from 'tsyringe';
import uploadConfig from '@config/upload';
import path from 'path';

interface IRequest {
    bookFileName: string;
}

@injectable()
class UploadBookService {
    public async execute({ bookFileName }: IRequest): Promise<string> {
        const fileName = this.uploadBook(uploadConfig.directory, bookFileName);
        return fileName;
    }

    private uploadBook(uploadDiretory: string, booksFileName: string): string {
        const fileName = path.join(uploadDiretory, booksFileName);
        return fileName.split('/')[fileName.split('/').length - 1];
    }
}

export default UploadBookService;
