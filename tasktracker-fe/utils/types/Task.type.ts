export type Task = {
  _id: string;
  title: string;
  status: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: string;
};
