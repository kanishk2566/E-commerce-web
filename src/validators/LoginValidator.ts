import { LoginData } from "@/types/user";

type LoginFormErrors = Record<keyof LoginData, string>;

type LoginValidatorResult = {
  isValid: boolean,
  errors: LoginFormErrors,
}

export const INITIAL_LOGIN_FORM_ERRORS: LoginFormErrors = {
  email: "",
  password: ""
}

export async function validateLoginForm(formData: LoginData): Promise<LoginValidatorResult> {

  // const trimmedEmail = formData.email.trim();
  // const trimmedPassword = formData.password.trim();
  const errors = {...INITIAL_LOGIN_FORM_ERRORS};

  if(!formData.email) {
    errors.email = "Email is required";
  }

  if(!formData.password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}