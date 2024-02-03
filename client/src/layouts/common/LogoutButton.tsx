import { useCallback } from 'react'; 
import { useAuthContext } from '@/auth/hooks';
import Iconify from '@/components/iconify';
import { IconButton } from '@mui/material';

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const onLogoutHandler = useCallback(
    async () => await logout(), 
    [logout]
  );

  return (
    <IconButton color='primary' onClick={onLogoutHandler}>
      <Iconify icon='iconoir:log-out' width={25} />
    </IconButton>
  )
}

export default LogoutButton;