import { addRealDate, dateFormat } from '@utils/parser';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

const useActions = (props) => {
  const { control, clearErrors, resetField } = props;

  const { startPeriod, endPeriod, period } = useWatch({
    control,
  });

  useEffect(() => {
    clearErrors(['startPeriod', 'endPeriod']);
    resetField('startPeriod');
    resetField('endPeriod');
  }, [period]);

  useEffect(() => {
    if (startPeriod && endPeriod) {
      if (
        dateFormat({
          type: 'date',
          date: startPeriod,
        }) > dateFormat({ type: 'date', date: endPeriod })
      ) {
        resetField('endPeriod', {
          defaultValue: addRealDate('days', startPeriod, 7),
        });
      }
    } else if (startPeriod && !endPeriod) {
      resetField('endPeriod', {
        defaultValue: addRealDate('days', startPeriod, 7),
      });
    } else if (!startPeriod && endPeriod) {
      resetField('startPeriod', {
        defaultValue: endPeriod,
      });
    }
  }, [startPeriod, endPeriod]);

  return {
    startPeriod,
    period,
  };
};

export default useActions;
