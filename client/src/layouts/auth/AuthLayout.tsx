import { Stack } from "@mui/material";
import ThemeModeButton from "../common/ThemeModeButton";
import LanguageSwitcher from "../common/LanguageSwitcher";

type Props = {
  children: React.ReactNode;
}

const AuthLayout = ({ children } : Props) => {
  return (
    <Stack sx={{height: '100vh', width: '100vw'}}>
      <Stack px={2} py={1} justifyContent="flex-end" spacing={1} direction="row">
        <LanguageSwitcher />
        <ThemeModeButton />
      </Stack>
      {children}
    </Stack>
  );
}

export default AuthLayout