import { Body, Controller, Get, Post } from '@nestjs/common';
import { DomainService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { DomainDTO } from './dto/domain.dto';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainsService: DomainService) {}

  @Post()
  async create(@Body() createDomainDto: CreateDomainDto): Promise<DomainDTO> {
    return this.domainsService.create(createDomainDto);
  }

  @Get()
  async findAll(@Body('page') page: number): Promise<DomainDTO[]> {
    return this.domainsService.findAll(page);
  }
}
