'use client';

import { useCallback, useEffect, useMemo, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { AuthStateType, Action, Types } from "../types";

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
  const [state, dispatch] = useReducer(reducer, initialState)

  const initialize = useCallback(async () => {

  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {

  }, []);

  // REGISTER
  const register = useCallback(
    async (email: string, password: string, name: string, family_name: string) => {

    },
    []
  );

  // CONFIRM REGISTER
  const confirmRegister = useCallback(async (email: string, code: string) => {

  }, []);

  // RESEND CODE REGISTER
  const resendCodeRegister = useCallback(async (email: string) => {
   
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {

    dispatch({
      type: Types.LOGOUT,
    });
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
      resendCodeRegister,
    }),
    [login, logout, register, newPassword, forgotPassword, confirmRegister, resendCodeRegister, state, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
};