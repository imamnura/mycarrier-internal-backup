import { useEffect, useState } from 'react';
import { cleanObject, isHaveAccess } from '@utils/common';
import { route } from '@configs';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';
import {
  getList,
  getOptionsOperator,
  getOptionsPoi,
  getOptionsTrunkGroup,
} from '@containers/ServiceDelivery/MonitoringOperator/_repositories/repositories';
import { dateFormat } from '@utils/parser';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useActions = (props) => {
  const router = useRouter();
  const { feature } = props;

  const [list, setList] = useState({ data: [], meta: {} });

  const { setFailedAlert } = usePopupAlert();

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [filterOperator, _setFilterOperator] = useState({
    label: 'All Operator',
    value: '',
  });
  const [filterPoi, _setFilterPoi] = useState({ label: 'All POI', value: '' });
  const [filterTrunkGroup, _setFilterTrunkGroup] = useState({
    label: 'All Trunk Group',
    value: '',
  });
  const [filterDateRange, _setFilterDateRange] = useState([null, null]);

  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingOptionsOperator, setLoadingOptionsOperator] = useState(false);
  const [loadingOptionsPoi, setLoadingOptionsPoi] = useState(false);
  const [loadingOptionsTrunkGroup, setLoadingOptionsTrunkGroup] =
    useState(false);

  const [optionsOperator, setOptionsOperator] = useState([]);
  const [optionsPoi, setOptionsPoi] = useState([]);
  const [optionsTrunkGroup, setOptionsTrunkGroup] = useState([]);

  const setFilterOperator = (val) => {
    setPage(1);
    _setFilterOperator(val);
  };

  const setFilterPoi = (val) => {
    setPage(1);
    _setFilterPoi(val);
  };

  const setFilterTrunkGroup = (val) => {
    setPage(1);
    _setFilterTrunkGroup(val);
  };

  const setFilterDate = (val) => {
    setPage(1);
    _setFilterDateRange(val);
  };

  const fetchList = async (newPage) => {
    const location = router.pathname;

    let payload = {
      search,
      size,
      page: newPage ? newPage : page,
      operator: filterOperator.value,
      poi: filterPoi.value,
      tgw: filterTrunkGroup.value,
      startDate:
        filterDateRange[0] &&
        dateFormat({ date: filterDateRange[0], type: 'params' }),
      endDate:
        filterDateRange[1] &&
        dateFormat({ date: filterDateRange[1], type: 'params' }),
    };

    const params = cleanObject(payload);

    const validatePath = location === route.monitoringOperator('list');

    if (!loadingTable && validatePath) {
      setLoadingTable(true);

      try {
        const { data, meta } = await getList({ params, withCancel: true });
        const newData = data || [];
        const normalize = {
          data: [...newData],
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
    if (isHaveAccess(feature, 'read_list_monitoring_operator')) {
      setPage(1);
      fetchList(1);
    } else {
      setFailedAlert({
        message: "You don't have permission to view this page.",
      });
      setLoadingTable({
        root: false,
        row: false,
      });
      setList({ data: [] });
    }
  }, [search, filterOperator, filterDateRange, filterPoi, filterTrunkGroup]);

  useEffect(() => {
    fetchList();
  }, [page]);

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  const fetchOptionsOperator = async () => {
    setLoadingOptionsOperator(true);

    try {
      const { data } = await getOptionsOperator();
      setOptionsOperator([{ label: 'All Operator', value: '' }, ...data]);
    } catch (error) {
      setOptionsOperator([{ label: 'All Operator', value: '' }]);
    } finally {
      setLoadingOptionsOperator(false);
    }
  };

  const fetchOptionsPoi = async () => {
    setLoadingOptionsPoi(true);

    try {
      const { data } = await getOptionsPoi();
      setOptionsPoi([{ label: 'All POI', value: '' }, ...data]);
    } catch (error) {
      setOptionsPoi([{ label: 'All POI', value: '' }]);
    } finally {
      setLoadingOptionsPoi(false);
    }
  };

  const fetchOptionsTrunkGroup = async () => {
    setLoadingOptionsTrunkGroup(true);

    try {
      const { data } = await getOptionsTrunkGroup();
      setOptionsTrunkGroup([{ label: 'All Trunk Group', value: '' }, ...data]);
    } catch (error) {
      setOptionsTrunkGroup([{ label: 'All Trunk Group', value: '' }]);
    } finally {
      setLoadingOptionsTrunkGroup(false);
    }
  };

  useEffect(() => {
    fetchOptionsOperator();
    fetchOptionsPoi();
    fetchOptionsTrunkGroup();
  }, []);

  return {
    filter: {
      dateRange: {
        onChange: setFilterDate,
        value: filterDateRange,
      },
      operator: {
        onChange: setFilterOperator,
        options: optionsOperator,
        value: filterOperator,
      },
      poi: {
        onChange: setFilterPoi,
        options: optionsPoi,
        value: filterPoi,
      },
      trunkGroup: {
        onChange: setFilterTrunkGroup,
        options: optionsTrunkGroup,
        value: filterTrunkGroup,
      },
    },
    loading: {
      table: loadingTable,
      optionsOperator: loadingOptionsOperator,
      optionsPoi: loadingOptionsPoi,
      optionsTrunkGroup: loadingOptionsTrunkGroup,
    },
    list,
    page,
    onPaginationChange,
    search,
    setSearch,
  };
};

export default useActions;
