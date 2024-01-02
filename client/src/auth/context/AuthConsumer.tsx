'use client';

import { AuthContext } from "./AuthContext";


export const AuthConsumer = ({ children } : { children: React.ReactNode }) => {
  return (
    <AuthContext.Consumer>
      {(auth) => !auth.loading ? children : null}
    </AuthContext.Consumer>
  );
} 