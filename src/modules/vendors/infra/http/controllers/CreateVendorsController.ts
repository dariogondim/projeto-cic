import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateVendorService from '@modules/vendors/services/CreateVendorService';

export default class CreateVendorsController {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, birthday, address, genre } = request.body;

        const createVendor = container.resolve(CreateVendorService);

        const { user_id } = request.user;

        const vendor = await createVendor.execute({
            name,
            birthday,
            address,
            genre,
            user_id,
        });

        return response.json({ vendor });
    }
}
