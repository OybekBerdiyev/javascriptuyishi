import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    forwardRef(()=> UsersModule),
    JwtModule.register({
      secret: 'Av2645!#@53dfgh%^7PPdfon4323s',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
