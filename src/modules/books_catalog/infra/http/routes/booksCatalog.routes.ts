import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateBooksCatalogController from '../controllers/CreateBooksCatalogController';
import SelectBooksCatalogController from '../controllers/SelectBooksCatalogController';

const upload = multer(uploadConfig);

const booksCatalogRouter = Router();
const createBooksCatalogController = new CreateBooksCatalogController();
const selectBooksCatalogController = new SelectBooksCatalogController();

booksCatalogRouter.use(ensureAuthenticated);

booksCatalogRouter.post('/', createBooksCatalogController.create);

booksCatalogRouter.post(
    '/upload/csv',
    upload.single('catalog'),
    createBooksCatalogController.bulkCreate,
);

booksCatalogRouter.get('/', selectBooksCatalogController.findAll);

export default booksCatalogRouter;
