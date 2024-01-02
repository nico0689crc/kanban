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

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required(t("register_view.validation.first_name_required")),
    familyName: Yup.string().required(t("register_view.validation.family_name_required")),
    email: Yup.string().required(t("register_view.validation.email_required")).email(t("register_view.validation.email_format")),
    password: Yup.string().required(t("register_view.validation.password_required")),
  });

  const defaultValues = {
    firstName: '',
    familyName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register(data.email, data.password, data.firstName, data.familyName);
      const searchParams = new URLSearchParams({
        email: data.email,
      }).toString();

      const href = `${paths.auth.verify}?${searchParams}`;

      router.push(href);

      nProgress.start();
    } catch (error: any) {
      setErrorMsg(typeof error === 'string' ? error : error.message);
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
            <RHFTextField name="firstName" label={ t("register_view.labels.first_name") } />
            <RHFTextField name="familyName" label={ t("register_view.labels.family_name") } />
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