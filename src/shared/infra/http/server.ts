import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
// import formData from 'express-form-data';
// import os from 'os';

import uploadConfig from '@config/upload';
import AppError from '@shared/messages/AppError';
// import bodyParser from 'body-parser';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
// const optionsForm = {
//     uploadDir: os.tmpdir(),
//     autoClean: true,
// };

app.use(express.json());

// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// // parse data with connect-multiparty.
// app.use(formData.parse(optionsForm));
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(
    (
        err: Error,
        _request: Request,
        response: Response,
        _next: NextFunction,
    ) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ status: 'error', message: err.message });
        }

        console.log(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3000, () => {
    console.log('Server started on port 3000!');
});
