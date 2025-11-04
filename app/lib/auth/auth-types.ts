export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthErrors = Record<string, string[] | undefined>;

export type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  status: number;
  message: string;
  errors?: AuthErrors;
  fields: Record<string, string | undefined>;
  pending?: boolean;
};

export type AuthAction =
  | { type: 'START' }
  | {
      type: 'LOGIN_SUCCESS' | 'REGISTER_SUCCESS';
      payload: { user: User; message?: string };
    }
  | {
      type: 'AUTH_ERROR';
      payload: {
        status?: number;
        message?: string;
        errors?: AuthErrors;
        fields?: Record<string, string>;
      };
    }
  | { type: 'RESET' }
  | { type: 'LOGOUT' };

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  user: null,
  status: 0,
  message: '',
  fields: {},
};
