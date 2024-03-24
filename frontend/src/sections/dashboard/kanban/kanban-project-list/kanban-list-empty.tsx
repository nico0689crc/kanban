'use client';

import { Stack, Button, Typography, useMediaQuery, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paths } from '@/routes/paths';
import { useLocales } from '@/locales';

import { RouterLink } from '@/routes/components';
import Illustration from '@/components/illustrations';
import { NoDataIllustration } from '@/assets/illustrations';
import Iconify from '@/components/iconify';

const KanbanListEmpty = () => {
  const { t } = useLocales();
  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack alignItems='center' spacing={2} height='100%'>
      <Container>
        <Stack spacing={2} alignItems='center'>
          <Typography sx={{ textAlign: 'center' }} variant={isUpMd ? 'h4' : 'h6'}>{t('kanban_projects_view.labels.no_project_title')}</Typography>
          <Typography sx={{ color: 'text.secondary' }} variant='body2'>{t('kanban_projects_view.labels.no_project_subtitle')}</Typography>
        </Stack>
      </Container>
      <Illustration 
        maxWidth={isUpMd ? 500 : 300}
        illustration={<NoDataIllustration />}
      />
      <Button 
        component={RouterLink} 
        href={paths.dashboard.newProject} 
        size="large" 
        color='primary' 
        variant="contained"
        startIcon={<Iconify icon='iconoir:plus-square'/>}
      >
        {t('kanban_projects_view.labels.create_project_button')}
      </Button>
    </Stack>
  )
}

export default KanbanListEmpty