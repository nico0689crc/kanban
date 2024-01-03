'use client';

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import axios, { endpoints } from '@/utils/axios';
import { AuthStateType, Action, Types, AuthUserType } from "../types";
import { STORAGE_KEY_USER_DATA } from "@/config-global";

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

type Props = {
  children: React.ReactNode
}

export const AuthProvider =({ children } : Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const jwtDecode = useCallback((token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }, []);

  const setStorageUserData = useCallback((user: AuthUserType) => {
    let expiredTimer;

    localStorage.setItem(STORAGE_KEY_USER_DATA, JSON.stringify(user));
    
    axios.defaults.headers.common.Authorization = `Bearer ${user?.accessToken}`;

    clearTimeout(expiredTimer);

    const { exp } = jwtDecode(user?.accessToken);
    const remainingTime = new Date(exp * 1000).getTime() - new Date().getTime();

    expiredTimer = setTimeout(async () => {
      await logout();
    }, remainingTime);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isValidToken = useCallback((accessToken: string) => {
    if (!accessToken) {
      return false;
    }
  
    const { exp } = jwtDecode(accessToken);
  
    const currentTime = Date.now() / 1000;
  
    return exp > currentTime;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const initialize = useCallback(async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEY_USER_DATA)!);
      
      if (currentUser?.accessToken && isValidToken(currentUser?.accessToken)) {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...currentUser
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, [isValidToken]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const { data: { data: { attributes: user } } } = await axios.post(endpoints.auth.login, { email, password });

    setStorageUserData(user);

    dispatch({
      type: Types.INITIAL,
      payload: {
        user: {
          ...user,
          id: user.uuid,
          displayName: `${user.first_name} ${user.last_name}`,
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string, name: string, family_name: string) => {

  },[]);

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email: string, code: string) => {

  }, []);

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email: string) => {
   
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY_USER_DATA); 

    dispatch({
      type: Types.LOGOUT,
    });

    router.replace(paths.auth.login);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FORGOT PASSWORD
  const forgotPassword = useCallback(async (email: string) => {

  }, []);

  // NEW PASSWORD
  const newPassword = useCallback(async (email: string, code: string, password: string) => {
   
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
      register,
      newPassword,
      forgotPassword,
      confirmRegister,
      resendCodeRegister
    }),
    [ login, logout, register, newPassword, forgotPassword, confirmRegister, resendCodeRegister, state, status ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
};