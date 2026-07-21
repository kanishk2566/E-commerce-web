import { RegisterData } from "@/types/user";

type RegisterFormErrors = Record<keyof RegisterData , string>;

type RegisterValidatorResult = {
  isValid: boolean,
  errors: RegisterFormErrors,
};

export const INITIAL_REGISTER_FORM_ERRORS: RegisterFormErrors = {
  name: "",
  email: "",
  password: "",
}

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validateRegisterForm(formData: RegisterData): RegisterValidatorResult {

  const trimmedName = formData.name.trim();
  const trimmedEmail = formData.email.trim();
  const trimmedPassword = formData.password.trim();

  const errors = {...INITIAL_REGISTER_FORM_ERRORS};
  
  if(!trimmedName) {
    errors.name = "Name is required"; 
  } else if(trimmedName.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if(!trimmedEmail) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(trimmedEmail)){
    errors.email = "Enter valid email";
  }

  if(!trimmedPassword) {
    errors.password = "Password is required";
  } else if(trimmedPassword.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  
  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  };
}