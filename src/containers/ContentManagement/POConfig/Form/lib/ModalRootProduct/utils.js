import { cleanObject } from '@utils/common';

export const regexString = {
  allChar: '.',
  onlyLetter: '^[A-Za-z]+$',
  onlyNumber: '^\\d+$',
  phoneNumber: '^(^\\+62)(\\d{3,4}-?){2}\\d{3,4}$',
};

export const normalizeNewForm = (values) => {
  const additionalValues = {
    'Text Field': {
      placeholder: values?.placeholder,
      regex: values?.regex,
      maxChar: Number(values?.maxChar),
    },
    'Text Area': {
      placeholder: values?.placeholder,
      hint: values?.hint,
      regex: values?.regex,
      maxChar: Number(values?.maxChar),
    },
    'Upload File': {
      fileType: values?.fileType,
      maxSize: Number(values?.maxSize),
      isMultiple: values?.isMultiple,
      multiple: Number(values?.multiple),
    },
    Packages: {
      api: values?.api,
    },
    Dropdown: {
      placeholder: values?.placeholder,
      dropdownType: values?.dropdownType,
      ...(values?.dropdownType === 'manual'
        ? {
            dropdownOption: values?.dropdownOption?.map(
              (item) => item?.value ?? item,
            ),
          }
        : {
            api: values?.api,
          }),
    },
  }[values.formtype];

  const normalize = cleanObject({
    formKey: values?.formKey,
    formtype: values.formtype,
    formName: values.formName,
    required: values.required,
    hint: values?.hint,
    isNotEditableOnReturn: values.isNotEditableOnReturn,
    isSpecialRequireField: values.isSpecialRequireField,
    ...additionalValues,
  });

  return normalize;
};
