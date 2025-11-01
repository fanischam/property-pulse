import { useMemo, useState } from 'react';
import { PasswordSchema } from '../lib/definitions';

export type PasswordRules = {
  length: boolean;
  letter: boolean;
  digit: boolean;
  special: boolean;
  match: boolean;
};

export function usePasswordValidation() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwdErrors, setPwdErrors] = useState<string[]>([]);
  const [confirmErrors, setConfirmErrors] = useState<string[]>([]);

  const validate = (p: string, c: string) => {
    const res = PasswordSchema.safeParse({ password: p, confirmPassword: c });
    if (res.success) {
      setPwdErrors([]);
      setConfirmErrors([]);
      return true;
    }
    const byField: Record<string, string[]> = {};
    for (const issue of res.error.issues) {
      const key = issue.path.join('.') || 'form';
      (byField[key] ??= []).push(issue.message);
    }
    setPwdErrors(byField.password ?? []);
    setConfirmErrors(byField.confirmPassword ?? []);
    return false;
  };

  const onPasswordChange = (v: string) => {
    setPassword(v);
    validate(v, confirm);
  };

  const onConfirmChange = (v: string) => {
    setConfirm(v);
    validate(password, v);
  };

  const isValid = useMemo(
    () =>
      PasswordSchema.safeParse({ password, confirmPassword: confirm }).success,
    [password, confirm]
  );

  const rules: PasswordRules = useMemo(
    () => ({
      length: password.length >= 8,
      letter: /[a-zA-Z]/.test(password),
      digit: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      match: confirm.length > 0 && password === confirm,
    }),
    [password, confirm]
  );

  return {
    password,
    confirm,
    pwdErrors,
    confirmErrors,
    isValid,
    rules,
    onPasswordChange,
    onConfirmChange,
  };
}
