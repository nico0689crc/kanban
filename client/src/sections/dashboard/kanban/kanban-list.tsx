import { MouseEvent, useCallback } from 'react';
import NextLink from 'next/link';
import dateFormat from 'dateformat';

import { Card, Grid, Stack, Typography, Link, IconButton } from '@mui/material';
import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import { useLocales } from '@/locales';
import { KanbanProjectType } from '@/types';
import nProgress from 'nprogress';

type Props = {
  projects: KanbanProjectType[]
}

const KanbanList = ({ projects } : Props) => {
  const { t } = useLocales();

  const onClickActionButtonHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    nProgress.done();
  },[])

  return (
    <Grid container spacing={3} alignItems="start" minHeight={{ md: '485px', lg: '330px' }}>
      {projects?.map((project, index) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={index} sx={{ display: 'flex' }}>
          <Link 
            component={NextLink} 
            href={`${paths.dashboard.kanbanProjects}/${project?.uuid}`} 
            sx={{ width: '100%', display: 'flex', textDecoration: 'none' }}
          >
            <Card 
              sx={{
                width: '100%', 
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                p: 3,
                boxShadow: theme => theme.customShadows.card,
                border: (theme) => `1px solid ${theme.palette.primary.main}`,
                transition: (theme) => theme.transitions.create(['box-shadow'], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeInOut,
                }),
                '&:hover': {
                  boxShadow: theme => theme.customShadows.cardHover,
                } 
              }}>
                <Stack direction='column' alignItems='stretch' rowGap={1}>
                  <Stack flexGrow={1} gap={1} sx={{ overflow: 'hidden' }}>
                    <Stack direction="row" alignItems="center" width="100%">
                      <Typography 
                        variant='subtitle1' 
                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flexGrow: 1 }}
                      >
                        {project.title}
                      </Typography>
                      <IconButton 
                        sx={{ 
                          transition: (theme) => theme.transitions.create(['background-color'], {
                            duration: theme.transitions.duration.standard,
                            easing: theme.transitions.easing.easeInOut,
                          })
                        }} 
                        color='primary' 
                        onClick={onClickActionButtonHandler}
                      >
                        <Iconify icon='eva:more-vertical-fill' />
                      </IconButton>
                      </Stack>
                    <Stack direction='row' justifyContent="end" pl={5}>
                      <Typography
                        variant='caption' 
                        component='span'
                        sx={{ color: (theme) => theme.palette.text.disabled, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {`${ dateFormat(project?.createdAt, 'paddedShortDate') } ${ dateFormat(project?.createdAt, 'mediumTime') }`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction='row' columnGap={2}  justifyContent='space-between'> 
                    <Stack direction='row' alignItems='center' gap={1}>
                      <Iconify icon='fluent-mdl2:column-vertical-section-edit' />
                      <Typography variant='overline'>{ t('kanban_projects_view.labels.sections') }</Typography>
                      <Typography variant='overline'>{ ((project) => project?.sections?.length)(project) }</Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' gap={1}>
                      <Iconify icon='fluent-mdl2:task-list' />
                      <Typography variant='overline'>{ t('kanban_projects_view.labels.tasks') }</Typography>
                      <Typography variant='overline'>
                        {((project) => {
                          return project?.sections
                                  ?.map(section => section?.tasks.length)
                                  .reduce((sumTotal, totalTask)=> sumTotal + totalTask, 0)
                        })(project)}
                      </Typography>
                    </Stack>
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