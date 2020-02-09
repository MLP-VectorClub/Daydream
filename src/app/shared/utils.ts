import { get, range as _range, trim } from 'lodash-es';
import { HttpErrorResponse } from '@angular/common/http';
import { Nullable, UnifiedErrorResponse, UnifiedErrorResponseTypes, ValidationErrorResponse } from 'app/types';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/*export const sanitizeGuideName = (value: string): GuideName => {
  if (GUIDE_NAMES.includes(value as GuideName))
    return value as GuideName;
  return GUIDE_NAMES[0];
};*/
export const sanitizePageParam = (value: string) => {
  const page = parseInt(value, 10);
  if (isNaN(page) || page < 1)
    return 1;
  return page;
};
export const sanitizePageSizeParam = (values: number[]) => (value: string) => {
  const size = parseInt(value, 10);
  if (!values.includes(size))
    return values[0];
  return size;
};
export const sanitizeSearchParam = (value?: string): string => {
  if (typeof value !== 'string')
    return '';
  return value.trim();
};

export const makeUrlSafe = (input: string): string => {
  return trim(input.replace(/[^A-Za-z\d\-]/g, '-').replace(/-+/g, '-'), '-');
};

/**
 * Clear way to make sure the first page does not show as a query param in the URL
 */
export const paginationParam = (page: number): number | undefined =>
  page === 1 ? undefined : page;

export const range = (start: number, end: number, step = 1): number[] => _range(start, end + step, step);

function isFormGroup(control: AbstractControl): control is FormGroup {
  return Boolean((control as FormGroup).controls);
}

export const collectErrors = (control: AbstractControl): Nullable<ValidationErrors> =>
  isFormGroup(control) ? Object.entries(control.controls)
    .reduce(
      (acc: Nullable<ValidationErrors>, [key, childControl]) => {
        const childErrors = collectErrors(childControl);
        if (childErrors) {
          const mergeObject = { [key]: childErrors };
          if (acc === null)
            acc = mergeObject;
          else acc = { ...acc, ...mergeObject };
        }
        return acc;
      },
      null
    ) : control.errors;

export const httpResponseMapper = (err: HttpErrorResponse): UnifiedErrorResponse => {
  switch (err.status) {
    case 401:
      return { type: UnifiedErrorResponseTypes.AUTHENTICATION_ERROR };
    case 422:
      const body = err.error as ValidationErrorResponse;
      return {
        type: UnifiedErrorResponseTypes.VALIDATION_ERROR,
        ...body
      };
    default:
      const message = get(err, 'error.message');
      console.error(err);
      if (message)
        return {
          type: UnifiedErrorResponseTypes.MESSAGE_ONLY,
          message,
        };
      return {
        type: UnifiedErrorResponseTypes.UNKNOWN,
        payload: JSON.stringify(err, null, 2),
      };
  }
};
