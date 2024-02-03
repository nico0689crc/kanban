import { Stack } from '@mui/material';
import ThemeModeButton from '../common/ThemeModeButton';
import LanguageSwitcher from '../common/LanguageSwitcher';

type Props = {
  children: React.ReactNode;
}

const AuthLayout = ({ children } : Props) => {
  return (
    <Stack sx={{height: '100vh', width: '100vw'}}>
      <Stack px={{ xs:2, md:4 }} py={3} justifyContent='flex-end' spacing={2} direction='row' position='fixed' right={0} left={0}>
        <LanguageSwitcher />
        <ThemeModeButton />
      </Stack>
      <Stack flexGrow={1} justifyContent='center'>
        {children}
      </Stack>
    </Stack>
  );
}

export default AuthLayout