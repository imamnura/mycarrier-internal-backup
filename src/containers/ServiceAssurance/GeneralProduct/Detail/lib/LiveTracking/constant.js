export const detailSchema = [
  { name: 'engineerName', label: 'ENGINEER NAME', grid: 12 },
  { name: 'status', label: 'STATUS', grid: 12 },
  { name: 'lastUpdate', label: 'LAST UPDATE', grid: 12 },
];

export const engStatus = (code) => {
  let status;
  switch (String(code)) {
    case '0':
      status = 'Stay';
      break;
    case '1':
      status = 'Moving...';
      break;
    case '2':
      status = 'Arrived!';
      break;
    default:
      status = 'Stay';
      break;
  }
  return status;
};
