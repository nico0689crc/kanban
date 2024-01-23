'use client';

import { AuthGuard } from '@/auth/guard';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { Provider } from 'react-redux';
import { store } from '@/store';

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <AuthGuard>
      <Provider store={store}>
        <DashboardLayout>{children}</DashboardLayout>
      </Provider>
    </AuthGuard>
  );
}

export default Layout