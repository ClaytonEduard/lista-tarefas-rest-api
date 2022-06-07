import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // todos os segredos gerados expiram em uma hora;
      secret: '@Admin10',
      signOptions: {
        expiresIn: 3600,
      },

    }),
    TypeOrmModule.forFeature([UsersRepository],)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
