'use client';

import * as Yup from 'yup';
import { useCallback, useState } from 'react';
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
import { useCountdownSeconds } from '@/hooks/useCountdown';

// auth
import { useAuthContext } from '@/auth/hooks';
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField, RHFCode } from '@/components/hook-form';
import { Alert } from '@mui/material';
import { useLocales } from '@/locales';
import nProgress from 'nprogress';
import FormWrapper from './FormWrapper';

const NewPasswordView = () => {
  const { t } = useLocales();

  const { newPassword, forgotPassword } = useAuthContext();

  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  const password = useBoolean();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60);

  const NewPasswordSchema = Yup.object().shape({
    code: Yup.string().min(6, t('new_password_view.validation.code_format')).required(t('new_password_view.validation.code_format')),
    email: Yup.string().required(t('new_password_view.validation.email_required')).email(t('new_password_view.validation.email_format')),
    password: Yup.string()
      .min(6, t('new_password_view.validation.password_length'))
      .required(t('new_password_view.validation.password_required')),
    confirmPassword: Yup.string()
      .required(t('new_password_view.validation.confirm_password_required'))
      .oneOf([Yup.ref('password')], t('new_password_view.validation.password_match')),
  });

  const defaultValues = {
    code: '',
    email: email || '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await newPassword(data.email, data.code, data.password);

      router.push(paths.auth.login);

      nProgress.start();
    } catch (error: any) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleResendCode = useCallback(async () => {
    try {
      startCountdown();
      await forgotPassword?.(values.email);
    } catch (error: any) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  }, [forgotPassword, startCountdown, values.email]);

  return (
    <FormWrapper rowGap={2}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant="h4">{t('new_password_view.labels.title')}</Typography>

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <RHFTextField
            name="email"
            label={t('new_password_view.labels.email')}
            placeholder="example@gmail.com"
          />

          <RHFCode name="code" />

          <RHFTextField
            name="password"
            label={t('new_password_view.labels.password')}
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmPassword"
            label={t('new_password_view.labels.confirm_password')}
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('new_password_view.labels.submit')}
          </LoadingButton>

          <Typography variant="body2">
            {t('new_password_view.labels.resend_title')}{`  `}
            <Link
              variant="subtitle2"
              onClick={handleResendCode}
              sx={{
                cursor: 'pointer',
                ...(counting && {
                  color: 'text.disabled',
                  pointerEvents: 'none',
                }),
              }}
            >
              {t('new_password_view.labels.resend')} {counting && `(${countdown}s)`}
            </Link>
          </Typography>

          <Link
            component={RouterLink}
            href={paths.auth.login}
            variant="subtitle2"
            sx={{
              alignItems: 'center',
              display: 'inline-flex',
            }}
          >
            <Iconify icon="eva:arrow-ios-back-fill" width={16} />
            {t('new_password_view.labels.return')}
          </Link>
        </Stack>
      </FormProvider>
    </FormWrapper>
  );
}

export default NewPasswordView;
