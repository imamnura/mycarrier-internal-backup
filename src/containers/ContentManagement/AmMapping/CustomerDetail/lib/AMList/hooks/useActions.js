import { useEffect, useState } from 'react';
import {
  getListAmBasedOnCustomer,
  getFilterOptions,
} from '../../../../_repositories/repositories';
import { cleanObject } from '@utils/common';
import { size } from '@fragments/List/List';
import { useRouter } from 'next/router';

const useActions = () => {
  const { isReady, query } = useRouter();
  const { id } = query;

  const [list, setList] = useState({ data: [], meta: {} });
  const [loadingTable, setLoadingTable] = useState(false);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [filterPosition, setFilterPosition] = useState({
    label: 'All Position',
    value: '',
  });
  const [filterSegment, setFilterSegment] = useState({
    label: 'All Segment',
    value: '',
  });
  const [filterPositionOptions, setFilterPositionOptions] = useState([]);
  const [filterSegmentOptions, setFilterSegmentOptions] = useState([]);
  const [loadingFilterSegment, setLoadingFilterSegment] = useState(true);
  const [loadingFilterPosition, setLoadingFilterPosition] = useState(true);

  const fetchList = async (newPage) => {
    const _params = {
      position: filterPosition?.value,
      nipnas: id,
      page: newPage ? newPage : page,
      segment: filterSegment?.value,
      search,
      size,
    };
    const params = cleanObject(_params);

    if (!loadingTable) {
      setLoadingTable(true);
      try {
        const { data, meta } = await getListAmBasedOnCustomer({ params });
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

  const fetchFilterSegmentOptions = async () => {
    setLoadingFilterSegment(true);

    try {
      const { data } = await getFilterOptions('segment');
      setFilterSegmentOptions([{ value: '', label: 'All Segment' }, ...data]);
      setLoadingFilterSegment(false);
    } catch (error) {
      setFilterSegmentOptions([{ value: '', label: 'All Segment' }]);
      setLoadingFilterSegment(false);
    }
  };

  const fetchFilterPositionOptions = async () => {
    setLoadingFilterPosition(true);

    try {
      const { data } = await getFilterOptions('jobtitle');
      setFilterPositionOptions([{ value: '', label: 'All Position' }, ...data]);
      setLoadingFilterPosition(false);
    } catch (error) {
      setFilterPositionOptions([{ value: '', label: 'All Position' }]);
      setLoadingFilterPosition(false);
    }
  };

  useEffect(() => {
    if (isReady) {
      setPage(1);
      fetchList(1);
    }
  }, [search, filterSegment, filterPosition]);

  useEffect(() => {
    fetchList();
  }, [page]);

  useEffect(() => {
    fetchFilterSegmentOptions();
    fetchFilterPositionOptions();
  }, []);

  const loading = {
    segment: loadingFilterSegment,
    position: loadingFilterPosition,
  };

  const onPaginationChange = (props, currentPage) => setPage(currentPage);

  return {
    list,
    loading,
    search,
    setSearch,
    setFilterPosition,
    setFilterSegment,
    filterSegment,
    filterSegmentOptions,
    filterPositionOptions,
    filterPosition,
    loadingTable,
    onPaginationChange,
    page,
  };
};

export default useActions;
