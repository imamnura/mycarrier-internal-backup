import {
  normalizeGroupedBar,
  normalizeLine,
  normalizePie,
} from '@containers/Report/UserManagement/Main/utils';
import { useMemo, useState } from 'react';

const normalizeData = (_data, period) => {
  if (!_data) {
    return {};
  }

  let data = {};

  _data?.type?.forEach(({ title, name, categorical }) => {
    data[title || name] = {
      line: normalizeLine(categorical, period),
      pie: normalizePie(categorical),
      bar: normalizeGroupedBar(categorical),
    };
  });

  return data;
};

const useAction = (props) => {
  const {
    useData,
    dateRange,
    title,
    period,
    options,
    refreshCount,
    clickToAction,
  } = props;
  const [tab, setTab] = useState(options[0].value);

  const { data: _data, loading } = useData({ period, dateRange, refreshCount });
  const data = useMemo(() => normalizeData(_data, period), [_data]);

  return {
    clickToAction,
    data,
    loading,
    optionsTab: options,
    setTab,
    tab,
    title,
  };
};

export default useAction;
