import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { DomainService } from './domains.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { Domain } from './schemas/domain.schema';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainsService: DomainService) {}

  @Post()
  async create(@Body() createDomainDto: CreateDomainDto): Promise<Domain> {
    return this.domainsService.create(createDomainDto);
  }

  @Get()
  async findAll(@Body('page') page: number): Promise<Domain[]> {
    return this.domainsService.findAll(page);
  }

  @Put(':id')
  async updateDomainByDomainId(
    @Body('name') name: string,
    @Param('id') id: string,
  ): Promise<Domain> {
    return this.domainsService.updateById({ id, name });
  }

  @Get('/byOwner/:id')
  async getDomainsByOwnerId(
    @Body('page') page: number,
    @Param('id') id: number,
  ): Promise<Domain[]> {
    return this.domainsService.getDomainsByOwnerId(id, page);
  }

  @Get('/search')
  async searchDomains(@Query('q') q: string) {
    return this.domainsService.performDomainFuzzySearch(q);
  }
}
