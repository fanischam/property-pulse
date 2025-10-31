export interface IProperty {
  _id: string;
  owner: IUser;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  image?: string;
  bookmarks: IProperty[];
  createdAt: string;
  updatedAt: string;
}

export type RouteParams = {
  params: Promise<{ id: string }>;
};
