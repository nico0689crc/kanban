import { useEffect } from 'react';
import { paths } from '@/routes/paths';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { useAuthContext } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.root;

  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && authenticated) {
      router.replace(returnTo);
    }
  }, [router, loading, authenticated, returnTo]);

  if(authenticated) {
    return null;
  }

  return <>{children}</>;
}
