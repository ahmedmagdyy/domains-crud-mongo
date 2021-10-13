import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
import { DomainDTO } from './dto/domain.dto';
import { Domain, DomainDocument } from './schemas/domain.schema';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(Domain.name)
    private readonly domainModel: Model<DomainDocument>,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<DomainDTO> {
    if (!createDomainDto.ownerId || !createDomainDto.ownerName) {
      throw new BadRequestException('ownerName or ownerId is missing!');
    }
    try {
      const domain = new this.domainModel(createDomainDto);
      return domain.save();
    } catch (error) {
      console.log('here');
      console.log({ error });
      if (error['code'] === 11000) {
        throw new BadRequestException('Duplicate Domain Name!');
      }
      throw new BadRequestException('Failed Creating Domain');
    }
  }

  async findAll(): Promise<DomainDTO[]> {
    return this.domainModel.find().select('-_id -__v').exec();
  }
}
