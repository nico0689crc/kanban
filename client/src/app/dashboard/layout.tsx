'use client';

import { AuthGuard } from "@/auth/guard";
import { useAuthContext } from "@/auth/hooks";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

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