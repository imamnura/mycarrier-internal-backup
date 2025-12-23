import { capitalize } from '@utils/text';
import { dateFormat, rupiahFormat } from '@utils/parser';
import { generateWorklogNote } from '../../utils';

export const additionalInformation = {
  gameqoo: [
    { name: 'productName', label: 'Product' },
    { name: 'packages.packageName', label: 'GameQoo Pack' },
    { name: 'packages.description', label: 'GameQoo Games' },
    { name: 'packages.quantity', label: 'GameQoo Quantity' },
    { name: 'packages.price', label: 'GameQoo Price' },
    { name: 'discount', label: 'Discount' },
  ],
  smarthand: [
    { name: 'sidNeucentrix', label: 'SID' },
    { name: 'locationNeucentrix', label: 'Location' },
    { name: 'productName', label: 'Product' },
    { name: 'smarthandPack', label: 'Smarthand Pack' },
    {
      name: 'totalActivities',
      label: 'Total Activities',
      converter: (v) => `${v} activities`,
    },
    { name: 'quantity', label: 'Quantity', converter: (v) => `${v} quantity` },
    { name: 'discount', label: 'Discount' },
    { name: 'grandTotal', label: 'Total Price', converter: rupiahFormat },
  ],
};

export const gameQooStep = {
  gameqoo: [
    'Submitted',
    'AM Approval',
    'Delivery Approval',
    'Provisioning',
    'BASO Signed',
    'Completed',
  ],
  smarthand: [
    'Submitted',
    'AM Approval',
    'Delivery Approval',
    'Provisioning',
    'Confirmation',
    'Completed',
  ],
};

export const getGameQooStepper = (status) => {
  let active = 0;
  let errors = undefined;
  let errorsLabel = undefined;

  switch (status) {
    case 'am approval':
    case 'returned': {
      active = 1;
      break;
    }
    case 'delivery approval': {
      active = 2;
      break;
    }
    case 'provisioning': {
      active = 3;
      break;
    }
    case 'confirmation':
    case 'baso signed': {
      active = 4;
      break;
    }
    case 'completed': {
      active = 5;
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

export const getGameQooWorklog = (worklog, productName = '') => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          'am approval': 'TELKOMREG-AM | APPROVED',
          'am checking': 'TELKOMREG-AM | CHECKING',
          'am returned': 'TELKOMREG-AM | RETURNED',
          'bakes created': 'TELKOMREG-SEGMENT-SUPPORT | APPROVED',
          'baso signed': 'BASO SIGNED | DELIVERY UPLOADED SIGNED',
          'baso completed': 'BASO SIGNED | BASO COMPLETED',
          completed: 'CONFIRMATION | CUSTOMER CONFIRMED ORDER',
          confirmation: 'CONFIRMATION | NEED CUSTOMER CONFIRMATION',
          'delivery approval': 'TELKOMREG-DELIVERY | APPROVED',
          'delivery returned': 'TELKOMREG-AM-GM-SEGMENT | RETURNED',
          'gameqoo signed': 'BASO SIGNED | DELIVERY UPLOADED BASO',
          'gameqoo completed': 'BASO SIGNED | CUSTOMER SIGNED BASO',
          'gameqoo am approval': 'TELKOMREG-AM | APPROVED',
          'gameqoo delivery approval': 'TELKOMREG-AM-GM-SEGMENT | APPROVED',
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
