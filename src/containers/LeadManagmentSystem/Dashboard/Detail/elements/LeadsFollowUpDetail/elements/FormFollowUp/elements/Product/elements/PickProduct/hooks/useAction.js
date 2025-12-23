import { getOptionPickProduct } from '@containers/LeadManagmentSystem/Dashboard/_repositories/repositories';
import { useEffect, useState } from 'react';

const useAction = (props) => {
  const [open, _setOpen] = useState(false);

  const setOpen = (val) => () => _setOpen(val);

  const [selectedProduct, setSeletedProduct] = useState(null);

  useEffect(() => {
    setSeletedProduct(props.value);
  }, [props.value]);

  const onSubmit = () => {
    props.onSubmit(selectedProduct);
    _setOpen(false);
  };

  const [search, setSearch] = useState('');

  const [optionProduct, setOptionProduct] = useState({
    loading: true,
    option: [],
  });

  const fetchOptionProduct = async () => {
    setOptionProduct({ loading: true, option: [] });

    const payload = {
      search,
    };

    try {
      const result = await getOptionPickProduct(payload);
      setOptionProduct({ option: result.data, loading: false });
    } catch (error) {
      setOptionProduct({ option: [], loading: false });
    }
  };

  useEffect(() => {
    if (open) {
      fetchOptionProduct();
    }
  }, [open, search]);

  return {
    optionProduct,
    open,
    setOpen,
    onSubmit,
    selectedProduct,
    setSeletedProduct,
    search,
    setSearch,
  };
};

export default useAction;
