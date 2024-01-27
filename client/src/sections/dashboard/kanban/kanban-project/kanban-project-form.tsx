'use client';

import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '@/components/hook-form';
import FormProvider from '@/components/hook-form/FormProvider';
import { PageHead } from '@/components/page-head'
import { useLocales } from '@/locales';
import { paths } from '@/routes/paths';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, PaperProps, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Iconify from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import CustomCardForm from './kanban-form-card';
import KanbanSectionsList from './kanban-section-list';
import { KanbanContext } from './context/kanban-context';

const KanbanProjectForm = () => {
  const { t } = useLocales();
  const { isDialogTaskOpen, dialogTaskOnToggle } = useContext(KanbanContext);

  const KanbanProjectSchema = Yup.object().shape({
    title: Yup.string().required(t('kanban_project_view.validation.project_title_required')),
  });

  const defaultValues = {
    title: '',
  };

  const methods = useForm({ resolver: yupResolver(KanbanProjectSchema), defaultValues });

  const { formState: { isSubmitting }, trigger } = methods;

  const onClickAddKanbanProjectHandler = async () => {
    const result = await trigger();
    console.log(result);
  }

  return (
    <>
      <Stack direction='column' rowGap={{ xs: 2, md: 6 }} sx={{ width: '100%', height: '100%' }}>
        <PageHead 
          pageTitle={t('kanban_project_view.title_header')}
          links={[
            {name: t('home_view.title_header'), href: paths.dashboard.root},
            {name: t('kanban_projects_view.title_header'), href: paths.dashboard.kanbanProjects},
            {name: t('kanban_project_view.title_header')},
          ]}
        />
        <Stack rowGap={{ xs: 2, md: 7 }} alignItems='center'>
          <CustomCardForm>
            <FormProvider methods={methods}>
              <RHFTextField fullWidth name='title' label={ t('kanban_project_view.labels.project_name') } />
            </FormProvider>
          </CustomCardForm>
          <CustomCardForm>
            <KanbanSectionsList />
          </CustomCardForm>
          <Stack direction="row" columnGap={2} alignItems='center'>
            <Button
              variant='outlined'
              color='primary'
              startIcon={<Iconify icon='bx:arrow-back'/>}
              component={RouterLink}
              href={paths.dashboard.kanbanProjects}
            >
              {t('common.labels.cancel')}
            </Button>
            <LoadingButton
              color='primary'
              loading={isSubmitting}
              onClick={onClickAddKanbanProjectHandler}
              startIcon={<Iconify icon='iconoir:plus-square'/>}
              loadingIndicator={ t('login_view.labels.create_project_button_loading') }
            >
              { t('kanban_project_view.labels.create_project_button') }
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
      
      <AnimatePresence>
        {isDialogTaskOpen && (
          <Dialog
            fullWidth
            maxWidth="xs"
            open={isDialogTaskOpen}
            onClose={dialogTaskOnToggle}
            PaperComponent={(props: PaperProps) => (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { 
                    duration: 0.64, 
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }}
                exit={{
                  scale: 0,
                  opacity: 0,
                  transition: { 
                    duration: 0.48, 
                    ease: [0.43, 0.13, 0.23, 0.96]  
                  }
                }}
              >
                <Paper {...props}>{props.children}</Paper>
              </motion.div>
            )}
          >
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={dialogTaskOnToggle}>Disagree</Button>
              <Button onClick={dialogTaskOnToggle} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

export default KanbanProjectForm