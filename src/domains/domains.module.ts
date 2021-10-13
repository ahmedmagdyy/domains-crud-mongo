import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainController } from './domains.controller';
import { DomainService } from './domains.service';
import { Domain, DomainSchema } from './schemas/domain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domain.name, schema: DomainSchema }]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainsModule {}
