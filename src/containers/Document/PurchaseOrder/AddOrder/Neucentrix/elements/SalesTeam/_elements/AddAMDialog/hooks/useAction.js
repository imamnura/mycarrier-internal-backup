import { getListAM } from '../../../../../../../_repositories/repositories';
import { useEffect, useState, useRef } from 'react';

const useAction = ({ onChange, isPopup, value = [] }) => {
  const [option, setOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const scrollToTop = useRef(0);

  const fetchOption = async () => {
    setLoading(true);
    try {
      let payload = {
        type: 'account manager',
      };

      if (search) {
        payload = {
          ...payload,
          search,
        };
      }

      const response = await getListAM(payload);
      const result = response.data;
      const optionNonSelected = result.filter((x) => {
        return !selected.some((y) => {
          return x.id === y.id;
        });
      });
      setOption([...selected, ...optionNonSelected]);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOption();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchOption();
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [search]);

  const [selected, _setSelected] = useState(value);

  const setSelected = (value) => () => {
    if (selected.includes(value)) {
      _setSelected((s) => s.filter((selected) => selected !== value));
    } else {
      // _setSelected((s) => [...s, value]);
      const _data = [...selected];
      _data.push(value);
      _setSelected(_data);
      // const optionNonSelected = option.filter((x) => {
      //   return !_data.some((y) => {
      //     return x.id === y.id;
      //   });
      // });
      // setOption([..._data, ...optionNonSelected]);
      // setSearch('');
    }
  };

  useEffect(() => {
    if (onChange && selected.length >= 1) {
      onChange(selected);
    }
  }, [selected]);

  return {
    loading,
    option,
    search,
    selected,
    isPopup,
    scrollToTop,
    setSearch,
    setSelected,
  };
};

export default useAction;
