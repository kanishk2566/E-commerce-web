import { getUser } from "@/services/auth";
import { ChangePasswordData } from "@/types/user";

export type ChangePasswordFormError = Record<keyof ChangePasswordData, string>;

type ChangePasswordValidatorResult = {
  isValid: boolean,
  errors: ChangePasswordFormError,
};

export const INITIAL_CHANGE_PASSWORD_FORM_ERRORS: ChangePasswordFormError = {
  password: "",
  confirmPassword: "",
  previousPassword: "",
};

export async function validateChangePasswordForm(password: ChangePasswordData, userId: string): Promise<ChangePasswordValidatorResult> {
  const user = await getUser(userId);
  const trimmedPassword = password.password.trim();
  const trimmedConfirmPassword = password.confirmPassword.trim();
  const errors = {...INITIAL_CHANGE_PASSWORD_FORM_ERRORS};
  const trimmedPreviousPassword = password.previousPassword.trim();

  if(trimmedPreviousPassword !== user.password) {
    errors.previousPassword = "Invalid password";
  }

  if(!trimmedPassword) {
    errors.password = "Please enter password";
  } else if(trimmedPassword.length < 8) {
    errors.password = "Password must be atleast 8 characters";
  } else if (trimmedPassword === user.password) {
    errors.password = "Password cannot be your last password";
  }

  if(trimmedConfirmPassword !== trimmedPassword) {
    errors.confirmPassword = "Password does not match";
  }

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}