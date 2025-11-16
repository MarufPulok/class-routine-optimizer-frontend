import { APIUrl } from '@/lib/constants/url.config';
import { LoginRequest, RegisterRequest, AuthResponse, UserResponse, TokenResponse } from '@/lib/types/auth';
import httpClient, { httpClientWithoutToken } from '@/lib/utils/httpClient';

class AuthService {
  async login(data: LoginRequest) {
    const res = await httpClient.post<{ user: UserResponse; tokens: TokenResponse }>(APIUrl.auth.login(), data);
    return res.data;
  }

  async register(data: RegisterRequest) {
    const res = await httpClient.post<{ user: UserResponse; tokens: TokenResponse }>(APIUrl.auth.register(), data);
    return res.data;
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const res = await httpClientWithoutToken.post<TokenResponse>(APIUrl.auth.refreshToken(), {
      refresh: refreshToken,
    });
    return res.data;
  }

  async logout(refreshToken: string) {
    // Use httpClientWithoutToken since access token might be expired
    await httpClientWithoutToken.post(APIUrl.auth.logout(), {
      refresh: refreshToken,
    });
  }

  async getProfile() {
    const res = await httpClient.get<UserResponse>(APIUrl.auth.profile());
    return res.data;
  }
}

const authService = new AuthService();

export default authService;

