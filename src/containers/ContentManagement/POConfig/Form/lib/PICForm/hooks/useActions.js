import { phoneRegex } from '@utils/common';
import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { array, object, string } from 'yup';

const useAction = (props) => {
  const { useForm, fieldProps } = props;
  const [open, setOpen] = useState(false);

  const { fields, remove, append, update } = useFieldArray({
    control: useForm?.control,
    name: fieldProps?.formKey,
    rules: {
      validate: async (value) => {
        if (fieldProps?.required) {
          return array()
            .of(
              object().shape({
                id: string().optional().label('Id PIC'),
                name: string().required().label('Name'),
                email: string().required().email().label('Email'),
                phoneNumber: string()
                  .matches(
                    phoneRegex,
                    'Phone Number must use the correct format (+62xxx)',
                  )
                  .required()
                  .min(12)
                  .label('Phone Number'),
              }),
            )
            .min(1)
            .required()
            .label(fieldProps?.formName?.toString())
            .validate(value)
            .then(() => true)
            .catch((err) => err?.message);
        } else {
          return array()
            .of(
              object().shape({
                id: string().optional().label('Id PIC'),
                name: string().required().label('Name'),
                email: string().required().email().label('Email'),
                phoneNumber: string()
                  .matches(
                    phoneRegex,
                    'Phone Number must use the correct format (+62xxx)',
                  )
                  .required()
                  .min(12)
                  .label('Phone Number'),
              }),
            )
            .min(0)
            .optional()
            .nullable()
            .label(fieldProps?.formName?.toString())
            .validate(value)
            .then(() => true)
            .catch((err) => err?.message);
        }
      },
    },
  });

  const handleDelete = (index) => () => remove(index);

  const onClickButtonNewForm = (content) => () => setOpen(content);

  return {
    open,
    setOpen,
    onClickButtonNewForm,
    handleDelete,
    fields,
    append,
    update,
  };
};

export default useAction;
