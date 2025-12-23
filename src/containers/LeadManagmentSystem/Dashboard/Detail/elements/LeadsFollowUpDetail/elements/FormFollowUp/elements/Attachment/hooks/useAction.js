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
      // type: value.type,
      comment: value.comment,
      fileName: value.document?.fileName,
      fileBase64: value.document?.data?.base64Encode,
      docType: value.docType,
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
