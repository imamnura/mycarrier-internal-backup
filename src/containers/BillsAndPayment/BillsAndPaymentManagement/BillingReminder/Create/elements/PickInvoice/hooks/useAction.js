import { route } from '@configs/index';
import { cleanObject } from '@utils/common';
import useQueryParams from '@utils/hooks/useQueryParams';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { filterMonthOptions, filterYearOptions } from '../../../utils';
import { size } from '@fragments/List/List';
import {
  getListInvoice,
  postDraftBillingReminder,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import moment from 'moment';

const useAction = (props) => {
  const { setTab, data, updateData, onDiscard, loading } = props;
  const router = useRouter();
  const {
    query: { bpNumber, count },
  } = router;

  const { enqueueSnackbar } = useSnackbar();
  const { setQueryParams, queryParams } = useQueryParams();
  const { setDocumentViewer } = useDocumentViewer();

  const reminderId = queryParams.id;

  const [selectedRow, setSelectedRow] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(null);

  const [search, setSearch] = useState('');

  const [filterMonth, _setFilterMonth] = useState({
    label: 'All Month',
    value: '',
  });
  const [filterYear, _setFilterYear] = useState({
    label: 'All Year',
    value: '',
  });

  const setFilterMonth = (value) => {
    if (!filterYear.value) {
      const yearNow = moment().year().toString();
      _setFilterYear({ value: yearNow, label: yearNow });
    }

    if (!value.value) {
      _setFilterYear({ label: 'All Year', value: '' });
    }

    _setFilterMonth(value);
  };

  const setFilterYear = (value) => {
    if (!filterMonth.value) {
      const now = moment();
      const monthValue = now.format('MM');
      const monthLabel = now.format('MMMM');
      setFilterMonth({ value: monthValue, label: monthLabel });
    }

    if (!value.value) {
      _setFilterMonth({ label: 'All Month', value: '' });
    }

    _setFilterYear(value);
  };

  const filter = [
    {
      type: 'dropdown',
      options: filterYearOptions(),
      value: filterYear,
      onChange: setFilterYear,
    },
    {
      type: 'dropdown',
      options: filterMonthOptions,
      value: filterMonth,
      onChange: setFilterMonth,
    },
  ];

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [loadingTable, setLoadingTable] = useState(true);

  const fetchList = async (resetData) => {
    const _params = {
      bpNumber,
      page: resetData ? 1 : page,
      period: `${filterYear.value}${filterMonth.value}`,
      search,
      size,
      sort: 'newest',
      status: 'partially_and_unpaid',
    };
    const params = cleanObject(_params);

    if (!loadingTable || resetData) {
      setLoadingTable(true);

      try {
        const result = await getListInvoice({ params, withCancel: true });
        const { data, meta } = result;
        const newData = data || [];
        const normalize = {
          data: newData,
          meta: meta,
        };
        setList(normalize);
        setLoadingTable(false);
      } catch (error) {
        setLoadingTable(false);
        setList({
          data: [],
          meta: {},
        });
      }
    }
  };

  useEffect(() => {
    if (bpNumber) {
      setPage(1);
      fetchList(true);
    }
  }, [search, filterMonth, filterYear, bpNumber, data]);

  useEffect(() => {
    // if (data?.invoices?.length > 0) {
    //   setSelectedRow(data?.invoices);
    // }
    if (data?.invoices?.length > 0) {
      data.invoices.map((d) => {
        selectedRow.push(d?.invoiceNumber);
      });
    }
  }, [data, bpNumber, count, reminderId]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onPreviewDocument = (data) => (e) => {
    e.stopPropagation();
    setDocumentViewer(data);
  };

  const useSelectedRow = [selectedRow, setSelectedRow];

  // type: 'next' | 'draft' | 'previous
  const fetchDraft = async (values, type, destinationStep) => {
    setSubmitLoading(type);
    const _payload = {
      step: '1',
      stage: count,
      bpNumber,
      data: {
        invoices: values,
      },
    };

    const payload = cleanObject(_payload);

    try {
      const result = await postDraftBillingReminder(reminderId, payload);
      if (!reminderId) {
        setQueryParams({ id: result.data.reminderId });
      }
      updateData(result.data);
      setTab(destinationStep);
      setSubmitLoading(false);
      enqueueSnackbar('Document saved as draft.');
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setSubmitLoading(false);
    }
  };

  const submitHandler = ({ destinationStep, type }) => {
    if (type === 'cancel') {
      return () => router.push(route.billsAndPayment('detail', bpNumber));
    } else if (type === 'discard') {
      return () => {
        setSubmitLoading(false);
        onDiscard();
      };
    } else if (selectedRow?.length > 0 && data?.invoices == selectedRow) {
      return () => setTab(destinationStep);
    }
    return () => fetchDraft(selectedRow, type, destinationStep);
  };

  const onSubmit = (type) => {
    const destinationStep = {
      next: 2,
      draft: 1,
    }[type];

    return submitHandler({ type, destinationStep });
  };

  const onStepperClick = (_destinationStep) => {
    const destinationStep = _destinationStep + 1;
    const type = 'next';
    submitHandler({ type, destinationStep })();
  };

  return {
    data,
    bpNumber,
    count,
    reminderId,
    loading,
    onStepperClick,
    onSubmit,
    submitLoading,
    list,
    loadingTable,
    useSelectedRow,
    search,
    setSearch,
    onPreviewDocument,
    filter,
    onPaginationChange,
    page,
    setFilterYear,
    setFilterMonth,
    setSelectedRow,
  };
};

export default useAction;
