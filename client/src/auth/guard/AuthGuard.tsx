import { useEffect } from 'react';
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import { useAuthContext } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      router.replace(`${paths.auth.login}?${searchParams}`);
    }
  }, [loading, authenticated, router]);

  if(!authenticated) {
    return null;
  }
  
  return <>{children}</>;
}
