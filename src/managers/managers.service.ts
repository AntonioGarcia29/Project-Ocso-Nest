import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}
  create(createManagerDto: CreateManagerDto) {
    return  this.managerRepository.save(createManagerDto)
  }

  findAll() {
    return this.managerRepository.find()
  }

  findOne(id: string) {
    return this.managerRepository.findOneBy({
      managerId: id,
    })
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })
    if(!managerToUpdate) throw new NotFoundException
    this.managerRepository.save(managerToUpdate)
    return managerToUpdate
  }

  remove(id: string) {
    this.managerRepository.delete({
      managerId: id
    })
    return {
      message : `El manager con id: {id}, ha sido eliminado`
    }
  }
}
