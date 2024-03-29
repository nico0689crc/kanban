import axios, { AxiosRequestConfig } from 'axios';
// config
import { HOST_API } from '@/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  
  const res = await axiosInstance.get(url,  { ...config });
  
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    login: '/users/authenticate',
    register: '/users/register',
    verify_email: '/users/verify-email',
    request_reset_password: '/users/request-reset-password',
    reset_password: '/users/reset-password',
  },
  projects: '/projects',
  tasks: {
    root: '/tasks',
    change_task_position: '/change-task-position'
  },
  sections: {
    root: '/sections',
    change_section_position: '/change-section-position'
  }
};
