'use client';

import { Box, Button, Stack } from '@mui/material';
import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';
import Illustration from '@/components/illustrations';
import { useContext } from 'react';
import { AuthContext } from '@/auth/context/AuthContext';
import { PageErrorIllustration } from '@/assets/illustrations';

export const metadata = {
  title: '505 Internal Error!',
};

const NotFoundPage = () => {
  const { t } = useLocales();
  const { authenticated } = useContext(AuthContext);

  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <Stack height='100%' justifyContent='center'>
        <Illustration 
          illustration={<PageErrorIllustration />}
          title={t('common.labels.something_went_wrong')}
          subTitle={t('common.labels.something_went_wrong_2')}
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