import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TaskStatus } from './enums/task-status';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status: TaskStatus;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
