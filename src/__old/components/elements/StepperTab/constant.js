export const colorPick = ({ index, active }) => {
  if (index === active) {
    return 'primary';
  } else if (index < active) {
    return 'green';
  } else {
    return 'default';
  }
};
