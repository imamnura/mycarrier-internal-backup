import { useForm } from 'react-hook-form';
import validation from '../validation';

const useActions = ({ name = 'reason' }) => {
  const { control, handleSubmit, setValue, formState } = useForm({
    resolver: validation(name),
    mode: 'onChange',
  });

  return {
    control,
    handleSubmit,
    setValue,
    formState,
  };
};

export default useActions;
