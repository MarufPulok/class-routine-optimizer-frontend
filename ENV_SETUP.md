# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key-here-generate-a-random-string
NEXTAUTH_URL=http://localhost:3000
```

## Generating NEXTAUTH_SECRET

You can generate a secure random string using:

- `openssl rand -base64 32` (on macOS/Linux)
- Or use any secure random string generator

## Notes

- `NEXTAUTH_SECRET` is required for JWT token signing
- `NEXTAUTH_URL` should match your frontend URL
- `NEXT_PUBLIC_API_URL` is your Django backend URL

## Architecture

The authentication follows this structure:

- **Hook** (`app/hooks/auth/useAuthAction.ts`) - React Query mutations
- **Service** (`lib/services/auth.service.ts`) - Business logic layer
- **HTTP Client** (`lib/utils/httpClient.ts`) - Axios instance with interceptors

This follows the pattern: Hook → Service → HTTP Client
