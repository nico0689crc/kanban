'use client';

import { GuestGuard } from "@/auth/guard";
import AuthLayout from "@/layouts/auth/AuthLayout";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <GuestGuard>
      <AuthLayout>
        {children}
      </AuthLayout>
    </GuestGuard>
  )
}

export default Layout