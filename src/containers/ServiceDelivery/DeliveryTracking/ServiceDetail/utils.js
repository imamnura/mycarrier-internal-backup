import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';

export const getServiceDetailSteper = (data) => {
  let errors = undefined;
  let errorsLabel = undefined;

  const steps = ['Pre Delivery', 'Delivery', 'Post Delivery', 'Completed'];

  const activeSteps = {
    'pre delivery': 0,
    delivery: 1,
    'post delivery': 2,
    completed: 3,
  }[data?.deliveryStep];

  if (['Failed']?.includes(data?.orderLineStatus)) {
    errors = 'returned';
    errorsLabel = steps[activeSteps];
  } else if (['Canceled']?.includes(data?.orderLineStatus)) {
    errors = 'rejected';
    errorsLabel = steps[activeSteps];
  }

  return {
    steps,
    active: activeSteps,
    errors,
    errorsLabel,
  };
};

export const generateWorklogNote = (
  { note, noteProgress, file },
  onPreviewWorklog,
) => {
  if (noteProgress && file?.length > 0) {
    return (
      <>
        {note && (
          <Typography children={note} color="general-mid" variant="caption" />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}

        {file?.fileUrl ||
          (file[0]?.fileUrl && (
            <Box display="block">
              <Typography color="general-mid" variant="caption">
                See&nbsp;
              </Typography>
              <Typography
                color="blue-main"
                onClick={onPreviewWorklog(file?.fileUrl ? file : file[0])}
                style={{ cursor: 'pointer' }}
                variant="caption"
              >
                attachment here.
              </Typography>
            </Box>
          ))}
      </>
    );
  } else if (noteProgress) {
    return (
      <>
        {note && (
          <Typography children={note} color="general-mid" variant="caption" />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
      </>
    );
  } else if (note) {
    return note;
  } else {
    return '';
  }
};

export const getServiceDetailWorklog = (worklog, onPreviewWorklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }, onPreviewWorklog),
        status: status?.toUpperCase() || '',
      };
    })
    .reverse();
};

export const schemaMTTR = [
  {
    name: 'billPeriode',
    label: 'Period',
  },
  {
    name: 'mttr',
    label: 'MTTR',
    cellStyle: {
      textTransform: 'uppercase',
    },
  },
];

export const schemaMRTG = [
  { name: 'averageIn', label: 'AVERAGE IN' },
  { name: 'averageOut', label: 'AVERAGE OUT' },
  { name: 'maxIn', label: 'MAX IN' },
  { name: 'maxOut', label: 'MAX OUT' },
];

export const defaultPalette = ['hsl(42, 96%, 50%)', 'hsl(144, 46%, 43%)'];

export const normalizeLineMRTG = (data) => {
  return data.map((item) => ({
    ...item,
    averageIn: `${(item?.averageIn / 1000).toFixed(2)} Mb`,
    averageOut: `${(item?.averageOut / 1000).toFixed(2)} Mb`,
    maxIn: `${(item?.maxIn / 1000).toFixed(2)} Mb`,
    maxOut: `${(item?.maxOut / 1000).toFixed(2)} Mb`,
    data: item?.data?.map((i, key) => ({
      ...i,
      data: i?.data?.map((x) => ({
        ...x,
        y: (x?.y / 1000).toFixed(2),
      })),
      color: defaultPalette[key],
    })),
  }));
};

export const checkProduct = (productName) => {
  if (['Akses Jasa Call Center'].includes(productName)) return 'call-center';

  if (['Layanan Masking Number'].includes(productName)) return 'masking';

  if (['ITKP'].includes(productName)) return 'itkp';

  if (['Calling Card'].includes(productName)) return 'calling-card';

  return 'MRTG';
};
