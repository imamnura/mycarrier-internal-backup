import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { dateFormat } from '@utils/parser';
import { slugValidate } from '@utils/text';

const useActions = ({ tab, useForm: { _control, _setValue, _watch } }) => {
  const getStartDate = _watch('startDate');
  const getEndDate = _watch('endDate');
  const getRundownid = _watch('rundownid');
  const getStartTimeRundown = _watch('startTimeRundown');
  const getEndTimeRundown = _watch('endTimeRundown');

  const watchTitleId = useWatch({ control: _control, name: 'titleid' });
  const watchTitleEn = useWatch({ control: _control, name: 'titleen' });
  const watchSlugId = useWatch({ control: _control, name: 'slugid' });
  const watchSlugEn = useWatch({ control: _control, name: 'slugen' });

  //validation slug
  useEffect(() => {
    if (tab === 'id') {
      watchTitleId && _setValue('slugid', slugValidate(watchTitleId));
    } else {
      watchTitleEn && _setValue('slugen', slugValidate(watchTitleEn));
    }
  }, [watchTitleId, watchTitleEn]);

  useEffect(() => {
    if (tab === 'id' && watchSlugId !== slugValidate(watchTitleId)) {
      watchSlugId && _setValue('slugid', slugValidate(watchSlugId));
    }

    if (tab === 'en' && watchSlugEn !== slugValidate(watchTitleEn)) {
      watchSlugEn && _setValue('slugen', slugValidate(watchSlugEn));
    }
  }, [watchSlugId, watchSlugEn]);
  //end validation slug

  useEffect(() => {
    if (tab === 'id') {
      watchTitleId
        ? _setValue('titleid', watchTitleId)
        : _setValue('titleid', '');
      _setValue('slugid', watchSlugId);
    } else {
      watchTitleEn
        ? _setValue('titleen', watchTitleEn)
        : _setValue('titleen', '');
      _setValue('slugen', watchSlugEn);
    }
  }, [tab]);

  // set startTime and endTime
  useEffect(() => {
    if (
      getRundownid &&
      getRundownid.length > 0 &&
      getRundownid[0].items.length > 0
    ) {
      const getStartTimeRundown = getRundownid.slice(0, 1)[0].items[0]
        .startTime;
      _setValue(
        'startTimeRundown',
        dateFormat({ date: getStartTimeRundown, type: 'time' }),
      );

      const lengthRundown = getRundownid.slice(0, 1)[0]?.items.length;
      const getEndTimeRundown = getRundownid.slice(0, 1)[0].items[
        lengthRundown - 1
      ].endTime;
      _setValue('endTimeRundown', getEndTimeRundown);
    } else {
      _setValue('startTimeRundown', '');
      _setValue('endTimeRundown', '');
    }
  }, [getRundownid]);
  // end set startTime and endTime

  const handleChangeDate = (v) => {
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
      _setValue('endTimeRundown', '');
    }
  };

  return {
    getStartDate,
    getEndDate,
    handleChangeDate,
    getStartTimeRundown,
    getEndTimeRundown,
  };
};

export default useActions;
