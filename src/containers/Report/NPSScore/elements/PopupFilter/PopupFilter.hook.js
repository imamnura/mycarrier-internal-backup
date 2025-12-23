import { useEffect, useState } from 'react';
import {
  getOptionsCustomer,
  getOptionsProduct,
} from '../../_repositories/repositories';

const emptyState = {
  customer: null,
  category: {
    value: '',
    label: 'All Category',
  },
  product: null,
  period: {
    value: 'monthly',
    label: 'Monthly',
  },
  dateRange: [],
};

const usePopupFilter = ({
  show,
  onClose,
  filters,
  onChangeFilter,
  journey,
}) => {
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
  }, [show]);

  const [customer, setCustomer] = useState(emptyState.customer);
  const [product, setProduct] = useState(emptyState.product);
  const [category, setCategory] = useState(emptyState.category);
  const [period, setPeriod] = useState(emptyState.period);
  const [dateRange, setDateRange] = useState(emptyState.dateRange);

  const onReset = () => {
    setCustomer(emptyState.customer);
    setProduct(emptyState.product);
    setCategory(emptyState.category);
    setPeriod(emptyState.period);
    setDateRange(emptyState.dateRange);
    onChangeFilter(emptyState);
  };

  const onClear = async () => {
    onReset();
    onClose();
  };

  useEffect(() => {
    setCustomer(filters.customer);
    setProduct(filters.product);
    setCategory(filters.category);
    setPeriod(filters.period);
    setDateRange(filters.dateRange);
  }, [filters]);

  const onCancel = () => {
    onClose();
    setCustomer(filters.customer);
    setProduct(filters.product);
    setCategory(filters.category);
    setPeriod(filters.period);
    setDateRange(filters.dateRange);
  };

  const onApply = () => {
    onChangeFilter({
      period,
      customer,
      category,
      dateRange,
      product,
    });
    onClose();
  };

  const [optCustomer, setOptCustomer] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);

  const fetchOptionCustomer = async () => {
    if (['alljourney', 'explore'].includes(journey)) {
      return;
    }

    setLoadCustomer(true);

    try {
      const result = await getOptionsCustomer(journey);
      setOptCustomer(
        result.data.map(({ custAccntName, custAccntNum }) => ({
          label: custAccntName,
          value: custAccntNum,
        })),
      );
    } catch (error) {
      setOptCustomer([]);
    } finally {
      setLoadCustomer(false);
    }
  };

  const [optProduct, setOptProduct] = useState([]);
  const [loadProduct, setLoadProduct] = useState(true);

  const fetchOptionProduct = async () => {
    if (!['activate', 'getsupport'].includes(journey)) {
      return;
    }

    setLoadProduct(true);

    try {
      const result = await getOptionsProduct(journey);
      setOptProduct(
        result.data.map(({ productName }) => ({
          label: productName,
          value: productName,
        })),
      );
    } catch (error) {
      setOptProduct([]);
    } finally {
      setLoadProduct(false);
    }
  };

  useEffect(() => {
    fetchOptionCustomer();
    fetchOptionProduct();
  }, [journey]);

  return {
    customer: {
      options: optCustomer,
      value: customer,
      onChange: setCustomer,
      isLoading: loadCustomer,
    },
    product: {
      options: optProduct,
      value: product,
      onChange: setProduct,
      isLoading: loadProduct,
    },
    category: {
      value: category,
      onChange: setCategory,
    },
    period: {
      value: period,
      onChange: setPeriod,
    },
    dateRange: {
      value: dateRange,
      onChange: setDateRange,
    },
    onReset,
    onCancel,
    onApply,
    onClear,
  };
};

export default usePopupFilter;
