import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import validation from '../validation';

const useAction = (props) => {
  const { control, handleSubmit } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit(props.onSubmit);

  const {
    query: { params: claimId },
  } = useRouter();

  return {
    control,
    onSubmit,
    claimId,
  };
};

export default useAction;
