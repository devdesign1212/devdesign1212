
import { FetchUserData } from '@/Common/interface';
import api from '.';
import { API_ROUTES } from './apiRoutes';

export const getUserRole = (): string | null => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role || null;
};

// const createHeaders = async () => 
//   const token = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('authToken='));
//   return {
//     headers: {
//       Authorization: `Bearer ${
//         token ? decodeURIComponent(token.split('=')[1]) : ''
//       }`,
//       'Content-Type': 'application/json',
//       // 'Access-Control-Allow-Origin': '*',
//       Accept: 'application/json, text/plain, */*',
//     },
//   };
// };

// const createMultipartHeaders = async () => {
//   const token = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('authToken='));
//   return {
//     headers: {
//       Authorization: `Bearer ${
//         token ? decodeURIComponent(token.split('=')[1]) : ''
//       }`,
//       'Content-Type': 'multipart/form-data',
//       // 'Access-Control-Allow-Origin': '*',
//       Accept: 'application/json, text/plain, */*',
//     },
//   };
// };


export const fetchUsersApi = async (
  page: number,
  limit = 20
): Promise<FetchUserData[]> => {
  const skip = page * limit;

  const response = await api.get(API_ROUTES.FETCH_DATA, {
    params: {
      limit,
      skip,
    },
  });

  return response.data.users;
};
