'use client';

import { Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Illustration from '@/components/illustrations';
import { RouterLink } from '@/routes/components';

import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { WorkInProgressIllustration } from '@/assets/illustrations';

const UserView = () => {
  const { t } = useLocales();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth='md'>
      <Stack alignItems='center' spacing={2}>
        <Typography sx={{ textAlign: 'center' }} variant={isUpMd ? 'h3' : 'h5'}>{t('profile_view.work_progress_title')}</Typography>
        <Typography sx={{ color: 'text.secondary' }} variant='body2'>{t('profile_view.work_progress_subtitle')}</Typography>
        <Illustration illustration={<WorkInProgressIllustration />}  maxWidth={isUpMd ? 500 : 300} />
        <Button size='large' component={RouterLink} href={paths.dashboard.root} variant='contained' color='primary'>{t('common.labels.not_found_cabutton_authenticated')}</Button>
      </Stack>
    </Container>
  )
}

export default UserView