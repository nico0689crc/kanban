import DashboardLayout from "@/layouts/dashboard/DashboardLayout";

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children } : Props) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
}

export default Layout