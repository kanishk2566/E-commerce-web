import { EditData } from "@/types/user";

export type EditFormErrors = Record<keyof EditData, string>;

type EditValidatorResult = {
  isValid: boolean,
  errors: EditFormErrors,
}

export const INITIAL_EDIT_FORM_ERRORS: EditFormErrors = {
  email: "",
  name: ""
};

export function validateEditForm(formData: EditData): EditValidatorResult {
  const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const trimmedEmail  = formData.email.trim();
  const trimmedName = formData.name.trim();
  const errors = {...INITIAL_EDIT_FORM_ERRORS};

  if(!trimmedEmail) {
    errors.email = "Email cannot be empty";
  } else if(!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = "Enter valid email";
  }

  if(!trimmedName) {
    errors.name = "Name cannot be empty";
  } else if(trimmedEmail.length < 3) {
    errors.name = "Name must be atleast 3 characters";
  }

  return {
    isValid: Object.values(errors).every((value) => value === ""),
    errors,
  }
}