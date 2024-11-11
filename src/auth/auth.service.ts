import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt  from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>,
  private jwtService: JwtService
  ){}
  registerUser(createUserDto: CreateUserDto){
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword,5)
    return this.userRepository.save(createUserDto)
  }
  async loginUser(LoginUserDto: LoginUserDto){
    const user = await this.userRepository.findOne({
      where: {
        userEmail: LoginUserDto.userEmail
      }
    })
    const match = await bcrypt.compare(LoginUserDto.userPassword, user.userPassword)
    if(!match) throw new UnauthorizedException("No estas autorizado");
    const payload = {
      user: user.userEmail,
      password: user.userPassword,
    }
    const token = this.jwtService.sign({payload})
    return token
  }
}
