import { capitalize } from '@utils/text';
import { dateFormat } from '@utils/parser';
import { generateWorklogNote } from '../../../utils';

export const schemaTable = [
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'ITEM',
    name: 'item',
  },
  {
    cellStyle: {
      minWidth: 280,
    },
    label: 'DESCRIPTION',
    name: 'description',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'OTC PRICE',
    name: 'otc',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'MRC PRICE',
    name: 'mrc',
  },
];

export const getNeucentrixStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let warnings = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'am approval':
    case 'am returned': {
      active = 1;
      break;
    }
    case 'segment approval':
    case 'segment returned': {
      active = 2;
      break;
    }
    case 'delay order': {
      active = 3;
      break;
    }
    case 'completed': {
      active = 4;
      break;
    }
  }

  if (status?.includes('rejected')) {
    errors = 'rejected';
    errorsLabel = capitalize(status.toLowerCase());
  }

  if (status?.includes('returned')) {
    errors = 'returned';
  }

  if (['delay order'].includes(status)) {
    warnings = 'delay order';
  }

  return {
    active,
    errors,
    errorsLabel,
    warnings,
  };
};

export const getPurchaseOrderWorklog = (worklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          submitted: 'CUSTOMER | SUBMITTED',
          checking: 'TELKOMREG-AM  | CHECKING',
          'am approval': 'TELKOMREG-AM  | APPROVED',
          'am checking': 'TELKOMREG-AM  | CHECKING',
          'am returned': 'TELKOMREG-AM | RETURNED',
          'delay order': 'DELAY ORDER | ORDER DELAYED',
          'segment approval': 'TELKOMREG-SEGMENT-SUPPORT | APPROVED',
          'segment returned': 'TELKOMREG-SEGMENT-SUPPORT | RETURNED',
          completed: 'COMPLETED | ORDER COMPLETED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};
