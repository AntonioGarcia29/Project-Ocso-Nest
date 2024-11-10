import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { find } from 'rxjs';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ){}
  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto)
  }

  findAll() {
    return this.regionRepository.find()
  }

  findOne(id: number) {
    return this.regionRepository.findOneBy({
      regionId: id
    })
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto
    })
    if(!regionToUpdate) throw new NotFoundException
    this.regionRepository.save(regionToUpdate)
    return regionToUpdate
  }

  remove(id: number) {
    this.regionRepository.delete({
      regionId: id
    })
    return {
      message : `tu region con id: {id}, ha sido eliminado`
    }
  }
}
