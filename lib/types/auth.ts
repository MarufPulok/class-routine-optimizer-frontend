// Backend response types (what the API returns)
export interface UserResponse {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

// Frontend User type (for NextAuth - id is string)
export interface User {
  id: string; // NextAuth requires string
  username: string;
  email: string;
  name?: string; // NextAuth default
  first_name?: string;
  last_name?: string;
  date_joined?: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
}

export interface AuthResponse {
  user: UserResponse; // Backend returns UserResponse
  tokens: TokenResponse;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
}
