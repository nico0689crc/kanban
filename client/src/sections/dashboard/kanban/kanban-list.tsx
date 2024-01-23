import { ChangeEvent, MouseEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import dateFormat from 'dateformat';

import { Card, Grid, Stack, Typography, Link, IconButton, Pagination, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { paths } from '@/routes/paths';
import Iconify from '@/components/iconify';
import { useLocales } from '@/locales';
import { KanbanProjectType } from '@/types';
import { RootState } from '@/store';
import { setCurrentPage } from '@/store/project/projectSlice';

type Props = {
  projects: KanbanProjectType[]
}

const KanbanList = ({ projects } : Props) => {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentPage, totalPages } = useSelector((state: RootState) => state.projectStore);

  const onClickActionButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    NProgress.done();
  }

  const paginationOnChangeHandler = useCallback((_event: ChangeEvent<unknown>, page: number) => {
    dispatch(setCurrentPage({ currentPage: page }));
  }, [dispatch]);

  return (
    <>
      <Grid container spacing={3} alignItems="start" minHeight={{ md: '485px', lg: '330px' }}>
        {projects?.map((project, index) => (
          <Grid item xs={12} md={6} lg={4} key={index} sx={{ display: 'flex' }}>
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
                        {project.title}
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
                          {`${ dateFormat(project?.createdAt, 'paddedShortDate') } ${ dateFormat(project?.createdAt, 'mediumTime') }`}
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
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Stack alignItems="center">
        <Pagination
          onChange={paginationOnChangeHandler}
          count={totalPages ?? 1}
          color="primary"
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          page={currentPage}
          siblingCount={isDownSm ? 0 : 1}
          sx={{ pb: 15 }} 
        />
      </Stack>
    </>
  )
}

export default KanbanList