import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isHaveAccess } from '@utils/common';
import { getList } from '@containers/Admin/Privilege/_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsFilterUserType } from '../constant';
import { cleanObject } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;
  const dispatch = useDispatch();
  const { setFailedAlert } = usePopupAlert();

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [search, setSearch] = useState('');

  const [filterUserType, _setFilterUserType] = useState({
    label: 'All User Type',
    value: '',
  });

  const setFilterUserType = (val) => {
    setPage(1);
    _setFilterUserType(val);
  };

  const fetchList = async (newPage) => {
    const payload = {
      page: newPage ? newPage : page,
      journeyName: search,
      type: filterUserType.value,
      limit: size,
      sort,
      orderBy,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.privilege('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getList({ params });
        const normalize = { data, meta };
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
    setPage(1);
    fetchList(1);
  }, [search, filterUserType, sort]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  useEffect(() => {
    dispatch({ type: 'DETAIL_PRIVILEGES', data: {} });
    dispatch({ type: 'EDIT_PRIVILEGES', data: {} });
  }, []);

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail_privilege_management')) {
      router.push(route.privilege('detail', data.journeyId));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail privilege",
      });
    }
  };

  return {
    filter: {
      userType: {
        onChange: setFilterUserType,
        options: optionsFilterUserType,
        value: filterUserType,
      },
    },
    list,
    onClickRowTable,
    search,
    setSearch,
    sort,
    setSort,
    orderBy,
    setOrderBy,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
