import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainsModule } from './domains/domains.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONOGDB_URL, {
      dbName: process.env.MONOGDB_NAME,
    }),
    DomainsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
