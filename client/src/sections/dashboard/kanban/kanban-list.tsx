import { MouseEvent } from 'react';
import NextLink from 'next/link';
import dateFormat from 'dateformat';
import NProgress from 'nprogress';
import { Card, Grid, Stack, Typography, Link, IconButton } from '@mui/material';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import { useLocales } from '@/locales';
import { KanbanProjectType } from '@/types';

type Props = {
  projects: KanbanProjectType[]
}

const KanbanList = ({ projects } : Props) => {
  const { t } = useLocales();

  const onClickActionButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    NProgress.done();
  }

  return (
    <Grid container spacing={3} sx={{ pb: { xs: 15, md: 5, lg: 0 }}}>
      {projects?.map((project, index) => (
        <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
          <Link 
            component={NextLink} 
            href={`${paths.dashboard.kanbanProjects}/${project?.attributes?.uuid}`} 
            sx={{ width: '100%', display: 'flex', textDecoration: 'none' }}
          >
            <Card 
              sx={{
                width: '100%', 
                display: 'flex',
                flexDirection: 'column',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                transition: (theme) => theme.transitions.create(['border', 'border-color', 'box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeInOut
                }),
                '&:hover': {
                  border: (theme) => `1px solid ${theme.palette.primary.main}`
                } 
              }}>
                <Stack
                  direction='row'
                  alignItems='start' 
                  sx={{ 
                    padding: 2,
                    width: '100%',
                    borderBottom: (theme) => `1px dashed ${theme.palette.divider}`
                  }}
                >
                  <Stack flexGrow={1} gap={1} sx={{ overflow: 'hidden' }}>
                    <Typography 
                      variant='subtitle1' 
                      sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {project.attributes.title}
                    </Typography>
                    <Stack direction='row' gap={0.5}>
                      <Typography
                        variant='caption' 
                        component='span'
                        sx={{ color: (theme) => theme.palette.text.disabled, fontWeight: 'bold', textDecoration: 'underline' }}
                      >
                        { t('kanban_projects_view.labels.created_at') }
                      </Typography>
                      <Typography
                        variant='caption' 
                        component='span'
                        sx={{ color: (theme) => theme.palette.text.disabled, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {`${ dateFormat(project.attributes.createdAt, 'paddedShortDate') } ${ dateFormat(project.attributes.createdAt, 'mediumTime') }`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton onClick={onClickActionButtonHandler}>
                    <Iconify icon='eva:more-vertical-fill' />
                  </IconButton>
                </Stack>
                <Stack p={2} direction='row' gap={2}> 
                  <Stack direction='row' alignItems='center' gap={1}>
                    <Iconify icon='fluent-mdl2:column-vertical-section-edit' />
                    <Typography variant='overline'>{ t('kanban_projects_view.labels.sections') }</Typography>
                    <Typography variant='overline'>{ ((project) => project?.attributes?.sections?.length)(project) }</Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={1}>
                    <Iconify icon='fluent-mdl2:task-list' />
                    <Typography variant='overline'>{ t('kanban_projects_view.labels.tasks') }</Typography>
                    <Typography variant='overline'>
                      {((project) => {
                        return project?.attributes?.sections
                                ?.map(section => section?.tasks.length)
                                .reduce((sumTotal, totalTask)=> sumTotal + totalTask, 0)
                      })(project)}
                    </Typography>
                  </Stack>
                </Stack>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default KanbanList