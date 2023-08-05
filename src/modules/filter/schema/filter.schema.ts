import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type FilterDocument = FilterSchema & Document;

@Schema()
export class FilterSchema {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  archived: boolean;
}

export const FilterModel = SchemaFactory.createForClass(FilterSchema);
