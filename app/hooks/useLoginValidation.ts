import { useMemo, useState } from 'react';
import { LoginFormSchema } from '../lib/definitions';

export function useLoginValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [pwdErrors, setPwdErrors] = useState<string[]>([]);

  const validate = (e: string, p: string) => {
    const res = LoginFormSchema.safeParse({ email: e, password: p });

    if (res.success) {
      setEmailErrors([]);
      setPwdErrors([]);
      return true;
    }

    const errorsMap: Record<string, string[]> = {};

    for (const issue of res.error.issues) {
      const key = issue.path.join('.') || 'form';
      (errorsMap[key] ??= []).push(issue.message);
    }

    const { email: emailErrors, password: pwdErrors } = errorsMap;
    setEmailErrors(emailErrors);
    setPwdErrors(pwdErrors);
    return false;
  };

  const onEmailChange = (v: string) => {
    setEmail(v);
    validate(v, password);
  };

  const onPasswordChange = (v: string) => {
    setPassword(v);
    validate(email, v);
  };

  const isValid = useMemo(
    () => LoginFormSchema.safeParse({ email, password }).success,
    [email, password]
  );

  return {
    email,
    password,
    emailErrors,
    pwdErrors,
    isValid,
    onEmailChange,
    onPasswordChange,
  };
}
