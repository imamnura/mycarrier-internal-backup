import { titleCapitalize } from '@utils/common';
import color from '../../../styles/color';
import { textLimit } from '../../../utils/text';
import { defaultPalette } from './constant';
import moment from 'moment';

export const tabText = (tab, type) => {
  switch (type) {
    case 'documentValue':
      switch (tab) {
        case 'bakes':
          return 'BAKES Value';
        case 'offeringLetter':
          return 'Offering Letter Value';
        case 'smsa2p':
          return 'SMS A2P Closed Total';
        case 'neucloud':
          return 'NeuCloud Closed Total';
        case 'gp':
          return 'SMS A2P Report Completed Total';
        default:
          return 'Document Value';
      }
    case 'customerBar':
      switch (tab) {
        case 'po':
          return 'OLO NAME';
        case 'baso':
          return 'OLO NAME';
        case 'bakes':
          return 'COMPANY NAME';
        case 'offeringLetter':
          return 'COMPANY NAME';
        case 'smsa2p':
          return 'COMPANY NAME';
        case 'neucloud':
          return 'COMPANY NAME';
        case 'gp':
          return 'COMPANY NAME';
        case 'visitNCX':
          return 'COMPANY';
        default:
          return 'COMPANY NAME';
      }
    case 'productPie':
      switch (tab) {
        case 'neucloud':
        case 'smsa2p':
          return 'Trouble Type';
        case 'gp':
          return 'Product';
        case 'visitNCX':
          return 'Data Center Location';
        default:
          return '';
      }
    case 'orderTypePie':
      switch (tab) {
        case 'po':
        case 'baso':
          return 'Order Type & Product';
        case 'visitNCX':
          return 'User Type';
        default:
          return 'Order Type & Product';
      }
    default:
      switch (tab) {
        case 'po':
          return 'Purchase Order';
        case 'baso':
          return 'BASO';
        case 'bakes':
          return 'BAKES';
        case 'offeringLetter':
          return 'Offering Letter';
        case 'smsa2p':
          return 'SMS A2P';
        case 'neucloud':
          return 'NeuCloud';
        case 'gp':
          return 'General Product';
        case 'document':
          return 'Document';
        case 'visitNCX':
          return 'Visiting NeuCentrIX';
        case 'serviceAssurance':
        case 'neucentrix':
          return 'Status';
        default:
          return 'Purchase Order';
      }
  }
};

export const maskStatusTitle = (title, tab) => {
  let maskStatus = {};

  if (tab === 'po') {
    maskStatus = {
      'am returned': 'AM Returned',
      approved: 'Approved',
      checking: 'Checking',
      'customer returned': 'Customer Returned',
      'delivery approval': 'Delivery Approval',
      'telkom approval': 'Telkom Approval',
      'delivery approved': 'Delivery Approved',
      rejected: 'Rejected',
      returned: 'Returned',
      'wds approval': 'WDS Approval',
      'wds approved': 'WDS Approved',
    };
  } else if (tab === 'baso') {
    maskStatus = {
      'am returned': 'AM Returned',
      returned: 'BASO Returned',
      rejected: 'BASO Rejected',
      'ba complete': 'BASO Completed',
      'need cust sign': 'Customer Sign',
    };
  } else if (tab === 'offeringLetter') {
    maskStatus = {
      draft: 'Draft',
      'telkom approval': 'Telkom Approval',
      returned: 'Returned',
      rejected: 'Rejected',
      approved: 'Approved',
    };
  } else if (tab === 'bakes') {
    maskStatus = {
      draft: 'Draft',
      'telkom approval': 'Telkom Approval',
      'customer approval': 'Customer Approval',
      returned: 'Returned',
      rejected: 'Rejected',
      approved: 'Approved',
    };
  } else if (tab === 'smsa2p') {
    maskStatus = {
      completed: 'Closed',
      checking: 'Ticket Analyze',
      onprogress: 'Technical Handling',
      rejected: 'Reject',
      customerreview: 'Customer Review',
    };
  } else if (tab === 'neucloud') {
    maskStatus = {
      completed: 'Closed',
      checking: 'Checking',
      onprogress: 'On Progress',
    };
  } else if (tab === 'gp') {
    maskStatus = {
      rejected: 'Rejected',
      closed: 'Closed',
      'fault completion': 'Fault Completion',
      validasi: 'Report Checking',
      approved: 'Report Issued',
      backend: 'Fault Handling',
      queued: 'Fault Analysis',
    };
  } else if (tab === 'visitNCX') {
    maskStatus = {
      rejected: 'Rejected',
      checking: 'Checking',
      approved: 'Approved',
      visiting: 'Visiting',
      completed: 'Visit Completed',
      'visit completed': 'Visit Completed',
    };
  }

  return maskStatus[title] || title;
};

export const normalizeDocumentPie = (_data, tab) => {
  const data = _data
    .sort((a, b) => a.count - b.count)
    .map(({ count, title, percentage, ...d }) => ({
      ...d,
      percentage: percentage.toFixed(2),
      value: count,
      title: maskStatusTitle(title.toLowerCase(), tab),
      lowTitle: title.toLowerCase(),
    }));

  if (tab === 'po') {
    const poPalette = {
      green: ['#5bc284', '#3ba064', '#2c774a'],
      blue: ['#6494e3', '#3071d9', '#2056ac'],
      red: [color.primary.mid, color.primary.main, color.primary.dark],
      yellow: [color.yellow.main, color.orange.main],
    };

    const blueSection = data
      .filter(({ lowTitle }) => lowTitle.includes('approval'))
      .map((d, i) => ({ ...d, color: poPalette.blue[i] }));

    const greenSection = data
      .filter(({ lowTitle }) => lowTitle.includes('approved'))
      .map((d, i) => ({ ...d, color: poPalette.green[i] }));

    const redSection = data
      .filter(
        ({ lowTitle }) =>
          lowTitle.includes('returned') || lowTitle.includes('rejected'),
      )
      .map((d, i) => ({ ...d, color: poPalette.red[i] }));

    const yellowSection = data
      .filter(({ lowTitle }) => lowTitle.includes('checking'))
      .map((d, i) => ({ ...d, color: poPalette.yellow[i] }));

    const otherSection = data
      .filter(({ lowTitle }) => {
        const isOther = !(
          lowTitle.includes('checking') ||
          lowTitle.includes('approval') ||
          lowTitle.includes('approved') ||
          lowTitle.includes('returned') ||
          lowTitle.includes('rejected') ||
          lowTitle.includes('checking')
        );

        return isOther;
      })
      .map((d, i) => ({ ...d, color: defaultPalette[i] }));

    return [
      ...blueSection,
      ...greenSection,
      ...yellowSection,
      ...redSection,
      ...otherSection,
    ];
  } else if (tab === 'baso') {
    const basoPalette = {
      'am returned': color.primary.dark,
      returned: color.primary.mid,
      rejected: color.primary.main,
      'ba complete': color.green.main,
      'need cust sign': color.blue.main,
    };

    return data.map((d) => ({
      ...d,
      color: basoPalette[d.lowTitle],
    }));
  } else if (tab === 'offeringLetter') {
    const offeringLetterPalette = {
      draft: color.yellow.main,
      'telkom approval': color.blue.main,
      returned: color.primary.mid,
      rejected: color.primary.main,
      approved: color.green.main,
    };

    return data.map((d) => ({
      ...d,
      color: offeringLetterPalette[d.lowTitle],
    }));
  } else if (tab === 'bakes') {
    const bakesPalette = {
      draft: color.yellow.main,
      'telkom approval': color.blue.main,
      'customer approval': '#6494e3',
      returned: color.primary.mid,
      rejected: color.primary.main,
      approved: color.green.main,
    };

    return data.map((d) => ({
      ...d,
      color: bakesPalette[d.lowTitle],
    }));
  } else if (tab === 'smsa2p') {
    const smsa2pPalette = {
      completed: color.green.main,
      checking: color.blue.main,
      onprogress: color.yellow.main,
      rejected: color.primary.main,
      customerreview: color.orange.main,
    };

    return data.map((d) => ({
      ...d,
      color: smsa2pPalette[d.lowTitle],
    }));
  } else if (tab === 'neucloud') {
    const neucloudPalette = {
      completed: color.green.main,
      checking: color.blue.main,
      onprogress: color.yellow.main,
    };

    return data.map((d) => ({
      ...d,
      color: neucloudPalette[d.lowTitle],
    }));
  } else if (tab === 'gp') {
    const gpPalette = {
      rejected: color.primary.main,
      closed: color.green.main,
      'fault completion': color.orange.main,
      validasi: color.blue.main,
      approved: color.orange.soft,
      backend: color.yellow.soft,
      queued: color.yellow.main,
    };

    return data.map((d) => ({
      ...d,
      color: gpPalette[d.lowTitle],
    }));
  } else if (tab === 'visitNCX') {
    const visitNCXPalette = {
      rejected: color.primary.main,
      checking: color.yellow.main,
      approved: color.blue.main,
      visiting: color.orange.main,
      completed: color.green.main,
    };

    return data.map((d) => ({
      ...d,
      color: visitNCXPalette[d.lowTitle],
    }));
  }

  return data;
};

export const normalizeGeneralPie = (_data) => {
  if (!_data) return null;

  const data = _data.map(({ count, title, ...d }, i) => ({
    ...d,
    title: titleCapitalize(title),
    value: count,
    color: defaultPalette[i],
  }));

  return data;
};

export const parsingValue = (num) => {
  if (!num) return null;

  let digits = 1;
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: '' },
    { value: 1e6, symbol: 'Million' },
    { value: 1e9, symbol: 'Billion' },
    { value: 1e12, symbol: 'Trillion' },
    { value: 1e15, symbol: 'Quadrillion' },
    { value: 1e18, symbol: 'Quintillion' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  let item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item?.value);

  if (item?.value === 1e3) digits = 3;

  return item
    ? (num / item?.value).toFixed(digits).replace(rx, '$1') + ' ' + item.symbol
    : '0';
};

export const normalizeBarChart = (data) => {
  if (!data) return null;

  return data.map(({ count, title }) => ({
    title: textLimit(title, 50),
    value: count,
  }));
};

export function axisLabelHandler(item, type) {
  const { month, week, date, year } = item;

  switch (type) {
    case 'daily':
      return moment(date).format('DD MMMM');
    case 'weekly':
      return `Week ${week} - ${moment.months()[month - 1]} ${year}`;
    case 'monthly':
      return `${moment.months()[month - 1]} ${year}`;
    case 'yearly':
      return year;
  }
}

export const normalizeGroupedBar = (_data = [], typePeriod) => {
  const colorPallete = {
    approvalMyCColor: '#3071D9',
    approvalVamColor: '#FAB005',
    approvalTotalColor: '#3BA064',
  };
  const data = [];

  _data.forEach((i) => {
    data.push({
      ...colorPallete,
      ...i,
      id: axisLabelHandler(i?._id, typePeriod),
    });
  });

  return data;
};

export const normalizeDocumentValue = (tab, documentValue) => {
  switch (tab) {
    case 'bakes':
    case 'offeringLetter':
      return {
        title: `${tabText(tab)} Value`,
        value: `Rp ${documentValue?.value || '-'}`,
        variant: 'primary',
        caption: 'Est. Value (Based on Approved)',
      };
    case 'smsa2p':
    case 'neucloud':
      return {
        title: `${tabText(tab)} Closed Total`,
        value: `${documentValue?.value || '-'} Ticket`,
        variant: 'success',
        caption: `Ticket (Based on Closed Status) from ${documentValue?.totalValue} Total Ticket`,
      };
    case 'gp':
      return {
        title: `${tabText(tab)} Report Completed Total`,
        value: `${documentValue?.value || '-'} Ticket`,
        variant: 'success',
        caption: `Ticket (Based on Report Completed Status) from ${documentValue?.totalValue} Total Ticket`,
      };
    default:
      return {
        title: `${tabText(tab)} Value`,
        value: `Rp ${documentValue?.value || '-'}`,
        variant: 'primary',
        caption: 'Est. Value (Based on Approved)',
      };
  }
};
