import { os } from '@orpc/server';
import { auth } from '@/lib/auth';

export const authed = os.middleware(async ({ context, next }) => {
  const headers = (context as { headers?: Headers }).headers;

  if (!headers) {
    throw new Error('Unauthorized: No headers provided');
  }

  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error('Unauthorized: Invalid session');
  }

  return next({
    context: {
      user: session.user,
      session: session.session,
    },
  });
});

export const authedProcedure = os.use(authed);
