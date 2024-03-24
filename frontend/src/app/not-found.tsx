'use client';

import { Box, Button, Stack } from '@mui/material';
import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';
import PageNotFoundIllustration from '@/assets/illustrations/page-not-found-illustration';
import Illustration from '@/components/illustrations';
import { useContext } from 'react';
import { AuthContext } from '@/auth/context/AuthContext';

export const metadata = {
  title: '404 Page Not Found!',
};

const NotFoundPage = () => {
  const { t } = useLocales();
  const { authenticated } = useContext(AuthContext);

  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <Illustration 
          illustration={<PageNotFoundIllustration />}
          title={t('common.labels.not_found_title')}
          subTitle={t('common.labels.not_found_subtitle')}
          caButton={(
            authenticated ? (
              <Button component={RouterLink} href={paths.dashboard.root} size="large" color='primary' variant="contained">
                {t('common.labels.not_found_cabutton_authenticated')}
              </Button>
            ) : (
              <Button component={RouterLink} href={paths.auth.login} size="large" color='primary' variant="contained">
                {t('common.labels.not_found_cabutton_unauthenticated')}
              </Button>
            )
          )}
        />
      </Stack>
    </Box>
  )
}

export default NotFoundPage