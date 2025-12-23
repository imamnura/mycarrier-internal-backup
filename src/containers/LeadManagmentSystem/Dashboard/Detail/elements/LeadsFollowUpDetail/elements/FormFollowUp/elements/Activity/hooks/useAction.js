import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  useEffect(() => {
    reset(props.defaultValues);
  }, [props.defaultValues]);

  // const onSubmit = handleSubmit((value) => {
  const onSubmit = (value) => {
    const payload = {
      type: value.type,
      description: value.description,
      due_date: value.due_date,
      status: value.status,
      priority: value.priority,
      duration: value.duration,
    };

    props.onSubmit(payload);
  };

  return {
    control,
    onSubmit,
    handleSubmit,
  };
};

export default useAction;
