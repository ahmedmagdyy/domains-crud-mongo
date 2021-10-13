import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';
import { Domain, DomainDocument } from './schemas/domain.schema';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel(Domain.name)
    private readonly domainModel: Model<DomainDocument>,
  ) {}

  async create(createDomainDto: CreateDomainDto): Promise<Domain> {
    if (!createDomainDto.ownerId || !createDomainDto.ownerName) {
      throw new BadRequestException('ownerName or ownerId is missing!');
    }
    try {
      const domain = new this.domainModel(createDomainDto);
      return domain.save();
    } catch (error) {
      console.log({ error });
      if (error['code'] === 11000) {
        throw new BadRequestException('Duplicate Domain Name!');
      }
      throw new BadRequestException('Failed Creating Domain');
    }
  }

  async findAll(page = 1): Promise<Domain[]> {
    if (page > 0) {
      const skipRecordsCount = (page - 1) * 10;
      return this.domainModel.find().skip(skipRecordsCount).limit(10).exec();
    } else {
      throw new BadRequestException('Invalid value for page!');
    }
  }

  async updateById(updateDomainDto: UpdateDomainDto): Promise<Domain> {
    const { name, id } = updateDomainDto;
    try {
      const domainExists = await this.domainModel.findById(id);
      domainExists.domainName = name;

      const updatedDomain = await domainExists.save();
      return updatedDomain;
    } catch (error) {
      console.log({ error });
      if (error['code'] === 11000) {
        throw new BadRequestException('Duplicate Domain Name!');
      }
      throw new BadRequestException('Failed Updating Domain name');
    }
  }

  async getDomainsByOwnerId(ownerId: number, page = 1): Promise<Domain[]> {
    if (!ownerId) {
      throw new Error('ownerId is missing!');
    }
    if (page > 0) {
      const skipRecordsCount = (page - 1) * 10;
      return this.domainModel
        .find({
          ownerId,
        })
        .skip(skipRecordsCount)
        .limit(10)
        .exec();
    } else {
      throw new BadRequestException('Invalid value for page!');
    }
  }

  async performDomainFuzzySearch(searchQuery: string): Promise<Domain[]> {
    const regex = new RegExp(this.escapeRegex(searchQuery), 'gi');
    const domains = await this.domainModel.find({ domainName: regex });
    return domains;
  }

  private escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }
}
