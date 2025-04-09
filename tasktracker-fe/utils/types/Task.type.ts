import { Status } from '../enums/Status.enum';

export type Task = {
  _id: string;
  title: string;
  status: Status;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
};
