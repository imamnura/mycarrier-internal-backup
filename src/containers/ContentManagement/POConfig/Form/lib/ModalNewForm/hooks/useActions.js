import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { normalizeNewForm } from '../utils';

const useAction = (props) => {
  const { open, setOpen, update, append } = props;

  const { control, reset, watch, handleSubmit, setValue, formState } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      required: false,
      multiple: 1,
      isMultiple: false,
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (open?.open) {
      if (open?.mode === 'edit')
        reset({
          ...open?.defaultValues,
          dropdownOption: open?.defaultValues?.dropdownOption?.map((item) => ({
            value: item,
          })),
        });
    }

    return () => {
      reset({
        required: false,
        multiple: 1,
        isMultiple: false,
      });
    };
  }, [open?.open]);

  const onSubmit = (values) => {
    if (open?.mode === 'edit') update(open?.index, normalizeNewForm(values));
    else append(normalizeNewForm(values));

    setOpen({ ...open, open: false });
  };

  return {
    control,
    formValues,
    onSubmit,
    handleSubmit,
    setValue,
    formState,
  };
};

export default useAction;
