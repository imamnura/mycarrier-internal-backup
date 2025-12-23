import { useEffect, useState } from 'react';
import { dateFormat } from '@utils/parser';

const useActions = ({ useForm: { _setValue, _watch } }) => {
  const [starDateRange, setStarDateRange] = useState([null, null]);

  const getStartDate = _watch('startDate');
  const getEndDate = _watch('endDate');
  const watchRundownid = _watch('rundownid');
  const watchRundownen = _watch('rundownen');

  useEffect(() => {
    if (!getStartDate && !getEndDate) {
      //reset dateRange
      _setValue('rundownid', []);
      _setValue('rundownen', []);
    }

    setStarDateRange([getStartDate, getEndDate]);
  }, [getStartDate, getEndDate]);

  const onChangeRundownId = (v) => _setValue('rundownid', v);

  const onChangeRundownEn = (v) => _setValue('rundownen', v);

  const handleRange = (v) => {
    if (v[0] && v[1]) {
      _setValue(
        'startDate',
        dateFormat({ date: v[0], type: 'timezone-jakarta' }),
      );
      _setValue(
        'endDate',
        dateFormat({ date: v[1], type: 'timezone-jakarta' }),
      );
    } else {
      _setValue('startDate', null);
      _setValue('endDate', null);
      _setValue('startTimeRundown', '');
    }
  };

  return {
    starDateRange,
    onChangeRundownId,
    onChangeRundownEn,
    watchRundownid,
    watchRundownen,
    handleRange,
  };
};

export default useActions;
