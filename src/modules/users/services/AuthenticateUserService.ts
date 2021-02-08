import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/messages/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import IVendorsRepository from '@modules/vendors/repositories/IVendorsRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
    vendor_id: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('VendorsRepository')
        private vendorsRepository: IVendorsRepository,
    ) {}

    public async execute({
        email,
        password,
        vendor_id,
    }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/passwsord combination', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        let subject;
        if (vendor_id) {
            const vendor = await this.vendorsRepository.findVendorById({
                vendor_id,
            });
            if (vendor) {
                subject = `${user.id}($)${vendor.id}`;
            } else {
                throw new AppError('vendor key not found');
            }
        } else {
            subject = user.id;
        }

        const token = sign({}, secret, {
            subject,
            expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
