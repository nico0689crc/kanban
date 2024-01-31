'use client';

import { AuthGuard } from '@/auth/guard';
import { SnackbarProvider } from '@/components/snackbar';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';


type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <AuthGuard>
      <SnackbarProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </SnackbarProvider>
    </AuthGuard>
  );
}

export default Layout