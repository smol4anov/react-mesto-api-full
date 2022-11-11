import { BASE_URL } from './constants.js';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...!!token && { "Authorization": `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
};

export const register = (data) => {
  return request({
    url: '/signup',
    data
  });
};

export const login = (data) => {
  return request({
    url: '/signin',
    data
  });
};

export const checkToken = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
};