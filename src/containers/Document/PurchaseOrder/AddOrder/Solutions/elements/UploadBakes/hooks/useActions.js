import { useEffect } from 'react';
import { getOptionBakes } from '../../../../../_repositories/repositories';
import { useWatch } from 'react-hook-form';
import { dateDiff, addRealDate } from '@utils/parser';

const useActions = (props) => {
  const {
    control,
    clearErrors,
    data,
    setOptionsBakesNumber,
    setLoadingOptionBakes,
    resetField,
  } = props;

  const {
    bakesNumberAuto,
    radioBakes,
    bakesStartDate,
    bakesEndDate,
    bakesDuration,
  } = useWatch({
    control,
  });

  const fetchOptionBakes = async (custAccntNum, search) => {
    try {
      setLoadingOptionBakes(true);
      const { data } = await getOptionBakes({ custAccntNum, search });
      setOptionsBakesNumber(data);
    } catch (e) {
      setOptionsBakesNumber([]);
    } finally {
      setLoadingOptionBakes(false);
    }
  };

  useEffect(() => {
    if (data?.custAccntNum) {
      fetchOptionBakes(data?.custAccntNum, '');
    }
  }, [data]);

  useEffect(() => {
    if (radioBakes !== '1') clearErrors('bakesNumberAuto');
    else clearErrors(['media', 'bakesNumber']);
  }, [radioBakes]);

  useEffect(() => {
    clearErrors('bakesEndDate');
  }, [bakesDuration]);

  useEffect(() => {
    if (bakesStartDate && bakesEndDate) {
      if (bakesStartDate > bakesEndDate) {
        resetField('bakesEndDate', {
          defaultValue: addRealDate(
            'months',
            bakesStartDate,
            parseInt(bakesDuration),
          ),
        });
      } else {
        resetField('bakesDuration', {
          defaultValue: Math.ceil(
            dateDiff('months', bakesStartDate, bakesEndDate, true),
          ).toString(),
        });
      }
    }
  }, [bakesStartDate, bakesEndDate]);

  return {
    radioBakes,
    bakesNumberAuto,
    bakesStartDate,
  };
};

export default useActions;
