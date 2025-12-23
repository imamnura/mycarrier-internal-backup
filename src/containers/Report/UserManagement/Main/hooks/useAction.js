import moment from 'moment';
import { useState } from 'react';
import { getDateDifference } from '../utils';

const useAction = () => {
  const [filterDateRange, _setFilterDateRange] = useState([
    moment().subtract(13, 'days').toJSON(),
    moment().toJSON(),
  ]);
  const [filterPeriod, _setFilterPeriod] = useState({
    label: 'Daily',
    value: 'daily',
  });

  const setFilterDateRange = (_value) => {
    let value = _value;

    if (!_value[0] || !_value[1]) {
      value = [moment().subtract(13, 'days').toJSON(), moment().toJSON()];
    }

    _setFilterDateRange(value);

    const weekDiff = getDateDifference(value[0], value[1], 'weeks');
    const monthDiff = getDateDifference(value[0], value[1], 'months');

    if (monthDiff > 14) {
      _setFilterPeriod({ label: 'Yearly', value: 'yearly' });
    } else if (weekDiff > 7) {
      _setFilterPeriod({ label: 'Monthly', value: 'monthly' });
    } else if (weekDiff > 2) {
      _setFilterPeriod({ label: 'Weekly', value: 'weekly' });
    } else {
      _setFilterPeriod({ label: 'Daily', value: 'daily' });
    }
  };

  const setFilterPeriod = (period) => {
    _setFilterPeriod(period);

    const { value } = period;
    const weekDiff = getDateDifference(
      filterDateRange[0],
      filterDateRange[1],
      'weeks',
    );
    const monthDiff = getDateDifference(
      filterDateRange[0],
      filterDateRange[1],
      'months',
    );

    if (value === 'daily') {
      if (weekDiff > 2) {
        _setFilterDateRange([
          filterDateRange[0],
          moment(filterDateRange[0]).add(13, 'days').toJSON(),
        ]);
      }
    } else if (value === 'weekly') {
      if (weekDiff > 7) {
        _setFilterDateRange([
          filterDateRange[0],
          moment(filterDateRange[0])
            .add(7 * 7 - 1, 'days')
            .toJSON(),
        ]);
      }
    } else if (value === 'monthly') {
      if (monthDiff > 14) {
        _setFilterDateRange([
          filterDateRange[0],
          moment(filterDateRange[0]).add(14, 'months').toJSON(),
        ]);
      }
    }
  };

  const [refreshCount, setRefreshCount] = useState(0);

  const onRefresh = () => {
    setRefreshCount(refreshCount + 1);
  };
  return {
    filterDateRange,
    filterPeriod,
    onRefresh,
    refreshCount,
    setFilterDateRange,
    setFilterPeriod,
  };
};

export default useAction;
