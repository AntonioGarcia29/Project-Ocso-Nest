import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserData } from 'src/auth/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiAuth()
@ApiTags('Providers')
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}
  @Auth(ROLES.MANAGER)

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get(':name')
  async findByName(@Param('name') name: string) {
    const providerName = await this.providersService.findOneByName(name);
    if (!providerName) throw new NotFoundException()
      return providerName
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get()
  findAll(@UserData() user: User) {
    console.log(user);
    if (user.userRoles.includes("Employee")) {
      throw new UnauthorizedException("No estás autorizado, solo admins y managers");
    }
    return this.providersService.findAll();
  }
  
  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const provider = await this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
      return provider
  }
  @Auth(ROLES.MANAGER)

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }
  @Auth(ROLES.MANAGER)

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
