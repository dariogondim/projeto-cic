import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SubmitBookController from '../controllers/SubmitBookController';
import DownloadBookController from '../controllers/DownloadBookController';

const upload = multer(uploadConfig);

const booksRouter = Router();
const submitBookController = new SubmitBookController();
const downloadBookController = new DownloadBookController();

booksRouter.use(ensureAuthenticated);

booksRouter.post(
    '/submit/pdf',
    upload.single('book'),
    submitBookController.submit,
);

booksRouter.post('/download/pdf', downloadBookController.download);

export default booksRouter;
