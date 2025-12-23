import * as yup from 'yup';

const validation = yup.object().shape({
  formtype: yup.string().required().label('Form Type'),
  formName: yup.string().required().label('Form Name'),
  required: yup.bool().required().label('Mandatory Field'),
  placeholder: yup.string().label('Placeholder Text'),
  hint: yup.string().label('Hint Text'),
  regex: yup.string().when('formtype', {
    is: (formtype) => ['Text Field', 'Text Area'].includes(formtype),
    then: yup.string().required().label('Input Validation'),
  }),
  maxChar: yup.number().when('formtype', {
    is: (formtype) => ['Text Field', 'Text Area'].includes(formtype),
    then: yup
      .number()
      .integer('Please input round number, without comma')
      .moreThan(0)
      .typeError('You must specify a number')
      .label('Max. Characters')
      .required(),
  }),
  dropdownType: yup.string().when('formtype', {
    is: 'Dropdown',
    then: yup.string().required().label('Dropdown Type'),
  }),
  api: yup.string().when(['formtype', 'dropdownType'], {
    is: (formtype, dropdownType) =>
      (['Dropdown'].includes(formtype) && ['api'].includes(dropdownType)) ||
      ['Packages'].includes(formtype),
    then: yup.string().required().label('API'),
  }),
  dropdownOption: yup.array().when(['formtype', 'dropdownType'], {
    is: (formtype, dropdownType) =>
      ['Dropdown'].includes(formtype) && ['manual'].includes(dropdownType),
    then: yup
      .array()
      .required()
      .of(
        yup.object().shape({
          value: yup.string().required().label('Option'),
        }),
      )
      .min(1)
      .label('Dropdown Options'),
  }),
  fileType: yup.array().when('formtype', {
    is: 'Upload File',
    then: yup.array().required().min(1).label('File Type'),
  }),
  maxSize: yup.number().when('formtype', {
    is: 'Upload File',
    then: yup
      .number()
      .integer('Please input round number, without comma')
      .moreThan(0)
      .required()
      .typeError('You must specify a number')
      .label('Max. File Size'),
  }),
  multiple: yup.number().when('formtype', {
    is: 'Upload File',
    then: yup
      .number()
      .integer('Please input round number, without comma')
      .moreThan(0)
      .required()
      .typeError('You must specify a number')
      .label('Max. File'),
  }),
  isMultiple: yup.bool().when('formtype', {
    is: 'Upload File',
    then: yup.bool().required().label('Multiple Files'),
  }),
});

export default validation;
