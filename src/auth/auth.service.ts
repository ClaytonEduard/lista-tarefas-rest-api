import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) { }


    // metodo criar um login
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }

    // metodo para logar
    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        // dados para recerber as credenciais
        const { username, password } = authCredentialsDto;
        // buscar um usuario com esse nome sem dar resposta ao usuario
        const user = await this.usersRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            return 'sucess';

        } else {
            throw new UnauthorizedException('Verifique suas credenciais de login');
        }
    }




}
