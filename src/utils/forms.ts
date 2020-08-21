import { TFunction } from 'next-i18next';
import { FieldValues } from 'react-hook-form';
import { FieldErrors } from 'react-hook-form/dist/types';
import { get } from 'lodash';
import { Nullable, UnifiedErrorResponse, UnifiedErrorResponseTypes, ValidationErrorResponse } from '../types';

export const combineErrors = <FormValues extends FieldValues = FieldValues>(
  clientErrors: FieldErrors<FormValues>,
  serverErrors: Nullable<UnifiedErrorResponse>,
) => {
  const copy: ValidationErrorResponse['errors'] = {};
  Object.keys(clientErrors).forEach(key => {
    const types = get(clientErrors, [key, 'types']);
    if (types) {
      copy[key] = Object.values(types);
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

export const validateRequired = (t: TFunction, key = 'required') => ({ required: t(`validation.${key}`) });
export const validateMinLength = (t: TFunction, count: number, key = 'tooShort') => ({
  minLength: {
    value: count,
    message: t(`validation.${key}`, { count }),
  },
});
export const validateMaxLength = (t: TFunction, count: number, key = 'tooLong') => ({
  maxLength: {
    value: count,
    message: t(`validation.${key}`, { count }),
  },
});

export const validateEmail = <T extends FieldValues>(t: TFunction) => ({
  email: (value: T['email']) => /^[^@]+@[^@]+$/.test(value) || (t('validation.email') as string),
});

export const validateUserName = <T extends FieldValues>(t: TFunction) => ({
  ...validateMinLength(t, 5),
  ...validateMaxLength(t, 20),
  validate: {
    name: (value: T['name']) => /^[A-Za-z\d_-]+$/.test(value) || (t('validation.format') as string),
  },
});

export const validatePassword = (t: TFunction) => ({
  ...validateMinLength(t, 8),
  ...validateMaxLength(t, 300),
});
