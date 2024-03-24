import { paths } from '@/routes/paths';

export const HOST_API = process.env.NEXT_PUBLIC_SERVER_API_BASE_URL;

export const PATH_AFTER_LOGIN = paths.dashboard.root;
export const PATH_LOGIN = paths.auth.login;

export const STORAGE_KEY_SETTINGS = 'settings_kanban';
export const STORAGE_KEY_USER_DATA = 'user_data_kanban';
