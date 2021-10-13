import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  async updateDomainByDomainId(
    @Body('name') name: string,
    @Param('id') id: string,
  ): Promise<DomainDTO> {
    return this.domainsService.updateById({ id, name });
  }
}
