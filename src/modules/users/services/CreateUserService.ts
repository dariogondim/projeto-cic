import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/messages/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

interface IResponse {
    user: User;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<IResponse> {
        const checkUserExists = await this.usersRepository.findByEmail(email);
        if (checkUserExists) {
            throw new AppError('Email address already used by another');
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return { user };
    }
}

export default CreateUserService;
