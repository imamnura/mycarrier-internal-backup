import { useEffect, useState } from 'react';
import { optionsFilterVisitPurpose } from '../../../constant';
import { cleanObject } from '@utils/common';
import moment from 'moment';

const useActions = (props) => {
  const {
    open,
    setContent,
    // confirmation: _confirmation,
    tab,
    loading,
    options,
    fetchDownload,
  } = props;

  const [filterPeriod, setFilterPeriod] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState({
    label: 'All Customer',
    value: '',
  });
  const [filterDataCenter, setFilterDataCenter] = useState({
    label: 'All Data Center',
    value: '',
  });
  const [filterVisitPurpose, setFilterVisitPurpose] = useState({
    label: 'All Visiting Purpose',
    value: '',
  });

  const onClose = () => {
    setContent({ open: false });
  };

  const filter = () => {
    let filters = [];

    if (tab === 'timeApproveVisit') {
      filters.push({
        onChange: setFilterPeriod,
        value: filterPeriod,
        type: 'dateRange',
        label: 'Period',
        required: true,
        fullWidth: true,
        inputFormat: 'DD MMMM YYYY',
        name: 'period',
        variant: 'primary',
      });

      filters.push({
        isLoading: loading?.dataCenter,
        isSearchable: true,
        onChange: setFilterDataCenter,
        options: options?.dataCenter,
        type: 'dropdown',
        value: filterDataCenter,
        label: 'Data Center',
        required: true,
        staticWidth: '100%',
        menuWidth: '100%',
        minWidth: '100%',
      });

      filters.push({
        onChange: setFilterVisitPurpose,
        options: optionsFilterVisitPurpose,
        type: 'dropdown',
        value: filterVisitPurpose,
        label: 'Visiting Purpose',
        required: true,
        staticWidth: '100%',
        menuWidth: '100%',
        minWidth: '100%',
      });

      filters.push({
        isLoading: loading?.customer,
        isSearchable: true,
        onChange: setFilterCustomer,
        options: options?.customer,
        type: 'dropdown',
        value: filterCustomer,
        label: 'Customer',
        required: true,
        staticWidth: '100%',
        menuWidth: '100%',
        minWidth: '100%',
      });
    }

    return filters;
  };

  const onClickDownload = () => {
    const _params = {
      visitType: filterVisitPurpose.value,
      dataCenter: filterDataCenter.value ? filterDataCenter.label : '',
      startDate: moment(filterPeriod[0]).format('DD/MM/YYYY'),
      endDate: moment(filterPeriod[1]).format('DD/MM/YYYY'),
      custAccntName: filterCustomer.value ? filterCustomer.label : '',
    };

    const params = cleanObject(_params);

    fetchDownload(params);
    onClose();
  };

  useEffect(() => {
    return () => {
      setFilterPeriod([]);
      setFilterCustomer({ label: 'All Customer', value: '' });
      setFilterDataCenter({ label: 'All Data Center', value: '' });
      setFilterVisitPurpose({ label: 'All Visiting Purpose', value: '' });
    };
  }, [open]);

  return {
    onClose,
    filter: filter().reverse(),
    onClickDownload,
    loading,
  };
};

export default useActions;
