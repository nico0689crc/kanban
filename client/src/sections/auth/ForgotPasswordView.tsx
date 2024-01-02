'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// routes
import { paths } from '@/routes/paths';
import { useRouter } from '@/routes/hooks';
import { RouterLink } from '@/routes/components';

// auth
import { useAuthContext } from '@/auth/hooks';

// components
import Iconify from '@/components/iconify';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { useLocales } from '@/locales';
import { useState } from 'react';
import { Alert } from '@mui/material';
import nProgress from 'nprogress';
import FormWrapper from './FormWrapper';

// ----------------------------------------------------------------------

const ForgotPasswordView = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const { t } = useLocales();

  const { forgotPassword } = useAuthContext();

  const router = useRouter();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required(t("forgot_password_view.validation.email_required")).email(t("forgot_password_view.validation.email_format")),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword(data.email);

      const searchParams = new URLSearchParams({
        email: data.email,
      }).toString();

      const href = `${paths.auth.newPassword}?${searchParams}`;
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
          <Typography variant="h4">{t("forgot_password_view.labels.title")}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t("forgot_password_view.labels.sub_title")}
          </Typography>

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <RHFTextField name="email" label={t("forgot_password_view.labels.email")} />

          <LoadingButton
            fullWidth
            type="submit"
            loading={isSubmitting}
          >
            {t("forgot_password_view.labels.send")}
          </LoadingButton>

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
            {t("forgot_password_view.labels.return")}
          </Link>
        </Stack>
      </FormProvider>
    </FormWrapper>
  );
}

export default ForgotPasswordView;

