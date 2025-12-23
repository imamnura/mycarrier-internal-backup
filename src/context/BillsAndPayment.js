import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { route } from '@configs';

export const BillsAndPaymentDetailContext = createContext({
  // Global
  tab: '',
  setTab: () => {},
  bpNumber: '',
  setBpNumber: () => {},

  // Invoice
  searchInvoice: '',
  setSearchInvoice: () => {},
  filterPeriod: null,
  setFilterPeriod: () => {},
  pageInvoice: 1,
  setPageInvoice: () => {},
  filterStatusPaid: {
    label: '',
    value: '',
  },
  setFilterStatusPaid: () => {},
  filterStatusTime: {
    label: '',
    value: '',
  },
  setFilterStatusTime: () => {},
  filterYearInvoice: {
    label: '',
    value: '',
  },
  setFilterYearInvoice: () => {},
  filterMonthInvoice: {
    label: '',
    value: '',
  },
  setFilterMonthInvoice: () => {},
  setFilterLastUpdateInvoice: () => {},
  filterLastUpdateInvoice: {
    label: '',
    value: '',
  },

  // Payment
  searchPayment: '',
  setSearchPayment: () => {},
  pagePayment: 1,
  setPagePayment: () => {},
  filterYearPayment: {
    label: '',
    value: '',
  },
  setFilterYearPayment: () => {},
  filterMonthPayment: {
    label: '',
    value: '',
  },
  setFilterMonthPayment: () => {},
  setFilterLastUpdate: () => {},
  filterLastUpdate: {
    label: '',
    value: '',
  },

  // Claim
  searchClaim: '',
  setSearchClaim: () => {},
  pageClaim: 1,
  setPageClaim: () => {},
  filterClaimStatus: {
    label: '',
    value: '',
  },
  setFilterClaimStatus: () => {},
  filterClaimCategory: {
    label: '',
    value: '',
  },
  setFilterClaimCategory: () => {},

  //Reconciliation
  searchReconciliation: '',
  setSearchReconciliation: () => {},
  pageReconciliation: 1,
  setPageReconciliation: () => {},
  filterReconciliationStatus: {
    label: '',
    value: '',
  },
  setFilterReconciliationStatus: () => {},
  periodeReconciliation: '',
  setPeriodeReconciliation: () => {},
  setSortReconciliation: () => {},
  sortReconciliation: '',
  setOrderByReconciliation: () => {},
  orderByReconciliation: '',

  //Dunning
  searchDunning: '',
  setSearchDunning: () => {},
  pageDunning: 1,
  setPageDunning: () => {},
  filterDunningStatus: {
    label: '',
    value: '',
  },
  setFilterDunningStatus: () => {},
  filterDunningType: {
    label: '',
    value: '',
  },
  setFilterDunningType: () => {},
  periodeDunning: '',
  setPeriodeDunning: () => {},
  setSortDunning: () => {},
  sortDunning: '',
  setOrderByDunning: () => {},
  orderByDunning: '',
  setRefreshDunning: () => {},
  refreshDunning: '',
});

export const BillsAndPaymentDetailProvider = (props) => {
  const router = useRouter();
  const { id } = router.query;

  // Global
  const [tab, setTab] = useState('invoice');
  const [bpNumber, setBpNumber] = useState('');

  const _setTab = (tabName) => {
    router.push(`${route.billsAndPayment('detail', id)}?type=${tabName}`);
    setTab(tabName);
  };

  // Invoice
  const [filterPeriod, setFilterPeriod] = useState(null);
  const [searchInvoice, setSearchInvoice] = useState('');
  const [pageInvoice, setPageInvoice] = useState(1);
  const [filterStatusPaid, setFilterStatusPaid] = useState({
    label: 'All Status By Paid',
    value: 'partially_and_unpaid',
  });
  const [filterStatusTime, setFilterStatusTime] = useState({
    label: 'All Status By Time',
    value: '',
  });
  const [filterMonthInvoice, setFilterMonthInvoice] = useState({
    label: 'All Month',
    value: '',
  });
  const [filterYearInvoice, setFilterYearInvoice] = useState({
    label: 'All Year',
    value: '',
  });
  const [filterLastUpdateInvoice, setFilterLastUpdateInvoice] = useState({
    label: 'Last Update',
    value: '',
  });

  // Payment
  const [searchPayment, setSearchPayment] = useState('');
  const [pagePayment, setPagePayment] = useState(1);
  const [filterMonthPayment, setFilterMonthPayment] = useState({
    label: 'All Month',
    value: '',
  });
  const [filterYearPayment, setFilterYearPayment] = useState({
    label: 'All Year',
    value: '',
  });
  const [filterLastUpdate, setFilterLastUpdate] = useState({
    label: 'Last Update',
    value: '',
  });

  // Claim
  const [searchClaim, setSearchClaim] = useState('');
  const [pageClaim, setPageClaim] = useState(1);
  const [filterClaimCategory, setFilterClaimCategory] = useState({
    label: 'All Claim Category',
    value: '',
  });
  const [filterClaimStatus, setFilterClaimStatus] = useState({
    label: 'All Claim Status',
    value: '',
  });

  //Reconciliation
  const [searchReconciliation, setSearchReconciliation] = useState('');
  const [periodeReconciliation, setPeriodeReconciliation] = useState(null);
  const [pageReconciliation, setPageReconciliation] = useState(1);
  const [filterReconciliationStatus, setFilterReconciliationStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [sortReconciliation, setSortReconciliation] = useState('desc');
  const [orderByReconciliation, setOrderByReconciliation] =
    useState('reconciliationDate');

  //Dunning
  const [searchDunning, setSearchDunning] = useState('');
  const [periodeDunning, setPeriodeDunning] = useState(null);
  const [pageDunning, setPageDunning] = useState(1);
  const [filterDunningStatus, setFilterDunningStatus] = useState({
    label: 'All Status',
    value: '',
  });
  const [filterDunningType, setFilterDunningType] = useState({
    label: 'All Type',
    value: '',
  });
  const [sortDunning, setSortDunning] = useState('desc');
  const [orderByDunning, setOrderByDunning] = useState('createdAt');
  const [refreshDunning, setRefreshDunning] = useState(false);

  const resetAll = () => {
    // Global
    setTab('invoice');

    // Invoice
    setFilterPeriod(null);
    setSearchInvoice('');
    setPageInvoice(1);
    setFilterStatusPaid({
      label: 'All Status By Paid',
      value: 'partially_and_unpaid',
    });
    setFilterStatusTime({
      label: 'All Status By Time',
      value: '',
    });
    setFilterMonthInvoice({
      label: 'All Month',
      value: '',
    });
    setFilterYearInvoice({
      label: 'All Year',
      value: '',
    });
    setFilterLastUpdateInvoice({
      label: 'Last Update',
      value: '',
    });

    // Payment
    setSearchPayment('');
    setPagePayment(1);
    setFilterMonthPayment({
      label: 'All Month',
      value: '',
    });
    setFilterYearPayment;
    setFilterLastUpdate({
      label: 'Last Update',
      value: '',
    });

    // Claim
    setSearchClaim('');
    setPageClaim(1);
    setFilterClaimStatus({
      label: 'All Claim Status',
      value: '',
    });
    setFilterClaimCategory({
      label: 'All Claim Category',
      value: '',
    });

    //Reconciliation
    setSearchReconciliation('');
    setPageReconciliation(1);
    setFilterReconciliationStatus({
      label: 'All Status',
      value: '',
    });
    setPeriodeReconciliation(null);
    setSortReconciliation('desc');
    setOrderByReconciliation('reconciliationDate');

    //Dunning
    setSearchDunning('');
    setPageDunning(1);
    setFilterDunningStatus({
      label: 'All Status',
      value: '',
    });
    setFilterDunningType({
      label: 'All Type',
      value: '',
    });
    setPeriodeDunning(null);
    setSortDunning('desc');
    setOrderByDunning('createdAt');
    setRefreshDunning(false);
  };

  useEffect(() => {
    if (id) {
      if (id != bpNumber) {
        resetAll();
      }
      setBpNumber(id);
    }
  }, [id]);

  return (
    <BillsAndPaymentDetailContext.Provider
      value={{
        // Global
        tab,
        setTab: _setTab,

        // Invoice
        filterPeriod,
        setFilterPeriod,
        searchInvoice,
        setSearchInvoice,
        pageInvoice,
        setPageInvoice,
        filterStatusPaid,
        setFilterStatusPaid,
        filterStatusTime,
        setFilterStatusTime,
        filterMonthInvoice,
        setFilterMonthInvoice,
        filterYearInvoice,
        setFilterYearInvoice,
        filterLastUpdateInvoice,
        setFilterLastUpdateInvoice,

        // Payment
        searchPayment,
        setSearchPayment,
        pagePayment,
        setPagePayment,
        filterMonthPayment,
        setFilterMonthPayment,
        filterYearPayment,
        setFilterYearPayment,
        setFilterLastUpdate,
        filterLastUpdate,

        // Claim
        searchClaim,
        setSearchClaim,
        pageClaim,
        setPageClaim,
        filterClaimStatus,
        setFilterClaimStatus,
        filterClaimCategory,
        setFilterClaimCategory,

        //Reconciliation
        searchReconciliation,
        setSearchReconciliation,
        pageReconciliation,
        setPageReconciliation,
        filterReconciliationStatus,
        setFilterReconciliationStatus,
        periodeReconciliation,
        setPeriodeReconciliation,
        setSortReconciliation,
        sortReconciliation,
        setOrderByReconciliation,
        orderByReconciliation,

        //Dunning
        searchDunning,
        setSearchDunning,
        pageDunning,
        setPageDunning,
        filterDunningStatus,
        setFilterDunningStatus,
        filterDunningType,
        setFilterDunningType,
        periodeDunning,
        setPeriodeDunning,
        setSortDunning,
        sortDunning,
        setOrderByDunning,
        orderByDunning,
        setRefreshDunning,
        refreshDunning,
      }}
    >
      {props.children}
    </BillsAndPaymentDetailContext.Provider>
  );
};

BillsAndPaymentDetailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
