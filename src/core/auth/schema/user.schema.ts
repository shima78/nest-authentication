import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserModel = SchemaFactory.createForClass(UserSchema);
