import { createAuthClient } from 'better-auth/react';
import {
  inferAdditionalFields,
  usernameClient,
} from 'better-auth/client/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import type { auth } from './auth';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  fetchOptions: {
    onError: (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get('X-Retry-After');
        console.log(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
  plugins: [
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
    tanstackStartCookies(),
  ],
});
