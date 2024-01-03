'use client';

import { redirect } from 'next/navigation';
import { PATH_AFTER_LOGIN, PATH_LOGIN } from '@/config-global';
import { useAuthContext } from '@/auth/hooks/useAuthContext';

export default function HomePage() {
  const { authenticated } = useAuthContext();

  if (authenticated) {
    redirect(PATH_AFTER_LOGIN);
  } else {
    redirect(PATH_LOGIN);
  }
}