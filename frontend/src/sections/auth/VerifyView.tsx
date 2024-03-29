'use client';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from '@/routes/hooks';
import { paths } from '@/routes/paths';
import { useAuthContext } from '@/auth/hooks';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocales } from '@/locales';


import { Alert, Link, Stack, Typography } from '@mui/material';
import Iconify from '@/components/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider from '@/components/hook-form/FormProvider';
import { RHFTextField } from '@/components/hook-form';
import { RouterLink } from '@/routes/components';
import { useCountdownSeconds } from '@/hooks/useCountdown';
import RHFCode from '@/components/hook-form/RHFCode';
import nProgress from 'nprogress';
import FormWrapper from './form-wrapper';

const VerifyView = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useLocales();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { verifyEmail, resendCodeRegister } = useAuthContext();
  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const VerifySchemaSchema = Yup.object().shape({
    confirmation_code: Yup.string().min(6, t('verify_view.validation.code_format')).required(t('verify_view.validation.code_required')),
    email: Yup.string().required(t('verify_view.validation.email_required')).email(t('verify_view.validation.code_format')),
  });

  const defaultValues = {
    confirmation_code: '',
    email: email || '',
  };

  const methods = useForm({ mode: 'onChange', resolver: yupResolver(VerifySchemaSchema), defaultValues });
  const { watch, handleSubmit, formState: { isSubmitting }, setError } = methods;
  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyEmail(data.email, data.confirmation_code);
      router.push(paths.auth.login);
    } catch ( error: any) {
      if(Array.isArray(error?.errors)) {
        error?.errors?.forEach((error: any) => setError(error.source.path, { message: error.detail }))
      } else {
        setErrorMsg(error?.errors?.title);
      }
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await resendCodeRegister(values.email);
      nProgress.start();
    } catch (error) {
      console.error(error);
    }
  }, [resendCodeRegister, startCountdown, values.email]);

  return (
    <FormWrapper>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant='h4'>{t('verify_view.labels.title')}</Typography>

          {!!errorMsg && <Alert severity='error'>{errorMsg}</Alert>}
          
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {t('verify_view.labels.sub_title')}
          </Typography>

          <RHFTextField
            name='email'
            label={t('verify_view.labels.email')}
            placeholder='example@gmail.com'
          />

          <RHFCode name='confirmation_code' />

          <LoadingButton
            fullWidth
            type='submit'
            loading={isSubmitting}
          >
            {t('verify_view.labels.verify')}
          </LoadingButton>

          <Typography variant='body2'>
            {t('verify_view.labels.resend_title')}{' '} 
            <Link
              variant='subtitle2'
              onClick={handleResendCode}
              sx={{
                cursor: 'pointer',
                ...(counting && {
                  color: 'text.disabled',
                  pointerEvents: 'none',
                }),
              }}
            >
              {t('verify_view.labels.resend')}{counting && `(${countdown}s)`}
            </Link>
          </Typography>

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
            {t('verify_view.labels.return')}
          </Link>
        </Stack>
      </FormProvider>
    </FormWrapper>
  )
}

export default VerifyView