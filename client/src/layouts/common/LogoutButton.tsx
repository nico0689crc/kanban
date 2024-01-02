import { useCallback } from "react"; 
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { useAuthContext } from "@/auth/hooks";
import Iconify from "@/components/iconify";
import { IconButton } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  const router = useRouter();

  const onLogoutHandler = useCallback(
    async () => {
      await logout();
      router.replace(paths.auth.login);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <IconButton color="primary" onClick={onLogoutHandler}>
      <Iconify icon="iconoir:log-out" width={25} />
    </IconButton>
  )
}

export default LogoutButton;