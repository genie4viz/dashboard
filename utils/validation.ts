const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const isEmail = (email: string) => emailRegex.test(email);

export const required = (errorMsg: string) => (value: string) =>
  value &&
  (Array.isArray(value) ? value.length : value.replace(/\s/g, '').length)
    ? undefined
    : errorMsg;

export const requiredObject = (errorMsg: string) => (value: string) =>
  value ? undefined : errorMsg;

export const emailFormat = (errorMsg: string) => (value: string) =>
  isEmail(value) ? undefined : errorMsg;

export const passwordFormat = (errorMsg: string) => (value: string) =>
  value.length >= 8 ? undefined : errorMsg;

export const pageNumValidators = (errorMsg: string) => (value: string) =>
  /^\d+(?:,\d+)*$/.test(value) || /^\d+-\d+$/.test(value) || !value
    ? undefined
    : errorMsg;

export const composeValidators = (
  ...validators: Array<(value: string) => string | undefined>
) => (value: string) =>
  validators.reduce((error, validator) => error || validator(value), '');
