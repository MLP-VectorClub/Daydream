import { FieldError, FieldValues } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import { Nullable, UnifiedErrorResponse, UnifiedErrorResponseTypes, ValidationErrorResponse } from 'src/types';
import { common } from 'src/strings';

export const combineErrors = <FormValues extends FieldValues = FieldValues>(
  clientErrors: FieldErrors<FormValues>,
  serverErrors: Nullable<UnifiedErrorResponse>,
): ValidationErrorResponse['errors'] => {
  const copy: ValidationErrorResponse['errors'] = {};
  Object.entries(clientErrors).forEach(([key, value]) => {
    const types = (value as FieldError)?.types;
    if (types) {
      copy[key] = Object.values(types) as string[];
    }
  });
  if (serverErrors && serverErrors.type === UnifiedErrorResponseTypes.VALIDATION_ERROR) {
    Object.keys(serverErrors.errors).forEach(key => {
      const newStartingValue = copy[key] || [];
      if (Array.isArray(serverErrors.errors[key])) {
        copy[key] = newStartingValue.concat(serverErrors.errors[key]);
      }
    });
  }
  return copy;
};

export const validateRequired = (key: keyof typeof common.validation = 'required') => ({ required: common.validation[key] });
export const validateMinLength = (count: number, key: keyof typeof common.validation = 'tooShort') => ({
  minLength: {
    value: count,
    message: common.validation[key].replace('{{count}}', String(count)),
  },
});
export const validateMaxLength = (count: number, key: keyof typeof common.validation = 'tooLong') => ({
  maxLength: {
    value: count,
    message: common.validation[key].replace('{{count}}', String(count)),
  },
});

export const validateEmail = <T extends FieldValues>() => ({
  email: (value: T['email']) => /^[^@]+@[^@]+$/.test(value) || common.validation.email,
});

export const validateUserName = <T extends FieldValues>() => ({
  ...validateMinLength(5),
  ...validateMaxLength(20),
  validate: {
    name: (value: T['name']) => /^[A-Za-z\d_-]+$/.test(value) || common.validation.format,
  },
});

export const validatePassword = () => ({
  ...validateMinLength(8),
  ...validateMaxLength(300),
});
