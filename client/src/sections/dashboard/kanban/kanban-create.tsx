'use client';

import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { ReturnType  } from '@/hooks/useBoolean';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { yupResolver } from '@hookform/resolvers/yup';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFTextField } from '@/components/hook-form';
import axios, { endpoints } from '@/utils/axios';
import { RootState } from '@/store';
import { addProject, setCurrentPage } from '@/store/project/projectSlice';

type Props = {
  dialog: ReturnType;
}

const KanbanCreate = ({dialog} : Props) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state: RootState) => state.projectStore);

  const CreateProjectSchema = Yup.object().shape({
    title: Yup.string().required(t('kanban_projects_view.validation.name_required')),
  });

  const defaultValues = { title: '' };

  const methods = useForm({ resolver: yupResolver(CreateProjectSchema), defaultValues });

  const { handleSubmit, formState: { isSubmitting }, reset } = methods;

  const onSubmit = handleSubmit(async ({ title }) => {
    try {
      const response = await axios.post(endpoints.projects, { title });

      (currentPage === 1) && dispatch(addProject({ project: response?.data?.data?.attributes }));
      (currentPage > 1) && dispatch(setCurrentPage({currentPage: 1}));
      
      reset();
      dialog.onFalse();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Dialog fullWidth open={dialog.value} onClose={dialog.onFalse}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{ t('kanban_projects_view.labels.create_project_button') }</DialogTitle>
        <DialogContent>
          <Stack>
            <RHFTextField name='title' label={ t('kanban_projects_view.labels.project_name') }/>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={dialog.onFalse} variant='outlined' color='inherit'>
            { t('common.labels.cancel') }
          </Button>
          <LoadingButton
            color='primary'
            type='submit'
            loading={isSubmitting}
            loadingIndicator={ t('kanban_projects_view.labels.create_project_button_loading') }
          >
            { t('kanban_projects_view.labels.create_project_button') }
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default KanbanCreate