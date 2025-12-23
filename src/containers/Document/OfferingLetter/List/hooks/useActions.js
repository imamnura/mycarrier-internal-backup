import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { getListOfferingLetter } from '../../_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const manager = isHaveAccess(feature, 'read_offering_letter_approve');

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [filterStatus, setFilterStatus] = useState({
    label: 'All Status',
    value: '',
  });

  const [loadingTable, setLoadingTable] = useState(false);

  const fetchList = async (newPage) => {
    const location = router.pathname;

    const _params = {
      size,
      search,
      page: newPage ? newPage : page,
      status: filterStatus.value,
      type: manager ? 'gm' : '',
    };

    const params = cleanObject(_params);

    const validatePath = location === route.offeringLetter('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true)

      try {
        const { data, meta } = await getListOfferingLetter({
          params,
          withCancel: true,
        });
        const normalize = {
          data,
          meta,
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
    if (isHaveAccess(feature, 'read_list_all_offering_letter')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view list.",
      });
      setLoadingTable(false);
    }
  }, [search, filterStatus]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickRowTable = async (data) => {
    if (data.status === 'draft') {
      if (isHaveAccess(feature, 'update_offering_letter_draft')) {
        router.push(route.offeringLetter('create', data.offeringLetterId));
      } else {
        setFailedAlert({
          message: "You don't have permission to edit draft.",
        });
      }
    } else {
      if (isHaveAccess(feature, 'read_detail_offering_letter')) {
        router.push(route.offeringLetter('detail', data.offeringLetterId));
      } else {
        setFailedAlert({
          message: "You don't have permission to view detail.",
        });
      }
    }
  };

  const onClickNewOfferingLetter = () => router.push('/offering-letter/create');

  return {
    feature,
    filterStatus,
    list,
    page,
    loading: loadingTable,
    search,
    manager,
    onPaginationChange,
    onClickNewOfferingLetter,
    onClickRowTable,
    setFilterStatus,
    setSearch,
  };
};

export default useActions;
