import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';

// import Typography from '@components/Typography';
import { size } from '@fragments/List/List';

import { cleanObject } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
// import { textLimit } from '@utils/text';

import {
  getListInvoice,
  postSendInvoice,
  putGenerateBillingReminder,
} from '../../../../_repositories/repositories';
// import { filterMonthOptions, filterYearOptions } from '../../../utils';
import {
  confirmationMessage,
  schema,
  successMessage,
  defaultValueFilterPeriodTL,
} from '../utils';
import { LOCATOR } from '@containers/BillsAndPayment/BillsAndPaymentManagement/Detail/test-locator';
import validation from '../../ListOfDocument/validation';
import { useForm } from 'react-hook-form';

const testLocator = LOCATOR.sections.list.actionButton;

const useAction = (props) => {
  const { type, onClose } = props;
  const router = useRouter();
  const { id: bpNumber } = router.query;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: validation,
    mode: 'onChange',
  });

  const { setRefreshDunning } = useContext(BillsAndPaymentDetailContext);

  const { setDocumentViewer, closeDocumentViewer } = useDocumentViewer();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setLoadingAlert, setFailedAlert, setSuccessAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  // const [filterMonth, _setFilterMonth] = useState({
  //   label: 'All Month',
  //   value: '',
  // });
  // const [filterYear, _setFilterYear] = useState({
  //   label: 'All Year',
  //   value: '',
  // });

  const [filterPeriod, setFilterPeriod] = useState(null);

  // const setFilterMonth = (value) => {
  //   if (!filterYear.value) {
  //     const yearNow = moment().year().toString();
  //     _setFilterYear({ value: yearNow, label: yearNow });
  //   }

  //   if (!value.value) {
  //     _setFilterYear({ label: 'All Year', value: '' });
  //   }

  //   _setFilterMonth(value);
  // };

  // const setFilterYear = (value) => {
  //   if (!filterMonth.value) {
  //     const now = moment();
  //     const monthValue = now.format('MM');
  //     const monthLabel = now.format('MMMM');
  //     setFilterMonth({ value: monthValue, label: monthLabel });
  //   }

  //   if (!value.value) {
  //     _setFilterMonth({ label: 'All Month', value: '' });
  //   }

  //   _setFilterYear(value);
  // };

  const _schema = schema[type];

  const onChangePeriod = (value) => setFilterPeriod(value);

  const checkboxFilterPeriod = [
    {
      label: 'Invoice Date',
      nameInput: 'invoiceDate',
    },
    {
      label: type === 'thanksLetter' ? 'Clearing Date' : 'Due Date',
      nameInput: type === 'thanksLetter' ? 'clearingDate' : 'dueDate',
    },
  ];

  const filter = [
    // {
    //   type: 'dropdown',
    //   options: filterYearOptions(),
    //   value: filterYear,
    //   onChange: setFilterYear,
    // },
    // {
    //   type: 'dropdown',
    //   options: filterMonthOptions,
    //   value: filterMonth,
    //   onChange: setFilterMonth,
    // },
    {
      onChange: onChangePeriod,
      type: 'date',
      value: filterPeriod?.period,
      label: 'All Period',
      format: 'MMMM YYYY',
      openTo: 'month',
      views: ['year', 'month'],
      id:
        type === 'billingReminder'
          ? testLocator.sendBillingReminder.popup.filter.period
          : testLocator.sendThanksLetter.popup.filter.period,
      withFilterPeriod: true,
      optionsCheckboxFilter: checkboxFilterPeriod,
      getValueFilterPeriod: (v) => {
        setFilterPeriod(v);
      },
      style: { minWidth: '10px' },
      resetFormFilterPeriod: () => {
        setFilterPeriod(null);
        reset({
          checkbox: false,
          period: null,
          invoiceDate: false, // for both
          clearingDate: false, // thanksLetter
          dueDate: false, // bills
        });
      },
      hooksFormFilterPeriod: {
        control,
        handleSubmit,
        watch,
        isValid,
        reset,
      },
    },
  ];

  const [list, setList] = useState({ data: [], meta: {} });
  const [page, setPage] = useState(1);
  const [loadingTable, setLoadingTable] = useState(true);
  const [sortBy, setSortBy] = useState('desc');
  const [orderBy, setOrderBy] = useState('invoiceDate');

  const fetchList = async (resetData) => {
    const _params = {
      bpNumber,
      page: resetData ? 1 : page,
      // period: `${filterYear.value}${filterMonth.value}`,
      search,
      size,
      sortField: orderBy,
      sort: sortBy === 'desc' ? 'newest' : 'oldest',
      status:
        type === 'thanksLetter' ? 'partially_and_paid' : 'partially_and_unpaid',
      invoiceDate: filterPeriod?.invoiceDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
      clearingDate: filterPeriod?.clearingDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
      dueDate: filterPeriod?.dueDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
    };
    const params = cleanObject(_params);

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
    } catch (error) {
      setList({
        data: [],
        meta: {},
      });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    if (type) {
      setPage(1);
      fetchList(true);
    }
  }, [search, type, filterPeriod, sortBy, orderBy]);

  const onPreviewDocument = (data) => {
    // e?.stopPropagation();
    setDocumentViewer(data);
  };

  const data = useMemo(
    () =>
      list.data.map((d) => ({
        ...d,
        // document: d.invoiceInternalFile ? (
        //   <Typography
        //     color="blue-main"
        //     onClick={onPreviewDocument({
        //       title: d.invoiceInternalFile.fileName,
        //       url: d.invoiceInternalFile.fileUrl,
        //     })}
        //     style={{ cursor: 'pointer' }}
        //     variant="subtitle2"
        //   >
        //     {textLimit(d?.invoiceInternalFile.fileName, 24)}
        //   </Typography>
        // ) : (
        //   <>-</>
        // ),
      })),
    [list],
  );

  // const onBottomPage = () => {
  //   if (list.hasMore) {
  //     fetchList(false);
  //   }
  // };

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const [selectedRow, setSelectedRow] = useState([]);

  const fetchSubmitInvoice = async () => {
    setLoadingAlert();
    closeConfirmation();
    const payload = {
      bpNumber,
      type: {
        billingReminder: 'Billing Reminder',
        thanksLetter: 'Thanks Letter',
      }[type],
      invoices:
        (selectedRow.length &&
          selectedRow?.map((item) => ({
            invoiceNumber: item.invoiceNumber,
            invoiceNumberFormat: item.invoiceNumberFormat,
            invoiceBill: item.invoiceBill,
          }))) ||
        [],
      childType:
        type == 'billingReminder' ? 'Billing Reminder 1' : 'Thanks Letter 1',
    };

    try {
      await postSendInvoice(payload);
      // updateSendLog(result.data);
      setRefreshDunning(true);
      setSuccessAlert({
        message: successMessage[type],
        onClose: () => {
          onClose();
          closeDocumentViewer();
        },
      });
    } catch (error) {
      setFailedAlert({ message: error.message });
    }
  };

  const onSubmit = () => {
    setConfirmation({
      message: confirmationMessage[type],
      action: [
        { children: 'no', variant: 'ghost', onClick: closeConfirmation },
        { children: 'yes', onClick: fetchSubmitInvoice },
      ],
    });
  };

  const onClickPreview = async () => {
    setLoadingAlert({ message: 'Generating Preview Document...' });

    const payload = cleanObject({
      bpNumber,
      childType:
        type == 'billingReminder' ? 'Billing Reminder 1' : 'Thanks Letter 1',
      invoices:
        (selectedRow.length &&
          selectedRow?.map((item) => ({
            invoiceNumber: item.invoiceNumber,
            invoiceNumberFormat: item.invoiceNumberFormat,
            invoiceBill: item.invoiceBill,
          }))) ||
        [],
      submit: false,
      type: type == 'billingReminder' ? 'Billing Reminder' : 'Thanks Letter',
      saldoKewajiban:
        type == 'billingReminder'
          ? selectedRow.length &&
            selectedRow?.reduce((acc, current) => {
              return acc + current.invoiceBill;
            }, 0)
          : null,
    });

    try {
      const response = await putGenerateBillingReminder(payload);

      setSuccessAlert({});
      onPreviewDocument({
        title: response.data?.mediaName,
        url: response.data?.mediaUrl,
        action: [
          {
            label: 'Cancel',
            onClick: () => {
              closeDocumentViewer();
            },
            variant: 'ghost',
          },
          {
            label: 'Send',
            onClick: () => {
              onSubmit();
            },
          },
        ],
      });
    } catch (err) {
      setFailedAlert({
        message: err.details?.message || err.message,
      });
    }
  };

  useEffect(() => {
    setSelectedRow([]);

    if (type === 'thanksLetter') {
      setFilterPeriod(defaultValueFilterPeriodTL);
      reset(defaultValueFilterPeriodTL);
    } else {
      setFilterPeriod(null);
      reset({ checkbox: false });
    }
  }, [type]);

  // const onScrollList = ({ target }) => {
  //   const { scrollTop, scrollHeight, clientHeight } = target;
  //   const scroll = scrollHeight - clientHeight - scrollTop <= 40;

  //   if (scroll) {
  //     onBottomPage();
  //   }
  // };

  const onPrevious = () => {
    props.onClose();
    props.onPrevious();
  };

  return {
    onPrevious,
    fetchSubmitInvoice,
    filter,
    // onBottomPage,
    onPreviewDocument,
    // onScrollList,
    onSubmit,
    search: {
      onChange: setSearch,
      placeholder: 'Search Invoice..',
      value: search,
    },
    selectedRow,
    table: {
      data: data,
      loading: false,
      loadingRoot: loadingTable,
      meta: list.meta,
      numbering: false,
      schema: _schema,
      onPaginationChange: onPaginationChange,
      page: page,
      selectedRowKey: 'invoiceNumber',
      selectWithRawData: true,
      useSelectedRow: [selectedRow, setSelectedRow],
      useOrderDirection: [sortBy, setSortBy],
      useOrderBy: [orderBy, setOrderBy],
      maxHeight: 330,
    },
    onClickPreview,
  };
};

export default useAction;
