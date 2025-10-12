import type { FormValues } from './types';

export const createInitialsValues = (values?: FormValues): FormValues => ({
    firstName: values?.firstName ?? '',
    middleName: values?.middleName ?? '',
    isMiddleNameRequired: values?.isMiddleNameRequired ?? false,
    lastName: values?.lastName ?? '',
    skills: values?.skills ?? [''],
});
