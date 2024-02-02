'use client';

import { Box, Button, Stack } from '@mui/material';
import { RouterLink } from '@/routes/components';
import { paths } from '@/routes/paths';
import NotFoundView from '@/sections/error/not-found-view';
import { useLocales } from '@/locales';

export const metadata = {
  title: '404 Page Not Found!',
};

const NotFoundPage = () => {
  const { t } = useLocales();

  return (
    <Box sx={{height: '100vh', width: '100vw'}}>
      <Stack height='100%' alignItems='center' justifyContent='center'>
        <NotFoundView
            title={t('common.labels.not_found_title')}
            subTitle={t('common.labels.not_found_subtitle')}
            caButton={(
              <Button component={RouterLink} href={paths.dashboard.root} size="large" color='primary' variant="contained">
                {t('common.labels.not_found_cabutton')}
              </Button>
            )} 
          />
      </Stack>
    </Box>
  )
}

export default NotFoundPage