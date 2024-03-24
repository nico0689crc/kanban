'use client';

import { Button, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import WellcomeIllustration from '@/assets/illustrations/wellcome-illustration';

import Illustration from '@/components/illustrations';
import { RouterLink } from '@/routes/components';

import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';

const HomeView = () => {
  const { t } = useLocales();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Container maxWidth='md'>
      <Stack alignItems='center' spacing={2}>
        <Typography sx={{ textAlign: 'center' }} variant={isUpMd ? 'h3' : 'h5'}>{t('home_view.texts.text_title')}</Typography>
        <Typography sx={{ color: 'text.secondary' }} variant='body2'>{t('home_view.texts.text_1')}</Typography>
        <Illustration illustration={<WellcomeIllustration />}  maxWidth={isUpMd ? 500 : 300} />
        <Button size='large' component={RouterLink} href={paths.dashboard.kanbanProjects} variant='contained' color='primary'>{t('home_view.labels.button_get_start')}</Button>
      </Stack>
    </Container>
  )
}

export default HomeView