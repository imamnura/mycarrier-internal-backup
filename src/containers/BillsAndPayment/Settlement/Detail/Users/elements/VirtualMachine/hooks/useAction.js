import { useEffect, useState } from 'react';

const useAction = ({ data: _data }) => {
  const [page, setPage] = useState(0);
  const [search, _setSearch] = useState('');

  const size = 5;

  const setSearch = (val) => {
    setPage(0);
    _setSearch(val);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      _data.filter(({ id }) => {
        if (search) {
          return id.toString().includes(search);
        } else {
          return true;
        }
      }),
    );
  }, [search]);

  useEffect(() => {
    setSearch('');
    setPage(0);
  }, [_data]);

  const onPaginationChange = (_, r) => setPage(r - 1);

  return {
    data,
    onPaginationChange,
    page,
    search,
    setSearch,
    size,
  };
};

export default useAction;
