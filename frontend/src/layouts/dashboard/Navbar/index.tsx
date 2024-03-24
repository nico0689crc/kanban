'use client';

import { Box, Stack, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { paths } from '@/routes/paths';
import Logo from '../Logo';
import NavbarItem from './NavbarItem';
import { t } from 'i18next';


const Navbar = () => {
  const theme = useTheme();
  const isUpToMd = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        zIndex: 2,
        ...(!isUpToMd && {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0
        })
      }}
    >
      <Stack 
        sx={{ 
          height: '100%',
          backgroundColor: theme.palette.background.paper, 
          boxShadow: theme.customShadows.card, 
          ...( isUpToMd && { 
            py: 3,
            px: 1
          }),
          ...( !isUpToMd && {
            py: 0.5
          }) 
        }}
        justifyContent='space-between'
      >
        { isUpToMd && <Logo /> }
        <Stack
          direction={{ xs: 'row', md: 'column' }}
          justifyContent={{ xs: 'space-around' }}
          py={{ xs: 1, md: 0 }}
          alignItems='center'
          rowGap={3}
        >
          <NavbarItem href={paths.dashboard.root} label={t('home_view.title_header')} icon='iconoir:home' />
          <NavbarItem href={paths.dashboard.kanbanProjects} label={t('kanban_projects_view.title_header')} icon='iconoir:kanban-board' />
          <NavbarItem href={paths.dashboard.newProject} label={t('kanban_project_view.title_header')} icon='tdesign:task-add' />
          <NavbarItem href={paths.dashboard.userProfile} label={t('profile_view.title_header')} icon='iconoir:user' />
        </Stack>
      </Stack>
    </Box>
  );
}

export default Navbar