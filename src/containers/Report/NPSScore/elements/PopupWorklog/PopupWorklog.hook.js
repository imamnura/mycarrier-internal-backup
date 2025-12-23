import { dateFormat } from '@utils/parser';

const usePopupWorklog = (data) => {
  const normalizedData = data
    ?.map(
      ({ statusValidate, timestamp, createdByAlias, followUp, ...rest }) => {
        const statusLabel =
          {
            completed: 'COMPLETED',
            complete: 'COMPLETED',
            onprogress: 'ON PROGRESS',
            notyet: 'NOT YET',
          }[statusValidate] || '';

        return {
          date: dateFormat({ date: timestamp, type: 'date-time-full' }),
          status: statusLabel,
          approver: createdByAlias,
          note: followUp,
          ...rest,
        };
      },
    )
    .reverse();

  return {
    normalizedData,
  };
};

export default usePopupWorklog;
