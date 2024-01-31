'use client';

import { AuthGuard } from '@/auth/guard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';


type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
}

export default Layout