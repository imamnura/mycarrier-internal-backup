import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(props.onSubmit);

  return {
    control,
    onSubmit,
  };
};

export default useAction;
