import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(_request, file, callback) {
            const fileHash = uuidv4();
            const fileName = `${fileHash}($)${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
