import React, { useEffect, useMemo, useState, useContext } from 'react';
import moment from 'moment';
import { route } from '@configs';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import {
  getListDunning,
  getOptionsTypeDunning,
  getOptionsStatusDunning,
} from '@containers/BillsAndPayment/BillsAndPaymentManagement/_repositories/repositories';
import Typography from '@components/Typography';
import { size } from '@fragments/List/List';
import { schemaDunning } from '@containers/BillsAndPayment/BillsAndPaymentManagement/Detail/utils';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import { cleanObject, onDownloadFile, isHaveAccess } from '@utils/common';
import useDocumentViewer from '@utils/hooks/useDocumentViewer';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { LOCATOR } from '../../../test-locator';

const testLocator = LOCATOR.sections.list.dunning;

const useStyles = makeStyles({
  hoverableText: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    marginLeft: 2,
  },
});

const useDunning = (feature) => {
  const {
    searchDunning: search,
    setSearchDunning: setSearch,
    pageDunning: page,
    setPageDunning: setPage,
    filterDunningStatus,
    setFilterDunningStatus,
    setFilterDunningType,
    filterDunningType,
    periodeDunning: period,
    setPeriodeDunning: setPeriod,
    setSortDunning: setSort,
    sortDunning: sort,
    setOrderByDunning: setOrderBy,
    orderByDunning: orderBy,
    setRefreshDunning: setRefresh,
    refreshDunning: refresh,
  } = useContext(BillsAndPaymentDetailContext);

  const { setFailedAlert } = usePopupAlert();

  const router = useRouter();
  const { id: bpNumber, type } = router.query;

  const [list, setList] = useState({ data: [], meta: {} });
  const [showAllInvoices, setShowAllInvoices] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [optionsTypeDunning, setOptionsTypeDunning] = useState([]);
  const [optionsStatusDunning, setOptionsStatusDunning] = useState([]);
  const [loadingTypeDunning, setLoadingTypeDunning] = useState(false);
  const [loadingStatusDunning, setLoadingStatusDunning] = useState(false);
  const { setDocumentViewer } = useDocumentViewer();
  const classes = useStyles();

  const schema = schemaDunning;

  const onClickRow = ({ id }) => {
    if (isHaveAccess(feature, 'read_detail_dunning')) {
      router.push(route.billsAndPayment('dunning-detail', bpNumber, id));
    } else {
      setFailedAlert({
        message: `You don't have permission to view detail dunning.`,
      });
    }
  };

  const filter = [
    {
      onChange: setFilterDunningStatus,
      options: optionsStatusDunning,
      type: 'dropdown',
      value: filterDunningStatus,
      isLoading: loadingStatusDunning,
      id: testLocator.filter.status,
    },
    {
      onChange: setFilterDunningType,
      options: optionsTypeDunning,
      type: 'dropdown',
      value: filterDunningType,
      isLoading: loadingTypeDunning,
      id: testLocator.filter.type,
    },
    {
      onChange: setPeriod,
      type: 'date',
      value: period,
      label: 'Select Period',
      format: 'MMMM YYYY',
      minDate: '2024/01/01',
      openTo: 'month',
      views: ['year', 'month'],
      id: testLocator.filter.period,
    },
  ];

  const fetchList = async (newPage) => {
    const location = router.asPath;

    const _params = {
      bpNumber,
      sort: sort === 'desc' ? 'newest' : 'oldest',
      page: newPage ? newPage : page,
      size,
      status: filterDunningStatus.value,
      childType: filterDunningType.value,
      search,
      period: period ? moment(period).format('YYYYMM') : null,
    };
    const params = cleanObject(_params);

    const validatePath =
      location === route.billsAndPayment('detail', bpNumber) + `?type=${type}`;

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getListDunning({
          params,
          withCancel: true,
        });
        const normalize = { data, meta };
        setList(normalize);
        setRefresh(false);
      } catch (error) {
        setList({
          data: [],
          meta: {},
        });
      } finally {
        setLoadingTable(false);
        setRefresh(false);
      }
    }
  };

  const fetchOptionsTypeDunning = async () => {
    setLoadingTypeDunning(true);
    try {
      const { data } = await getOptionsTypeDunning();
      setOptionsTypeDunning([{ label: 'All Type', value: '' }, ...data]);
    } catch {
      setOptionsTypeDunning([]);
    } finally {
      setLoadingTypeDunning(false);
    }
  };

  const fetchOptionsStatusDunning = async () => {
    setLoadingStatusDunning(true);
    try {
      const { data } = await getOptionsStatusDunning();
      setOptionsStatusDunning([{ label: 'All Status', value: '' }, ...data]);
    } catch {
      setOptionsStatusDunning([]);
    } finally {
      setLoadingStatusDunning(false);
    }
  };

  useEffect(() => {
    fetchList(1);
  }, [search, filterDunningStatus, sort, period, filterDunningType, type]);

  useEffect(() => {
    if (refresh) fetchList(1);
  }, [refresh]);

  useEffect(() => {
    fetchList();
  }, [page]);

  useEffect(() => {
    fetchOptionsTypeDunning();
    fetchOptionsStatusDunning();
  }, []);

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

  const handleShowAllInvoices = (index) => {
    setShowAllInvoices((prevShowAllInvoices) => ({
      ...prevShowAllInvoices,
      [index]: !prevShowAllInvoices[index],
    }));
  };

  const openInvoice = (invoiceNumber) => (e) => {
    e?.stopPropagation();
    window.open(
      route.billsAndPayment('invoice', bpNumber, invoiceNumber),
      '_blank',
      'noreferrer',
    );
  };

  const renderInvoices = (data, idx) => {
    const renderInvoice = (item, i) => (
      <Typography
        id={testLocator.table.invoice + '-' + idx + '-' + i}
        key={i}
        color="blue-main"
        onClick={openInvoice(item?.invoiceNumber)}
        className={classes.hoverableText}
        variant="subtitle2"
      >
        {item?.invoiceNumberFormat}
      </Typography>
    );

    const renderMoreInvoices = () => (
      <Typography
        id={testLocator.table.moreInvoice + '-' + idx}
        onClick={(e) => {
          e?.stopPropagation();
          handleShowAllInvoices(idx);
        }}
        className={classes.hoverableText}
        variant="caption"
      >
        {`${data?.length - 3} more`}
      </Typography>
    );

    return (
      <>
        {data.slice(0, 3).map((item, i) => (
          <React.Fragment key={i}>
            {renderInvoice(item, i)}
            {i !== data?.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
        {showAllInvoices[idx] && (
          <>
            {data.slice(3).map((item, i) => (
              <React.Fragment key={i}>
                {renderInvoice(item, i)}
                {i !== data.slice(3)?.length - 1 && <span>, </span>}
              </React.Fragment>
            ))}
          </>
        )}
        {!showAllInvoices[idx] && data.length > 3 && renderMoreInvoices()}
      </>
    );
  };

  const data = useMemo(
    () =>
      list?.data?.map((d, idx) => ({
        ...d,
        invoices:
          (d?.invoices?.length >= 1 && renderInvoices(d?.invoices, idx)) || '-',
        reviewer: d?.reviewer?.name || d?.reviewer?.status,
        documentAttachment: (d?.documentAttachment?.mediaUrl ||
          d?.documentAttachment?.mediaName) && (
          <Typography
            id={testLocator.table.document + '-' + idx}
            color="blue-main"
            onClick={onPreviewDocument({
              title: d?.documentAttachment?.mediaName,
              url: d?.documentAttachment?.mediaUrl,
            })}
            className={classes.hoverableText}
            variant="subtitle2"
          >
            {d?.documentAttachment?.mediaName}
          </Typography>
        ),
      })),
    [list.data, showAllInvoices],
  );

  return {
    filter,
    search: {
      onChange: setSearch,
      placeholder: 'Search ID, Invoice, Approver..',
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
      useOrderDirection: [sort, setSort],
      useOrderBy: [orderBy, setOrderBy],
      customItem: {
        flexWrap: 'wrap',
      },
      id: testLocator.table.id,
      numbering: false,
    },
  };
};

export default useDunning;
