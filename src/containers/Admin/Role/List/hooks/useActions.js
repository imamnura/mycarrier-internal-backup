import { useEffect, useState } from 'react';
import { isHaveAccess, cleanObject } from '@utils/common';
import { getListRole } from '@containers/Admin/Role/_repositories/repositories';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { optionsFilterUserType } from '../constant';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { useRouter } from 'next/router';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

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
      roleName: search,
      type: filterUserType.value,
      limit: size,
      sort,
      orderBy,
    };

    const params = cleanObject(payload);

    const validatePath = router.pathname === route.role('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListRole({ params });
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
  }, [search, filterUserType, sort, orderBy]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const onClickAdd = () => {
    if (isHaveAccess(feature, 'create_role')) {
      router.push(route.role('create'));
    } else {
      setFailedAlert({
        message: "You don't have permission to add role",
      });
    }
  };

  const onClickRowTable = async (data) => {
    if (isHaveAccess(feature, 'read_detail')) {
      router.push(route.role('detail', data.roleId));
    } else {
      setFailedAlert({
        message: "You don't have permission to read detail role",
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
    onClickAdd,
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
