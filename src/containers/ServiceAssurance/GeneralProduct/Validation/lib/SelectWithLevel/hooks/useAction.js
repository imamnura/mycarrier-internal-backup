import { useRef, useState, useEffect } from 'react';

const useAction = (props) => {
  const { value: _value, onChange: _onChange, data } = props;

  const refField = useRef(null);

  const [selected, setSelected] = useState(_value || '');
  const [value, setValue] = useState('');
  const [open, _setOpen] = useState(false);

  useEffect(() => {
    const initial = data.filter(({ content }) => content === _value);

    if (initial.length !== 0) {
      setValue(initial[0].symptompDesc);
    }
  }, []);

  const setOpen = (val) => async () => {
    _setOpen(val);
  };

  const onChange = (e) => {
    setSelected(e.target.value);
  };

  const handleValue = (res) => () => {
    _onChange({
      symptompName: res.symptompName,
      symptompId: res.symptompId,
      symptompDesc: res.symptompDesc,
      symptompPath: res.symptompPath,
    })();
    setValue(res.value);
  };

  return {
    data,
    open,
    refField,
    setOpen,
    onChange,
    selected,
    value,
    handleValue,
  };
};

export default useAction;
