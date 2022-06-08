import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        // buscando o metodo JWT
        private jwtService: JwtService,
    ) { }


    // metodo criar um login
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto)
    }
    // fim criar login

    // metodo para logar
    async signIn(authCredentialsDto: AuthCredentialsDto,
    ): Promise<{ accessToken: string }> {
        // dados para recerber as credenciais
        const { username, password } = authCredentialsDto;
        // buscar um usuario com esse nome sem dar resposta ao usuario
        const user = await this.usersRepository.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };

        } else {
            throw new UnauthorizedException('Verifique suas credenciais de login');
        }
    }
    // fim metodo logar

}
