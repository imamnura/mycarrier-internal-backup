import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { route } from '@configs';
import { cleanObject, isHaveAccess } from '@utils/common';
import { size } from '@fragments/List/List';
import Status from '@components/Status';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import {
  filterClaimCategoryOptions,
  filterClaimStatusOptions,
  maskStatusTitle,
  parsingStatus,
  schemaClaim,
} from '../../../utils';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import { LOCATOR } from '../../../test-locator';
import { getListClaim } from '../../../../_repositories/repositories';

const testLocator = LOCATOR.sections.list.claim;

const useClaim = (feature) => {
  const { setFailedAlert } = usePopupAlert();
  const {
    searchClaim: search,
    setSearchClaim: setSearch,
    pageClaim: page,
    setPageClaim: setPage,
    filterClaimStatus,
    setFilterClaimStatus,
    filterClaimCategory,
    setFilterClaimCategory,
  } = useContext(BillsAndPaymentDetailContext);

  const router = useRouter();
  const { id: bpNumber, type } = router.query;

  const schema = schemaClaim;

  const onClickRow = ({ claimId }) => {
    if (isHaveAccess(feature, 'read_detail_claim')) {
      router.push(route.billsAndPayment('claim', bpNumber, claimId));
    } else {
      setFailedAlert({
        message: "You Don't Have Permission to Read Detail Claim",
      });
    }
  };

  const filter = [
    {
      onChange: setFilterClaimStatus,
      options: filterClaimStatusOptions,
      type: 'dropdown',
      value: filterClaimStatus,
      id: testLocator.filter.claimStatus,
    },
    {
      onChange: setFilterClaimCategory,
      options: filterClaimCategoryOptions,
      type: 'dropdown',
      value: filterClaimCategory,
      id: testLocator.filter.claimCategory,
    },
  ];

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (resetData) => {
    const location = router.asPath;

    const _params = {
      bpNumber,
      page: resetData ? 1 : page,
      size,
      category: filterClaimCategory.value,
      subStatus: filterClaimStatus.value,
      search,
    };
    const params = cleanObject(_params);

    const validatePath =
      location === route.billsAndPayment('detail', bpNumber) + `?type=${type}`;

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const result = await getListClaim({ params, withCancel: true });
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
  }, [search, filterClaimStatus, filterClaimCategory, type]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const data = useMemo(
    () =>
      list?.data?.map((d) => ({
        ...d,
        claimCategory:
          d.claimCategory === 'document'
            ? 'Invoice document is not completed'
            : d.claimCategory === 'nominal'
              ? 'Invoice nominal is not correct'
              : d.claimCategory || '-',
        status: !isNaN(parseInt(d.status)) ? (
          <Status {...parsingStatus(d.status)} />
        ) : (
          d.status
        ),
        subStatus: maskStatusTitle(d.subStatus),
      })),
    [list.data],
  );

  return {
    filter,
    search: {
      onChange: setSearch,
      placeholder: 'Search Claim ID..',
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
      id: testLocator.table,
      numbering: false,
    },
  };
};

export default useClaim;
