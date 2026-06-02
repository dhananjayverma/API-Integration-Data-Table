export type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
};

export type SortDirection = "asc" | "desc";
