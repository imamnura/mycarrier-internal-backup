import color from '@styles/color';
import { textLimit } from '@utils/text';

export const pageVisitLabel = {
  MRTG: 'MRTG',
  Neucentrix: 'Neucentrix',
  Digimon: 'Digimon',
  Keyword: 'Keyword',
  LBA: 'CC',
  PO: 'PO',
  Delivery: 'Delivery',
  Neulink: 'Neulink',
  NPS: 'NPS',
  Performance: 'Performance',
  UMB: 'UMB',
  Report: 'Report',
  Banner: 'Banner',
  Products: 'Products',
  Article: 'Article',
  Role: 'Role',
  Privilege: 'Privilege',
  Bakes: 'Bakes',
  Quotation: 'Quotation',
  Invoice: 'Invoice',
  Claim: 'Claim',
  'Tracking Delivery': 'Tracking Delivery',
  'Site Visit': 'Site Visit',
  'Activation Letters': 'Activation Letters',
  'SMS A2P (Bulk)': 'SMS A2P (Bulk)',
  'My Products': 'My Products',
  'Request Link': 'Request Link',
  'Visit Neucentrix': 'Visit Neucentrix',
  'Monitoring SMSA2P': 'Monitoring SMSA2P',
  'New Non Bulk': 'New Non Bulk',
  'Lead Management System': 'Lead Management System',
  'Billing Reminder': 'Billing Reminder',
  'Thanks Letter': 'Thanks Letter',
  'SMS A2P Customer': 'SMS A2P Customer',
  'SMS A2P Internal': 'SMS A2P Internal',
  'General Product Internal': 'General Product Internal',
  'General Product': 'General Product',
  'NeuCloud Customer': 'NeuCloud Customer',
  'NeuCloud Internal': 'NeuCloud Internal',
};

export const listPageVisit = {
  customer: {
    activate: [
      'PO',
      'Visit Neucentrix',
      'SMS A2P (Bulk)',
      'LBA',
      'Activation Letters',
      'New Non Bulk',
      'MRTG',
      'Neucentrix',
      'Digimon',
      'Delivery',
      'Neulink',
      'NPS',
      'UMB',
      'Report',
      'Tracking Delivery',
      'My Products',
      'Keyword',
      'Performance',
    ],
    getSupport: [
      'General Product',
      'SMS A2P Customer',
      'NeuCloud Customer',
      'GameQoo Customer',
    ],
    pay: ['Invoice', 'Claim', 'Thanks Letter', 'Billing Reminder'],
  },
  internal: {
    activate: [
      'PO',
      'Visit Neucentrix',
      'SMS A2P (Bulk)',
      'LBA',
      'Activation Letters',
      'New Non Bulk',
      'Keyword',
      'Monitoring SMSA2P',
      'Request Link',
      'UMB',
      'Report',
      'Tracking Delivery',
      'Performance',
      'NPS',
    ],
    getSupport: [
      'General Product',
      'SMS A2P Internal',
      'General Product Internal',
      'NeuCloud Internal',
      'GameQoo Internal',
    ],
    pay: ['Invoice', 'Claim', 'Thanks Letter', 'Billing Reminder'],
    explore: ['Banner', 'Products', 'Article', 'Site Visit'],
    evaluate: [
      'Bakes',
      'Quotation',
      'Role',
      'Privilege',
      'Lead Management System',
    ],
  },
};

export const pickPageVisit = (type, tab, page) => ({
  children: pageVisitLabel[page] || '-',
  color: defaultPalette[listPageVisit[type][tab]?.findIndex((x) => x === page)],
});

export const listSchema = (type) => {
  const schema = [
    {
      cellStyle: {
        minWidth: 180,
        width: 180,
      },
      label: 'User ID',
      name: 'userId',
    },
    {
      cellStyle: {
        minWidth: 45,
      },
      label: 'Page Visit',
      name: 'pageVisit',
      // schemaPageVisit: pageVisitVariant,
    },
    {
      cellStyle: {
        minWidth: 45,
      },
      formatDate: 'date-time',
      label: 'Last Visit',
      name: 'lastVisit',
    },
  ];
  if (type === 'internal') {
    schema.splice(1, 0, {
      cellStyle: {
        minWidth: 45,
      },
      label: 'Account Name',
      name: 'accountName',
    });
  } else if (type === 'customer') {
    schema.splice(
      1,
      0,
      {
        cellStyle: {
          minWidth: 180,
        },
        label: 'Customer Name',
        name: 'customerName',
      },
      {
        cellStyle: {
          minWidth: 45,
        },
        label: 'Company Name',
        name: 'companyName',
      },
    );
  }
  return schema;
};

export const defaultPalette = [
  color.blue.main,
  color.yellow.main,
  color.primary.mid,
  color.primary.main,
  color.green.main,
  color.green.soft,
  color.orange.main,
  '#ffd180',
  '#b388ff',
  '#ea80fc',
  '#8c9eff',
  '#1F3D99',
  '#ff80ab',
  '#ff4081',
  '#80d8ff',
  '#00bcd4',
  '#0097a7',
  '#ec407a',
  '#E69A8DFF',
  '#8bc34a',
  '#33691e',
];

export const normalizeBarChart = (data) => {
  if (!data) return null;

  return data.map(({ count, title }) => ({
    title: textLimit(title, 50),
    value: count,
  }));
};
