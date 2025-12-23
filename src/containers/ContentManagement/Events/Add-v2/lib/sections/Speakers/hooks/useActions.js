import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validation } from '../yupResolver';

const useActions = (props) => {
  const {
    useForm: { _control },
  } = props;
  const { formState, control, setValue, getValues, reset } = useForm({
    resolver: yupResolver(validation),
    mode: 'onChange',
    defaultValues: {
      speakerPhoto: null,
      speakerName: '',
      speakerPosition: '',
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control: _control,
    name: 'speakers',
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    setValue('speakerPhoto', file);
  }, [file]);

  const handleAddFile = (v) => {
    setFile(v);
    setValue('speakerPhoto', v);
  };

  const handleAddSpeaker = () => {
    append({
      imageUrl: getValues('speakerPhoto'),
      name: getValues('speakerName'),
      position: getValues('speakerPosition'),
    });

    reset({
      speakerPhoto: null,
      speakerName: '',
      speakerPosition: '',
    });
    setFile(null);
  };

  const handleUpdateImage = (i, data) => {
    update(i, {
      ...fields[i],
      imageUrl: data,
    });
  };

  return {
    formState,
    control,
    _control,
    fields,
    remove,
    file,
    handleAddSpeaker,
    handleAddFile,
    handleUpdateImage,
  };
};

export default useActions;
