import { useEffect, useState } from 'react';
import { getOptionsCustomer } from '../../_repositories/repositories';

const emptyState = {
  customer: null,
  category: {
    value: '',
    label: 'All Category',
  },
  period: {
    value: 'monthly',
    label: 'Monthly',
  },
  dateRange: [],
};

const PopupTotalSurvey = ({
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
  const [category, setCategory] = useState(emptyState.category);
  const [period, setPeriod] = useState(emptyState.period);
  const [dateRange, setDateRange] = useState(emptyState.dateRange);

  const onReset = () => {
    setCustomer(emptyState.customer);
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
    setCategory(filters.category);
    setPeriod(filters.period);
    setDateRange(filters.dateRange);
  }, [filters]);

  const onCancel = () => {
    onClose();
    setCustomer(filters.customer);
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

  useEffect(() => {
    fetchOptionCustomer();
  }, [journey]);

  return {
    customer: {
      options: optCustomer,
      value: customer,
      onChange: setCustomer,
      isLoading: loadCustomer,
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

export default PopupTotalSurvey;
