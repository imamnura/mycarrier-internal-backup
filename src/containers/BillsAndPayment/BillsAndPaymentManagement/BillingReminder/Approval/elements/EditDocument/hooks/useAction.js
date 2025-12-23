import { useEffect, useState } from 'react';

const useAction = (props) => {
  const { onClose: _onClose, open, template } = props;

  const [value, setValue] = useState(template || '');

  useEffect(() => {
    setValue(template);
  }, [template]);

  const onSubmit = () => {
    props.onSubmit(value);
  };

  const onClose = () => {
    setValue(template);
    _onClose();
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
