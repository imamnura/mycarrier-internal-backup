import * as yup from 'yup';

export const keyDataSchema = (hasSecretKey) => {
  const schema = [{ name: 'apiKey', label: 'API Key' }];
  if (hasSecretKey) schema.push({ name: 'secretKey', label: 'Secret Key' });

  return schema;
};

export const msightStep = {
  general: [
    'Submitted',
    'AM Approval',
    'Delivery Approval',
    'Operator Checking',
    'Customer Agreement',
    'Operator Approval',
    'Completed',
  ],
  full: [
    'Submitted',
    'Delivery Approval',
    'Operator Checking',
    'Customer Agreement',
    'Operator Approval',
    'Completed',
  ],
};

export const messageSuccess = {
  'delivery approval': 'Request successfully forwarded',
};

export const actionContent = {
  return: {
    open: true,
    caption:
      'Once you returned this, it will be process and data will be sent to customer automatically.',
    confirmation: 'Are you sure want to return this document?',
    status: 'operator returned',
    success: 'Document successfully returned',
    title: 'Please give note of return',
    schema: [
      {
        name: 'note',
        label: 'Please describe the note..',
        maxLength: 1000,
        minRows: 3,
        multiline: true,
        required: true,
      },
    ],
    validation: { note: yup.string().required().label('Note') },
  },
  apiKey: {
    open: true,
    confirmation: 'Are you sure want to approve this document?',
    status: 'customer agreement',
    success: 'Document successfully approved',
    textInfo: 'You can input API Key from Telkomsel email',
    title: 'Input API Key',
    schema: [
      {
        name: 'apiKey',
        placeholder: 'API Key',
        label: 'API Key',
        maxLength: 19,
        required: true,
      },
      {
        name: 'note',
        label: 'Please describe the note..',
        maxLength: 1000,
        minRows: 3,
        multiline: true,
      },
    ],
    validation: { apiKey: yup.string().required().label('API Key') },
  },
  secretKey: {
    open: true,
    confirmation: 'Are you sure want to input this Secret Key & Expired Date?',
    status: 'actived',
    success: 'Secret Key & Expired successfully inputted',
    textInfo:
      'You can input Secret Key & Note of Count Hit from Telkomsel email',
    title: 'Input Secret Key & Note of Count Hit',
    schema: [
      {
        name: 'secretKey',
        placeholder: 'Secret Key',
        label: 'Secret Key',
        maxLength: 5,
        required: true,
      },
      {
        name: 'note',
        label: 'Note',
        maxLength: 1000,
        minRows: 3,
        multiline: true,
        required: true,
      },
    ],
    validation: {
      note: yup.string().required().label('Note'),
      secretKey: yup.string().required().label('Secret Key'),
    },
  },
};

export const getMsightStepper = (status, fullMsight) => {
  let active = 0;
  let errors = undefined;

  switch (status) {
    case 'submitted':
    case 'am approval':
    case 'rejected':
    case 'returned':
    case 'customer returned': {
      active = 1;
      break;
    }
    case 'delivery returned':
    case 'delivery approval': {
      active = 2;
      break;
    }
    case 'operator checking': {
      active = 3;
      break;
    }
    case 'customer agreement': {
      active = 4;
      break;
    }
    case 'operator approval':
    case 'operator returned': {
      active = 5;
      break;
    }
    case 'actived': {
      active = 6;
      break;
    }
  }

  //Full Msight doesn't need am approval step
  active = fullMsight && active > 1 ? active - 1 : active;

  if (status?.includes('returned')) {
    errors = 'returned';
  } else if (status?.includes('rejected')) {
    errors = 'rejected';
  }

  return { active, errors };
};
