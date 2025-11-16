import 'next-auth';
import { User, TokenResponse } from './auth';

declare module 'next-auth' {
  interface Session {
    user: User;
    tokens?: TokenResponse;
  }

  interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    date_joined: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    tokens?: TokenResponse;
  }
}

