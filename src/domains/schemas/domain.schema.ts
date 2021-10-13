import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DomainDocument = Domain & Document;

@Schema()
export class Domain {
  @Prop({ unique: true, required: true })
  domainName: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  ownerId: number;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);
// Exclude __v field if needed
// DomainSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.__v;
//   return obj;
// };
