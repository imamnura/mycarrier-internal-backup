import { useEffect, useState } from 'react';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

const useAction = (props) => {
  const { open, onSubmit: _onSubmit } = props;
  const { feature, data } = useDetailData();

  const [category, setCategory] = useState('');

  useEffect(() => {
    if (open) {
      setCategory('');
    }
  }, [open]);

  const onSubmit = () => {
    _onSubmit(category);
  };

  return {
    data,
    feature,
    onSubmit,
    category,
    setCategory,
    open,
  };
};

export default useAction;
