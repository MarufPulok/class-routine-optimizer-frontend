import { APIUrl } from '@/lib/constants/url.config';
import { LoginRequest, RegisterRequest, AuthResponse, UserResponse } from '@/lib/types/auth';
import httpClient from '@/lib/utils/httpClient';

class AuthService {
  async login(data: LoginRequest) {
    const res = await httpClient.post<{ user: UserResponse; tokens: { access: string; refresh: string } }>(APIUrl.auth.login(), data);
    return res.data;
  }

  async register(data: RegisterRequest) {
    const res = await httpClient.post<{ user: UserResponse; tokens: { access: string; refresh: string } }>(APIUrl.auth.register(), data);
    return res.data;
  }

  async logout() {
    await httpClient.post(APIUrl.auth.logout());
  }

  async getProfile() {
    const res = await httpClient.get<UserResponse>(APIUrl.auth.profile());
    return res.data;
  }
}

const authService = new AuthService();

export default authService;

