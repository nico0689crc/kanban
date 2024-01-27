const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  auth: {
    login: `${ROOTS.AUTH}/login`,
    logout: `${ROOTS.AUTH}/logout`,
    register: `${ROOTS.AUTH}/register`,
    request_reset_password: `${ROOTS.AUTH}/request-reset-password`,
    verify: `${ROOTS.AUTH}/verify`,
    reset_password: `${ROOTS.AUTH}/reset-password`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    userProfile: `${ROOTS.DASHBOARD}/user-profile`,
    kanbanProjects: `${ROOTS.DASHBOARD}/kanban-projects`,
    newProject: `${ROOTS.DASHBOARD}/kanban-projects/new-project`
  },
};