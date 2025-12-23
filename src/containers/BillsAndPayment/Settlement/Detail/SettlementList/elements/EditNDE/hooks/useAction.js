import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { onClose, open, template } = props;

  const [value, setValue] = useState(template || '');

  useEffect(() => {
    setValue(template);
  }, [template]);

  const onSubmit = () => {
    props.onSubmit(value);
  };

  return {
    onClose,
    onSubmit,
    open,
    setValue,
    value,
  };
};

export default useAction;
