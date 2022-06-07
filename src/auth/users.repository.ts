import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // converter para hash, para depois salvar no banco
        // 1° passo gerar o salto para ser add junto a senha do usuario
        const salt = await bcrypt.genSalt();
        // gerar o hast
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({ username, password: hashedPassword });
        try {
            await this.save(user);

        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Nome de usuário já cadastrado!');
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}