// Backend response types (what the API returns)
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  access_expires_at?: number; // Unix timestamp
  refresh_expires_at?: number; // Unix timestamp
}

export interface AuthResponse {
  user: UserResponse; // Backend returns UserResponse
  tokens: TokenResponse;
}

