import { injectable } from 'tsyringe';

import AppSuccess from '@shared/messages/AppSucess';

import BooksCatalog from '@modules/books_catalog/infra/typeorm/entities/BooksCatalog';

interface IRequest {
    booksCatalog: BooksCatalog[];
    uploadFileName: string;
}

interface IBookMatch {
    title: string;
}

@injectable()
class BooksMatchCatalogService {
    public async execute({
        booksCatalog,
        uploadFileName,
    }: IRequest): Promise<BooksCatalog | undefined> {
        // get first part of title and remove .pdf extension
        const title = uploadFileName.toString().split('($)')[1].split('.')[0];
        const bookMatch: IBookMatch = {
            title,
        };
        let itemCatalog;
        booksCatalog.forEach(item => {
            if (this.match(item, bookMatch)) {
                itemCatalog = item;
            }
        });
        return itemCatalog;
    }

    private match(itemCatalog: BooksCatalog, bookMatch: IBookMatch): boolean {
        const titleMatch = this.replaceCharsSpecials(
            itemCatalog.title.split('(')[0],
        );
        const titleCatalog = this.replaceCharsSpecials(bookMatch.title);
        const matched = titleMatch === titleCatalog;
        return matched;
    }

    private replaceCharsSpecials(text: string): string {
        return text
            .trim()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[^a-zA-Zs]/g, '');
    }
}

export default BooksMatchCatalogService;
