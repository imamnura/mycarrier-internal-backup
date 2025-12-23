import { cleanObject } from '@utils/common';

export const mergeForms = (additionalForm, filters) => {
  const mergedForms = [];

  additionalForm?.forEach((form) => {
    const isFormAlreadyMerged = mergedForms.some(
      (existingForm) => existingForm.formKey === form.formKey,
    );
    const shouldPushForm = Object.entries(filters).every(([key, value]) => {
      const formValue = form[key];
      if (Array.isArray(value)) {
        return value.includes(formValue);
      } else if (typeof value === 'boolean') {
        return Boolean(formValue) === value;
      } else {
        return formValue === value;
      }
    });

    if (!isFormAlreadyMerged && shouldPushForm) {
      mergedForms.push(cleanObject(form));
    }
  });

  return mergedForms;
};

export const normalizeAdditionalData = (formState, fieldProps = {}) => {
  const { formKey, formtype } = fieldProps;
  const stateKey = formState?.[formKey];
  let additionalData = {};

  if (['Text Field', 'Text Area'].includes(formtype)) {
    additionalData = {
      [formKey]: stateKey,
    };
  }

  if (formtype === 'Dropdown') {
    additionalData = {
      [formKey]: stateKey?.data?.value,
    };
  }
  if (formtype === 'Upload File') {
    let normalizeFile;
    if (stateKey?.length > 0) {
      normalizeFile = stateKey?.map((fileItem) => fileItem?.data);
    } else {
      if (stateKey?.data) {
        normalizeFile = [stateKey?.data];
      }
    }

    additionalData = {
      [formKey]: normalizeFile,
    };
  }

  if (['PIC Partner'].includes(formtype)) {
    additionalData = {
      [formKey]: stateKey?.map((item) => ({
        name: item?.name,
        email: item?.email,
        phoneNumber: item?.phoneNumber,
        id: item?.id,
      })),
    };
  }

  return cleanObject(additionalData);
};

export const normalizeFormAdditionalData = (data, fieldProps = {}) => {
  const { formKey, formtype } = fieldProps;
  const stateKey = data?.[formKey];
  let additionalData = {};

  if (['Text Field', 'Text Area'].includes(formtype)) {
    additionalData = {
      [formKey]: stateKey,
    };
  }

  if (formtype === 'Dropdown') {
    additionalData = {
      [formKey]: {
        label: stateKey,
        value: stateKey,
        data: {
          label: stateKey,
          value: stateKey,
        },
      },
    };
  }
  if (formtype === 'Upload File') {
    let normalizeFile;
    if (stateKey?.length > 0) {
      normalizeFile = stateKey?.map((fileItem) => fileItem);
    } else {
      if (stateKey?.data) {
        normalizeFile = [stateKey];
      }
    }

    additionalData = {
      [formKey]: normalizeFile,
    };
  }

  if (['PIC Partner'].includes(formtype)) {
    additionalData = {
      [formKey]: stateKey?.map((item) => ({
        name: item?.name,
        email: item?.email,
        phoneNumber: item?.phoneNumber,
        id: item?.id,
      })),
    };
  }

  return cleanObject(additionalData);
};
