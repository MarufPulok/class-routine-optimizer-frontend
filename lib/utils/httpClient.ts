import axios from 'axios';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { authOptions } from './authOptions';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getAccessToken() {
  if (typeof window === 'undefined') {
    const session = await getServerSession(authOptions);
    return session?.tokens?.access;
  }

  const session = await getSession();
  return session?.tokens?.access;
}

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const httpClientWithoutToken = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;

