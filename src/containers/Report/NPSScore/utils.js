import { dateFormat } from '@utils/parser';
import { textLimit } from '@utils/text';

export const normalizeRespondenChart = (chartData) => {
  const defaultData = [
    { name: 0, value: 0 },
    { name: 1, value: 0 },
    { name: 2, value: 0 },
    { name: 3, value: 0 },
    { name: 4, value: 0 },
    { name: 5, value: 0 },
    { name: 6, value: 0 },
    { name: 7, value: 0 },
    { name: 8, value: 0 },
    { name: 9, value: 0 },
    { name: 10, value: 0 },
  ];

  return defaultData.map(({ name, value }) => {
    const hasValue = chartData.find((cd) => cd.name === name);

    if (hasValue) return hasValue;

    return {
      name,
      value,
    };
  });
};

export const normalizeTableNps = (data = [], journey) => {
  switch (journey) {
    case 'explore': {
      return data.map((d) => ({
        ...d,
        dateTimeNps: dateFormat({ date: d?.dateTimeNps, type: 'date' }),
        npsRate: d?.rateScale === 0 ? '0' : d?.rateScale,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'evaluate': {
      return data.map((d) => ({
        ...d,
        bakesDate: dateFormat({ date: d?.bakesDate, type: 'date' }),
        npsRate: d?.npsRate === 0 ? '0' : d?.npsRate,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'activate': {
      return data.map((d) => ({
        ...d,
        orderDate: dateFormat({ date: d?.orderDate, type: 'date' }),
        dateTimeNps: dateFormat({ date: d?.dateTimeNps, type: 'date' }),
        npsRate: d?.rateNps === 0 ? '0' : d?.rateNps,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'getsupport': {
      return data.map((d) => ({
        ...d,
        createdAt: dateFormat({ date: d?.createdAt, type: 'date' }),
        datex: dateFormat({ date: d?.datex, type: 'date' }),
        ticketCompleted: dateFormat({ date: d?.ticketCompleted, type: 'date' }),
        npsRate: d?.rateNps === 0 ? '0' : d?.rateNps,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'pay': {
      return data.map((d) => ({
        ...d,
        npsDate: dateFormat({ date: d?.npsDate, type: 'date-dash' }),
        npsRate: d?.npsRate === 0 ? '0' : d?.npsRate,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'use': {
      return data.map((d) => ({
        ...d,
        npsDate: dateFormat({ date: d?.npsDate, type: 'date-dash' }),
        npsRate: d?.npsRate === 0 ? '0' : d?.npsRate,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
    case 'alljourney': {
      return data.map((d) => ({
        ...d,
        npsRate: d?.rate === 0 ? '0' : d?.rate,
        npsDueDate: dateFormat({ date: d?.dueDate, type: 'date' }) || '-',
        rootCauseTrim: d?.rootCause ? textLimit(d.rootCause, 50) : '',
        followUp: d?.followUp ? textLimit(d.followUp, 50) : '',
      }));
    }
  }
};

export const optionStatus = (status) => {
  const notyet = {
    label: '',
    value: 'notyet',
    customOption: {
      type: 'status',
      variant: 'primary',
      children: 'Not Yet',
    },
  };
  const onProgress = {
    label: '',
    value: 'onprogress',
    customOption: {
      type: 'status',
      variant: 'warning',
      children: 'On Progress',
    },
  };
  const completed = {
    label: '',
    value: 'completed',
    customOption: {
      type: 'status',
      variant: 'success',
      children: 'Completed',
    },
  };

  if (status == '' || !status) return [notyet, onProgress, completed];
  if (status == 'notyet') return [notyet, onProgress, completed];
  if (status == 'not yet') return [notyet, onProgress, completed];
  if (status == 'onprogress') return [onProgress, completed];
  if (status == 'on progress') return [onProgress, completed];
  if (status == 'completed') return [completed];
  return [];
};
