import React, { useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Box } from '@material-ui/core';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject, onDownloadFile } from '@utils/common';
import { textLimit } from '@utils/text';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupConfirmation from '@utils/hooks/usePopupConfirmation';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import Button from '@components/Button';
import Reload from '@assets/icon-v2/Reload';
import Status from '@components/Status';
import StepperStatus from '@components/StepperStatus/StepperStatus';
import Typography from '@components/Typography';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import {
  getListInvoice,
  refreshInvoice,
} from '../../../../_repositories/repositories';
import {
  // filterMonthOptions,
  filterStatusPaidOptions,
  filterStatusTimeOptions,
  // filterYearOptions,
  RefreshNote,
  schemaInvoice,
  filterLastUpdateInvoiceOptions,
} from '../../../utils';
import { LOCATOR } from '../../../test-locator';
import validation from '../validation';
import { useForm } from 'react-hook-form';
import useResponsive from '@utils/hooks/useResponsive';
import { isHaveAccess } from '@utils/common';

const generateInvoiceStatus = (status) => {
  if (!status) {
    return undefined;
  }

  let color = 'warning';

  if (['REQUESTED'].includes(status)) {
    color = 'primary';
  } else if (['INVOICE COMPLETED'].includes(status)) {
    color = 'success';
  } else if (status.includes('FAILED')) {
    color = 'danger';
  }

  return {
    label: status,
    color,
  };
};

const testLocator = LOCATOR.sections.list.invoice;

const useInvoice = (feature) => {
  const {
    filterPeriod,
    setFilterPeriod,
    searchInvoice: search,
    setSearchInvoice: setSearch,
    pageInvoice: page,
    setPageInvoice: setPage,
    // filterMonthInvoice: filterMonth,
    // setFilterMonthInvoice: _setFilterMonth,
    // filterYearInvoice: filterYear,
    // setFilterYearInvoice: _setFilterYear,
    filterStatusTime,
    setFilterStatusTime,
    filterStatusPaid,
    setFilterStatusPaid,
    filterLastUpdateInvoice,
    setFilterLastUpdateInvoice,
  } = useContext(BillsAndPaymentDetailContext);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid },
  } = useForm({
    resolver: validation,
    mode: 'onChange',
    defaultValues: filterPeriod,
  });

  const router = useRouter();
  const { id: bpNumber, type } = router.query;

  const { setDocumentViewer } = useDocumentViewer();
  const { setConfirmation, closeConfirmation } = usePopupConfirmation();
  const { setLoadingAlert, setFailedAlert, setSuccessAlert } = usePopupAlert();

  const [sortBy, setSortBy] = useState('desc');
  const [orderBy, setOrderBy] = useState('invoiceDate');

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

  const mdClient = useResponsive('md');
  const schema = schemaInvoice({ mdClient });

  const onClickRow = ({ invoiceNumber }) => {
    if (isHaveAccess(feature, 'read_detail_invoice')) {
      router.push(route.billsAndPayment('invoice', bpNumber, invoiceNumber));
    } else {
      setFailedAlert({
        message: "You Don't Have Permission to Read Detail Invoice",
      });
    }
  };

  const checkboxFilterPeriod = [
    {
      label: 'Invoice Date',
      nameInput: 'invoiceDate',
    },
    {
      label: 'Due Date',
      nameInput: 'dueDate',
    },
  ];

  const onChangePeriod = (value) => setFilterPeriod(value);

  const filter = [
    {
      type: 'dropdown',
      options: filterLastUpdateInvoiceOptions,
      value: filterLastUpdateInvoice,
      onChange: setFilterLastUpdateInvoice,
      id: testLocator.filter.lastUpdate,
      minWidth: 150,
    },
    {
      type: 'dropdown',
      options: filterStatusPaidOptions,
      value: filterStatusPaid,
      onChange: setFilterStatusPaid,
      id: testLocator.filter.statusByPaid,
      minWidth: 190,
    },
    {
      type: 'dropdown',
      options: filterStatusTimeOptions,
      value: filterStatusTime,
      onChange: setFilterStatusTime,
      id: testLocator.filter.statusByTime,
      minWidth: 190,
    },
    // {
    //   type: 'dropdown',
    //   options: filterYearOptions(),
    //   value: filterYear,
    //   onChange: setFilterYear,
    //   id: testLocator.filter.year,
    // },
    // {
    //   type: 'dropdown',
    //   options: filterMonthOptions,
    //   value: filterMonth,
    //   onChange: setFilterMonth,
    //   id: testLocator.filter.month,
    // },
    {
      onChange: onChangePeriod,
      type: 'date',
      value: filterPeriod?.period,
      label: 'All Period',
      format: 'MMMM YYYY',
      minDate: '2024/01/01',
      openTo: 'month',
      views: ['year', 'month'],
      id: testLocator.filter.period,
      withFilterPeriod: true,
      optionsCheckboxFilter: checkboxFilterPeriod,
      getValueFilterPeriod: (v) => {
        setFilterPeriod(v);
      },
      style: { minWidth: '10px' },
      resetFormFilterPeriod: () => {
        setFilterPeriod(null);
        reset();
        reset({ checkbox: false });
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
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (resetData) => {
    const location = router.asPath;

    const _params = {
      bpNumber,
      page: resetData ? 1 : page,
      // period: `${filterYear.value}${filterMonth.value}`,
      search,
      size,
      sort: sortBy === 'desc' ? 'newest' : 'oldest',
      status: filterStatusPaid.value,
      time: filterStatusTime.value,
      invoiceDate: filterPeriod?.invoiceDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
      dueDate: filterPeriod?.dueDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
      sortField: filterLastUpdateInvoice?.value,
    };
    const params = cleanObject(_params);

    const validatePath =
      location === route.billsAndPayment('detail', bpNumber) + `?type=${type}`;

    if (!loadingTable && validatePath) {
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
    }
  };

  useEffect(() => {
    // setPage(1);
    fetchList(true);
  }, [
    search,
    // filterMonth,
    // filterYear,
    filterStatusPaid,
    filterStatusTime,
    orderBy,
    sortBy,
    type,
    filterPeriod,
    filterLastUpdateInvoice?.value,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onPreviewDocument = (data) => (e) => {
    e?.stopPropagation();
    setDocumentViewer({
      ...data,
      action: [
        {
          children: 'download',
          onClick: onDownloadFile,
        },
      ],
    });
  };

  const redirectToPayment =
    ({ invoiceNumber }) =>
    async () => {
      await closeConfirmation();
      router.push(route.billsAndPayment('invoice', bpNumber, invoiceNumber));
    };

  const onClickRefresh = (d) => async (e) => {
    const { invoiceNumber, invoiceNumberFormat, paidStatus } = d;
    e.stopPropagation();

    setLoadingAlert();

    try {
      const result = await refreshInvoice(invoiceNumber, { withCancel: true });
      const { status, statusName } = result.data || {};

      if (!!status && !!statusName) {
        fetchList(true);
        setSuccessAlert({});
        setConfirmation({
          action: [
            {
              children: 'cancel',
              onClick: closeConfirmation,
              variant: 'ghost',
            },
            {
              children: 'see payment detail',
              onClick: redirectToPayment({ invoiceNumber }),
            },
          ],
          description: `Your payment status changes to ${statusName.toLowerCase()}`,
          fitToContent: true,
          message: 'Success Refreshing Data',
          note: (
            <RefreshNote
              invoiceNumber={invoiceNumberFormat}
              newStatus={statusName}
              oldStatus={paidStatus}
            />
          ),
          variant: 'success',
        });
      } else {
        fetchList(true);
        setSuccessAlert({});
        setConfirmation({
          variant: 'success',
          message: 'Success Refreshing Data',
          description: 'There is no change in your payment status.',
          note: (
            <RefreshNote
              invoiceNumber={invoiceNumberFormat}
              oldStatus={statusName}
            />
          ),
          fitToContent: true,
          action: [{ children: 'okay', onClick: closeConfirmation }],
        });
      }
    } catch (error) {
      setFailedAlert({
        message: error.message,
      });
    }
  };

  const data = useMemo(
    () =>
      list.data.map((d, i) => ({
        ...d,
        document: (d?.invoiceIbssAttachment?.invoice?.fileUrl ||
          d?.invoiceInternalFile?.fileName) && (
          <Typography
            color="blue-main"
            onClick={onPreviewDocument({
              title:
                d?.invoiceIbssAttachment?.invoice?.fileName ||
                d?.invoiceInternalFile?.fileName,
              url:
                d?.invoiceIbssAttachment?.invoice?.fileUrl ||
                d?.invoiceInternalFile?.fileUrl,
            })}
            style={{ cursor: 'pointer' }}
            variant="subtitle2"
          >
            {textLimit(
              d?.invoiceIbssAttachment?.invoice?.fileName ||
                d?.invoiceInternalFile?.fileName ||
                '-',
              24,
            )}
          </Typography>
        ),
        ibssStatus: (
          <Status
            children={generateInvoiceStatus(d.ibssStatus).label}
            variant={generateInvoiceStatus(d.ibssStatus).color}
          />
        ),
        refresh: (
          <Button
            onClick={onClickRefresh(d)}
            variant="ghost"
            id={testLocator.table.refreshInvoice + '-' + i}
          >
            <Box component={Reload} width={14} />
          </Button>
        ),
        status: (
          <Status variant={d.status === 'Overdue' ? 'danger' : 'warning'}>
            {d.status}
          </Status>
        ),
        rlStatus: (
          <StepperStatus
            data={d.rlStatus}
            step={[
              {
                variant: 'success',
                label: '1',
              },
              {
                variant: 'warning',
                label: '2',
              },
              {
                variant: 'danger',
                label: '3',
              },
            ]}
          />
        ),
      })),
    [list],
  );

  return {
    filter,
    search: {
      onChange: setSearch,
      placeholder: 'Search Invoice..',
      value: search,
      id: testLocator.search,
    },
    table: {
      data: data,
      loading: false,
      loadingRoot: loadingTable,
      onPaginationChange,
      page,
      meta: list.meta,
      onClickRow,
      schema,
      numbering: false,
      useOrderBy: [orderBy, setOrderBy],
      useOrderDirection: [sortBy, setSortBy],
      id: testLocator.table.id,
    },
    onPreviewDocument,
    onClickRefresh,
    redirectToPayment,
  };
};

export default useInvoice;
