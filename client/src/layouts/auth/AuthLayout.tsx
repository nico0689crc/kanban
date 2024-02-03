import { Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ThemeModeButton from '../common/ThemeModeButton';
import LanguageSwitcher from '../common/LanguageSwitcher';
import Illustration from '@/components/illustrations';
import { AuthenticateIllustration } from '@/assets/illustrations';
import { useLocales } from '@/locales';

type Props = {
  children: React.ReactNode;
}

const AuthLayout = ({ children } : Props) => {
  const { t } = useLocales();
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack sx={{height: '100vh', width: '100vw'}}>
      <Stack px={{ xs:2, md:4 }} py={3} justifyContent='flex-end' spacing={2} direction='row' position='fixed' right={0} left={0}>
        <LanguageSwitcher />
        <ThemeModeButton />
      </Stack>
      <Stack direction='row' flexGrow={1}>
        {isUpToMd && (
          <Stack sx={{ justifyContent:'center', flexGrow: 1}}>
            <Illustration 
              title='Kanban' 
              subTitle={t('home_view.texts.text_3')}
              illustration={<AuthenticateIllustration />} 
            />
          </Stack>
        )}
        <Stack sx={{ flexGrow: { xs: 1, md: 0 }, justifyContent:'center', backgroundColor: theme => theme.palette.background.paper, width: '500px' }}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default AuthLayout