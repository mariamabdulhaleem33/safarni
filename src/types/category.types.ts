export type Category = {
  id: number;
  key: string;
  title: string;
  image: string;
};

export type CategoriesResponse = {
  status: string;
  message: string;
  data: Category[];
};


