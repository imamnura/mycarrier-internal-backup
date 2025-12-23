import React, { useContext, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { cleanObject } from '@utils/common';
import { textLimit } from '@utils/text';
import { isHaveAccess } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import useResponsive from '@utils/hooks/useResponsive';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import Typography from '@components/Typography';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import { getListInvoice } from '../../../../_repositories/repositories';
import {
  // filterMonthOptions,
  // filterYearOptions,
  schemaPayment,
  filterLastUpdatePaymentOptions,
} from '../../../utils';
import { LOCATOR } from '../../../test-locator';
import validation from '../validation';

const testLocator = LOCATOR.sections.list.payment;

const usePayment = (feature) => {
  const { setFailedAlert } = usePopupAlert();

  const {
    searchPayment: search,
    setSearchPayment: setSearch,
    pagePayment: page,
    setPagePayment: setPage,
    // filterMonthPayment: filterMonth,
    // setFilterMonthPayment: _setFilterMonth,
    // filterYearPayment: filterYear,
    // setFilterYearPayment: _setFilterYear,
    filterLastUpdate,
    setFilterLastUpdate,
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
  });

  const router = useRouter();
  const { id: bpNumber, type } = router.query;

  const { setDocumentViewer } = useDocumentViewer();

  const [sortBy, setSortBy] = useState('desc');
  const [orderBy, setOrderBy] = useState('invoiceDate');
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

  const mdClient = useResponsive('md');
  const schema = schemaPayment({ mdClient });

  const onClickRow = ({ invoiceNumber }) => {
    if (isHaveAccess(feature, 'read_detail_payment')) {
      router.push(route.billsAndPayment('invoice', bpNumber, invoiceNumber));
    } else {
      setFailedAlert({
        message: "You Don't Have Permission to Read Detail Payment",
      });
    }
  };

  const checkboxFilterPeriod = [
    {
      label: 'Invoice Date',
      nameInput: 'invoiceDate',
    },
    {
      label: 'Clearing Date',
      nameInput: 'clearingDate',
    },
  ];

  const onChangePeriod = (value) => setFilterPeriod(value);

  const filter = [
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
      type: 'dropdown',
      options: filterLastUpdatePaymentOptions,
      value: filterLastUpdate,
      onChange: setFilterLastUpdate,
      id: testLocator.filter.lastUpdate,
      minWidth: 150,
    },
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
      // sortField: orderBy,
      sort: sortBy === 'desc' ? 'newest' : 'oldest',
      status: 'fully_paid',
      invoiceDate: filterPeriod?.invoiceDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : null,
      clearingDate: filterPeriod?.clearingDate
        ? moment(filterPeriod?.period).format('YYYYMM')
        : '',
      sortField: filterLastUpdate.value,
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
    // setPage(1);
    fetchList(true);
  }, [
    search,
    // filterMonth,
    // filterYear,
    orderBy,
    sortBy,
    type,
    filterLastUpdate?.value,
    filterPeriod,
  ]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onPreviewDocument = (data) => (e) => {
    e?.stopPropagation();
    setDocumentViewer(data);
  };

  // const fetchGenerateDocument = (invoiceNumber, index) => async () => {
  //   setLoadingAlert();
  //   closeConfirmation();

  //   try {
  //     const result = await generateInvoice(invoiceNumber);
  //     let tempList = list.data;
  //     tempList[index] = {
  //       ...tempList[index],
  //       invoiceFile: result.data
  //     };

  //     setList({
  //       ...list,
  //       data: tempList
  //     });

  //     setSuccessAlert({
  //       message: 'Invoice successfully generated',
  //       onClose: onPreviewDocument({
  //         title: result.data.fileName,
  //         url: result.data.fileUrl
  //       })
  //     });
  //   } catch (error) {
  //     setFailedAlert({ message: error.message });
  //   }
  // };

  // const onClickGenerate = ({ invoiceNumber }, index) => (e) => {
  //   e.stopPropagation();
  //   setConfirmation({
  //     message: 'Will you generate this document?',
  //     action: [
  //       { children: 'cancel', variant: 'ghost', onClick: closeConfirmation },
  //       { children: 'generate', onClick:  fetchGenerateDocument(invoiceNumber, index) }
  //     ]
  //   });
  // };

  // const validateDocument = (data) => () => {
  //   if (data?.invoiceIbssAttachment?.invoice?.fileName) {
  //     return (
  //       <Typography
  //         color="blue-main"
  //         onClick={onPreviewDocument({
  //           title: data?.invoiceIbssAttachment?.invoice?.fileName,
  //           url: data?.invoiceIbssAttachment?.invoice?.fileUrl,
  //         })}
  //         style={{ cursor: 'pointer' }}
  //         variant="subtitle2"
  //       >
  //         {textLimit((data?.invoiceIbssAttachment?.invoice?.fileName), 24)}
  //       </Typography>
  //     );
  //   }
  //   if (data?.invoiceInternalFile?.fileName) {
  //     return (
  //       <Typography
  //         color="blue-main"
  //         onClick={onPreviewDocument({
  //           title: data?.invoiceInternalFile.fileName,
  //           url: data?.invoiceInternalFile.fileUrl,
  //         })}
  //         style={{ cursor: 'pointer' }}
  //         variant="subtitle2"
  //       >
  //         {textLimit(data?.invoiceInternalFile.fileName, 24)}
  //       </Typography>
  //     );
  //   }
  //   return (<>-</>);
  // };

  const data = useMemo(
    () =>
      list.data.map((d) => ({
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
      id: testLocator.table,
    },
    onPreviewDocument,
  };
};

export default usePayment;
