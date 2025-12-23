import { useForm } from 'react-hook-form';
import { validation } from '../validation';
import { yupResolver } from '@hookform/resolvers/yup';

const useAction = (props) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validation()),
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(props.onSubmit);

  return {
    control,
    onSubmit,
  };
};

export default useAction;
