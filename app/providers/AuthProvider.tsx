import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  AuthAction,
  AuthState,
  initialAuthState,
} from '../lib/auth/auth-types';

type AuthProviderProps = {
  children: React.ReactNode;
  initialAuth?: Partial<AuthState>;
};

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'START':
      return {
        ...state,
        pending: true,
        message: '',
        status: 0,
        errors: undefined,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        pending: false,
        isLoggedIn: true,
        user: action.payload.user,
        message: '',
        status: 200,
        errors: undefined,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        message: action.payload.message ?? 'Authentication error',
        status: action.payload.status ?? 400,
        errors: action.payload.errors,
        fields: action.payload.fields,
      };
    case 'RESET':
      return {
        ...state,
        pending: false,
        message: '',
        status: 0,
        errors: undefined,
      };
    case 'LOGOUT':
      return { ...initialAuthState };
    default:
      return state;
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

const AuthProvider = ({ children, initialAuth }: AuthProviderProps) => {
  const mergedState = { ...initialAuthState, ...initialAuth };
  const [state, dispatch] = useReducer(reducer, mergedState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default AuthProvider;
