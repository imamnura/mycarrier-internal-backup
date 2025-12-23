import { capitalize } from '@utils/text';
import { dateFormat } from '@utils/parser';
import { generateWorklogNote } from '../../../utils';

export const additionalInformation = {
  gameqoo: [
    { name: 'productName', label: 'Product' },
    { name: 'packages.packageName', label: 'GameQoo Pack' },
    { name: 'packages.description', label: 'GameQoo Games' },
    { name: 'packages.quantity', label: 'GameQoo Quantity' },
    { name: 'packages.price', label: 'GameQoo Price' },
    { name: 'discount', label: 'Discount' },
  ]
};

export const fabProductStep = [
  'Submitted',
  'AM Approval',
  'Segment Approval',
  'Delivery Approval',
  'Provisioning',
  'BASO Signed',
  'Completed',
];

export const getFabProductStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'am approval':
    case 'returned': {
      active = 1;
      break;
    }
    case 'segment approval': {
      active = 2;
      break;
    }
    case 'delivery approval': {
      active = 3;
      break;
    }
    case 'provisioning': {
      active = 4;
      break;
    }
    case 'baso signed': {
      active = 5;
      break;
    }
    case 'completed': {
      active = 6;
      break;
    }
  }

  if (['rejected', 'not visit'].includes(status)) {
    errors = 'rejected';
    errorsLabel = capitalize(status.toLowerCase());
  }

  if (['returned'].includes(status)) {
    errors = 'returned';
  }

  return {
    active,
    errors,
    errorsLabel,
  };
};

export const getFabProductWorklog = (worklog, productName = '') => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'am approval': 'TELKOMREG-AM | APPROVED',
          'checking': 'TELKOMREG-AM | CHECKING',
          'am returned': 'TELKOMREG-AM | RETURNED',
          'bakes created': 'TELKOMREG-SEGMENT-SUPPORT | APPROVED',
          'baso signed': 'BASO SIGNED | DELIVERY UPLOADED SIGNED',
          'baso completed': 'BASO SIGNED | BASO COMPLETED',
          'delivery approval': 'TELKOMREG-DELIVERY | APPROVED',
          'delivery returned': 'TELKOMREG-AM-GM-SEGMENT | RETURNED',
          'gameqoo delivery approval': 'TELKOMREG-DELIVERY | APPROVED',
          'gameqoo signed': 'BASO SIGNED | DELIVERY UPLOADED BASO',
          'gameqoo completed': 'BASO SIGNED | CUSTOMER SIGNED BASO',
          'gameqoo am approval': 'TELKOMREG-AM | APPROVED',
          'gameqoo delivery returned': 'TELKOMREG-AM-GM-SEGMENT | RETURNED',
          'FAB checked': `PROVISIONING | FAB CHECKED ${productName}`,
          'FAB installed': `PROVISIONING | FAB INSTALLATION ${productName}`,
          'FAB completed': `PROVISIONING | FAB COMPLETED ${productName}`,
          provisioning: 'TELKOMREG-DELIVERY | APPROVED',
          'segment approval': 'TELKOMREG-AM-GM-SEGMENT | APPROVED',
          submitted: 'CUSTOMER | SUBMITTED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel.toUpperCase(),
      };
    })
    .reverse();
};
