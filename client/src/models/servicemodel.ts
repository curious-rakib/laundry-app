import { User } from './userModel';

export type Service = {
  _id: string;
  name: string;
};

export type ServiceCategory = {
  _id: string;
  name: string;
  type: string;
  price: string;
  imgUrl: string;
};
export type CategoryType = string;

export type SubCategory = {
  _id: string;
  name: string;
  type: string;
  price: number;
};

export type Cart = {
  service: Service;
  subCategory: SubCategory;
  count: number;
};

export type Order = {
  address: string;
  instructions: string;
  price: number;
  count: number;
  deliveryType: string;
  status?: string;
  user: string;
  serviceSubCategory: string;
  service: string;
};

export type OrderDetails = {
  address: string;
  count: number;
  deliveryType: 'Urgent';
  imgUrl?: string[];
  instructions: string;
  price: number;
  service: Service;
  serviceSubCategory: SubCategory;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  user: User;
  _id: string;
};
