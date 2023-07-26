import { json } from 'stream/consumers';
import type { CategoryType, Order } from './../models/servicemodel';

export const getAllServicesService = async () => {
  const BASE_API_URL = 'http://127.0.0.1:4000';

  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_API_URL}/services`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  return await response.json();
};

export const getAllCategoriesService = async (categoryType: CategoryType) => {
  const BASE_API_URL = 'http://127.0.0.1:4000';

  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_API_URL}/services-sub-categories?type=${categoryType}`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  return await response.json();
};

export const getAllSubCategoriesService = async () => {
  const BASE_API_URL = 'http://127.0.0.1:4000';

  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_API_URL}/all-sub-categories`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  return await response.json();
};

export const makeAnOrderService = async (order: Order) => {
  const BASE_API_URL = 'http://127.0.0.1:4000';
  const data = JSON.stringify(order);

  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_API_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: data,
  });

  return await response.json();
};

export const getUserOrdersService = async (id: string) => {
  const BASE_API_URL = 'http://127.0.0.1:4000';

  const token = localStorage.getItem('accessToken');
  const response = await fetch(`${BASE_API_URL}/user-orders?userId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  return await response.json();
};
