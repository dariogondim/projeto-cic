import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password, vendor_id } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user, token } = await authenticateUser.execute({
            email,
            password,
            vendor_id,
        });

        delete user.password;

        return response.json({ user, token });
    }
}
