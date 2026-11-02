export type Comment = {
  _id: string;
  task: string;
  author: {
    _id: string;
    name: string;
    photo: string;
  };
  text: string;
  createdAt: string;
  updatedAt: string;
};
