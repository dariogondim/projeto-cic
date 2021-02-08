import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateVendorsController from '../controllers/CreateVendorsController';

const vendorsRouter = Router();
const createVendorscontroller = new CreateVendorsController();

vendorsRouter.use(ensureAuthenticated);

vendorsRouter.post('/', createVendorscontroller.create);

export default vendorsRouter;
