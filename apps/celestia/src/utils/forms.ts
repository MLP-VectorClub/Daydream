import { FieldError, FieldValues } from 'react-hook-form';
import { FieldErrors, ValidateResult } from 'react-hook-form/dist/types';
import { Nullable, UnifiedErrorResponse, UnifiedErrorResponseTypes } from 'src/types';
import { ValidationErrorResponse } from '@mlp-vectorclub/api-types';
import { TFunction } from 'next-i18next';
import { CustomTypeOptions } from 'react-i18next';

export const combineErrors = <FormValues extends FieldValues = FieldValues>(
  clientErrors: FieldErrors<FormValues>,
  serverErrors: Nullable<UnifiedErrorResponse>
): ValidationErrorResponse['errors'] => {
  const copy: ValidationErrorResponse['errors'] = {};
  Object.entries(clientErrors).forEach(([key, value]) => {
    const types = (value as FieldError)?.types;
    if (types) {
      copy[key] = Object.values(types) as ValidationErrorResponse['errors'][string];
    }
  });
  if (serverErrors && serverErrors.type === UnifiedErrorResponseTypes.VALIDATION_ERROR) {
    Object.keys(serverErrors.errors).forEach((key) => {
      const newStartingValue = copy[key] || [];
      if (Array.isArray(serverErrors.errors[key])) {
        copy[key] = newStartingValue.concat(serverErrors.errors[key]) as ValidationErrorResponse['errors'][string];
      }
    });
  }
  return copy;
};

type ValidationI18nKeys = keyof CustomTypeOptions['resources']['common']['validation'] & string;

export const validateRequired = (t: TFunction, key: ValidationI18nKeys = 'required') => ({
  required: t(`common:validation.${key}`) as string,
});
export const validateMinLength = (t: TFunction, count: number, key: ValidationI18nKeys = 'tooShort') => ({
  minLength: {
    value: count,
    message: t(`common:validation.${key}`, { count }),
  },
});
export const validateMaxLength = (t: TFunction, count: number, key: ValidationI18nKeys = 'tooLong') => ({
  maxLength: {
    value: count,
    message: t(`common:validation.${key}`, { count }),
  },
});

export const validateEmail = <T extends FieldValues>(t: TFunction) => ({
  email: (value: T['email']) => /^[^@]+@[^@]+$/.test(value) || (t('common:validation.email') as string),
});

export const validateUserName = <T extends FieldValues>(t: TFunction, key: keyof T = 'name') => ({
  ...validateMinLength(t, 5),
  ...validateMaxLength(t, 20),
  validate: {
    [key]: (value: T[typeof key]): ValidateResult => /^[A-Za-z\d_-]+$/.test(value) || (t('common:validation.format') as string),
  },
});

export const validatePassword = (t: TFunction) => ({
  ...validateMinLength(t, 8),
  ...validateMaxLength(t, 300),
});
