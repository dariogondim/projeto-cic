import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IVendorsRepository from '@modules/vendors/repositories/IVendorsRepository';
import VendorsRepository from '@modules/vendors/infra/typeorm/repositories/VendorsRepository';
import IBooksCatalogRepository from '@modules/books_catalog/repositories/IBooksCatalogRepository';
import BooksCatalogRepository from '@modules/books_catalog/infra/typeorm/repositories/BooksCatalogRepository';

container.registerSingleton<IVendorsRepository>(
    'VendorsRepository',
    VendorsRepository,
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<IBooksCatalogRepository>(
    'BooksCatalogRepository',
    BooksCatalogRepository,
);
