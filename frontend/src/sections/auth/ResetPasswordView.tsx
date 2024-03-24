'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

// routes
import { paths } from '@/routes/paths';
import { RouterLink } from '@/routes/components';
import { useRouter, useSearchParams } from '@/routes/hooks';

// hooks
import { useBoolean } from '@/hooks/useBoolean';

// auth
import { useAuthContext } from '@/auth/hooks';
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { Alert } from '@mui/material';
import { useLocales } from '@/locales';
import nProgress from 'nprogress';
import FormWrapper from './form-wrapper';

const ResetPasswordView = () => {
  const { t } = useLocales();
  const router = useRouter();
  const { resetPassword } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const password = useBoolean();

  const token: string = searchParams.get('token')!;
  const uuid: string = searchParams.get('uuid')!;

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, t('reset_password_view.validation.password_length'))
      .required(t('reset_password_view.validation.password_required')),
    confirm_password: Yup.string()
      .required(t('reset_password_view.validation.confirm_password_required'))
      .oneOf([Yup.ref('password')], t('reset_password_view.validation.password_match')),
  });

  const defaultValues = {
    password: '',
    confirm_password: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await resetPassword(uuid, token, data.password, data.confirm_password);
      router.push(paths.auth.login);
      nProgress.start();
    } catch (error: any) {
      if(Array.isArray(error?.errors)) {
        error?.errors?.forEach((error: any) => setError(error.source.path, { message: error.detail }))
      } else {
        setErrorMsg(error?.errors?.title);
      }
    }
  });

  return (
    <FormWrapper rowGap={2}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant='h4'>{t('reset_password_view.labels.title')}</Typography>

          {!!errorMsg && <Alert severity='error'>{errorMsg}</Alert>}

          <RHFTextField
            name='password'
            label={t('reset_password_view.labels.password')}
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={password.onToggle} edge='end'>
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name='confirm_password'
            label={t('reset_password_view.labels.confirm_password')}
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={password.onToggle} edge='end'>
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            {t('reset_password_view.labels.submit')}
          </LoadingButton>

          <Link
            component={RouterLink}
            href={paths.auth.login}
            variant='subtitle2'
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <Iconify icon='eva:arrow-ios-back-fill' width={16} />
            {t('reset_password_view.labels.return')}
          </Link>
        </Stack>
      </FormProvider>
    </FormWrapper>
  );
}

export default ResetPasswordView;
