export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export type AuthUserType = null | Record<string, any>;

export type AuthContextType = {
  user: AuthUserType;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    name: string,
    family_name: string
  ) => Promise<unknown>;
  logout: () => Promise<unknown>;
  confirmRegister: (email: string, code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resendCodeRegister: (email: string) => Promise<void>;
  newPassword: (email: string, code: string, password: string) => Promise<void>;
};

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

export enum Types {
  INITIAL = 'INITIAL',
  LOGOUT = 'LOGOUT',
}

export type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};