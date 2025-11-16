const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const APIUrl = {
  base: API_BASE_URL,
  auth: {
    login: () => '/api/accounts/login/',
    register: () => '/api/accounts/register/',
    logout: () => '/api/accounts/logout/',
    profile: () => '/api/accounts/profile/',
    refreshToken: () => '/api/accounts/token/refresh/',
  },
  routine: {
    dashboard: {
      stats: () => '/api/routine/dashboard/stats/',
      generationHistory: () => '/api/routine/dashboard/generation-history/',
    },
    sections: {
      status: () => '/api/routine/sections/status/',
    },
    rooms: {
      list: () => '/api/routine/rooms/',
      detail: (id: string) => `/api/routine/rooms/${id}/`,
    },
  },
};

export const RouteUrls = {
  auth: {
    login: '/login',
    register: '/register',
  },
  dashboard: {
    index: '/dashboard',
    rooms: '/dashboard/rooms',
  },
};

