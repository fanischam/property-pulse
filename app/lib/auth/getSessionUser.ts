import { cookies } from 'next/headers';
import { verifyJwt } from '../jwt';
import { User } from './authTypes';

export const getSessionUser = async (): Promise<User | null> => {
  const token = (await cookies()).get('session')?.value ?? '';
  if (!token) {
    return null;
  }
  const claims = await verifyJwt(token);
  if (!claims) {
    return null;
  }
  return { id: claims.id, name: claims.name, email: claims.email } as User;
};
