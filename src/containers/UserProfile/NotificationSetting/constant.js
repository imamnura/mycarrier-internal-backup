import color from '@styles/color';

const additionalStyle = {
  backgroundColor: color.white,
  borderBottom: `1px solid ${color.general.light}`,
};

export const tableHeader = (name = '') => [
  {
    cellStyle: {
      ...additionalStyle,
    },
    label: name,
    name: 'title',
  },
  {
    cellStyle: {
      ...additionalStyle,
      width: 30,
    },
    label: 'Email',
    name: 'email',
  },
  {
    cellStyle: {
      ...additionalStyle,
      width: 30,
    },
    label: 'WhatsApp',
    name: 'whatsapp',
  },
];
