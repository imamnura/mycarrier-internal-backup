import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';

const useActions = (props) => {
  const {
    useForm: { _control },
  } = props;

  const { fields, append, remove, update } = useFieldArray({
    control: _control,
    name: 'sponsors',
  });

  const [file, setFile] = useState(null);

  const handleAddFile = (v) => {
    setFile(v);
  };

  const handleAddSponsor = () => {
    append(file);

    setFile(null);
  };

  const handleUpdateImage = (i, data) => {
    update(i, data);
  };

  return {
    fields,
    remove,
    file,
    handleAddSponsor,
    handleAddFile,
    handleUpdateImage,
  };
};

export default useActions;
