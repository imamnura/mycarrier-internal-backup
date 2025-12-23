import { getListAM } from '../../../_repositories/repositories';
import { useEffect, useMemo, useState, useRef } from 'react';
import usePopupAlert from '@utils/hooks/usePopupAlert';

const useAction = ({ onChange, isPopup, value = [] }) => {
  const [_option, setOption] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollToTop = useRef(0);

  const fetchOption = async () => {
    setLoading(true);
    try {
      const result = await getListAM();
      // setOption(result.data);
      const optionNonSelected = result.data.filter((x) => {
        return !selected.some((y) => {
          return x.userCode === y.userCode;
        });
      });
      setOption([...selected, ...optionNonSelected]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOption();
  }, []);

  const [search, setSearch] = useState('');

  const option = useMemo(
    () =>
      _option.filter(({ name, nik }) => {
        const searchByName = name?.toLowerCase().indexOf(search) > -1;
        const searchByNik = nik?.toLowerCase().indexOf(search) > -1;
        return searchByName || searchByNik;
      }),
    [search, _option],
  );

  const [selected, _setSelected] = useState(value);

  const { setFailedAlert } = usePopupAlert();

  const setSelected = (value) => () => {
    if (selected.includes(value)) {
      _setSelected((s) => s.filter((selected) => selected !== value));
    } else if (selected.length >= 4) {
      setFailedAlert({ message: "Assign Sales Team can't be more than 4" });
    } else {
      // _setSelected((s) => [...s, value]);
      const _data = [...selected];
      _data.push(value);
      _setSelected(_data);
      const optionNonSelected = _option.filter((x) => {
        return !_data.some((y) => {
          return x.userCode === y.userCode;
        });
      });
      setOption([..._data, ...optionNonSelected]);
      setSearch('');
    }
    // } else {
    //   setFailedAlert({ message: 'Assign Sales Team can\'t be more than 4' });
    // }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selected);
      scrollToTop.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
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
