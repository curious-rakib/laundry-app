import Cookies from 'js-cookie';

export const authUserService = async () => {
  const token = Cookies.get('accessToken');
  localStorage.setItem('accessToken', token!);

  const response = await fetch('http://127.0.0.1:4000/me', {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
    credentials: 'include',
    mode: 'cors',
  });
  console.log(response.body);
  return await response.json();
};

export const registerUserService = async (data: any) => {
  const response = await fetch(`http://127.0.0.1:4000/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  let result: any = '';

  if (!response.ok) {
    result = await response.text();
    throw new Error(result);
  }
  result = await response.json();
  return result;
};

export const loginUserService = async (data: any) => {
  const response = await fetch(`http://127.0.0.1:4000/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const ProfileUserService = async () => {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`http://127.0.0.1:4000/me`, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  return await response.json();
};
