// src/routes/index.ts
import { Router } from 'express';

import vendorsRouter from '@modules/vendors/infra/http/routes/vendors.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import booksCatalogRouter from '@modules/books_catalog/infra/http/routes/booksCatalog.routes';
import booksRouter from '@modules/books/infra/http/routes/books.routes';

const routes = Router();

routes.use('/vendors', vendorsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/booksCatalog', booksCatalogRouter);
routes.use('/books', booksRouter);

export default routes;
