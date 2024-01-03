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
import nProgress from 'nprogress';
import FormWrapper from './FormWrapper';

const RegisterView = () => {
  const { t } = useLocales();
  
  const { register } = useAuthContext();
  
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  
  const password = useBoolean();
  const confirm_password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required(t("register_view.validation.first_name_required")),
    last_name: Yup.string().required(t("register_view.validation.last_name_required")),
    email: Yup.string().required(t("register_view.validation.email_required")).email(t("register_view.validation.email_format")),
    password: Yup.string().required(t("register_view.validation.password_required")),
    confirm_password: Yup.string().required(t("register_view.validation.password_required")),
  });

  const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  const methods = useForm({ resolver: yupResolver(RegisterSchema), defaultValues });

  const { handleSubmit, formState: { isSubmitting }, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data.email, data.password, data.confirm_password, data.first_name, data.last_name);

      const searchParams = new URLSearchParams({
        email: data.email,
      }).toString();

      const href = `${paths.auth.verify}?${searchParams}`;

      router.push(href);

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
    <FormWrapper>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack rowGap={3}>
          <Typography variant="h4">{ t("register_view.labels.title") }</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">{ t("register_view.labels.have_account") }</Typography>

            <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
              { t("register_view.labels.sign_in") }
            </Link>
          </Stack>

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2}>
            <RHFTextField name="first_name" label={ t("register_view.labels.first_name") } />
            <RHFTextField name="last_name" label={ t("register_view.labels.last_name") } />
          </Stack>

          <RHFTextField name="email" label={ t("register_view.labels.email") } />

          <RHFTextField
            name="password"
            label={ t("register_view.labels.password") }
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
            name="confirm_password"
            label={ t("register_view.labels.confirm_password") }
            type={confirm_password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={confirm_password.onToggle} edge="end">
                    <Iconify icon={confirm_password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            loading={isSubmitting}
          >
            { t("register_view.labels.create_account") }
          </LoadingButton>
        </Stack>
      </FormProvider>
    </FormWrapper>
  )
}

export default RegisterView