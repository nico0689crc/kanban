'use client';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider from "@/components/hook-form/FormProvider";
import { useRouter } from '@/routes/hooks';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/auth/hooks';
import { paths } from '@/routes/paths';
import { useState } from 'react';
import { Alert, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { RHFTextField } from '@/components/hook-form';
import Iconify from '@/components/iconify';
import { RouterLink } from '@/routes/components';
import { useBoolean } from '@/hooks/useBoolean';
import { useLocales } from '@/locales';
import NProgress from 'nprogress';
import FormWrapper from './FormWrapper';

const LoginView = () => {
  const { t } = useLocales();
  const { login } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(t("login_view.validation.email_required")).email(t("login_view.validation.email_format")),
    password: Yup.string().required(t("login_view.validation.password_required")),
  });

  const defaultValues = {
    email: 'nico.06.89crc+1@gmail.com',
    password: 'fGksFjFFrb!@t89',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      router.push(paths.dashboard.root);
      NProgress.start();
    } catch (error: any) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormWrapper>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant="h4">{ t("login_view.labels.title") }</Typography>
          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{ t("login_view.labels.new_user") }</Typography>
            <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
              { t("login_view.labels.create_account") }
            </Link>
          </Stack>
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <RHFTextField name="email" label={ t("login_view.labels.email") } />

          <RHFTextField
            name="password"
            label={ t("login_view.labels.password") }
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

          <Link
            component={RouterLink}
            href={paths.auth.forgotPassword}
            variant="subtitle2"
            color="primary"
            underline="always"
            sx={{ alignSelf: 'flex-end' }}
          >
            { t("login_view.labels.forgot_password") }
          </Link>

          <LoadingButton
            fullWidth
            color="primary"
            type="submit"
            loading={isSubmitting}
            loadingIndicator={ t("login_view.labels.login_loading") }
          >
            { t("login_view.labels.login") }
          </LoadingButton>
        </Stack>
      </FormProvider>
    </FormWrapper>
  )
}

export default LoginView