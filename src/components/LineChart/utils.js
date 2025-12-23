export const ySelector = (base) => (data) => {
  const allYValues = [];

  data.forEach(({ data }) => {
    data.forEach(({ y }) => {
      allYValues.push(y);
    });
  });

  const uniqueYValues = [
    ...new Set(
      allYValues.filter((x) => typeof x === 'number').sort((a, b) => a - b),
    ),
  ];

  return uniqueYValues
    .map((val) => {
      if (val % base === 0) {
        return val;
      } else {
        return undefined;
      }
    })
    .filter((val) => typeof val === 'number');
};

export const getMaxY = (data) => {
  let highestValue = [];
  data.forEach(({ data }, i) => {
    highestValue[i] = Math.max(...data.map(({ y }) => y));
  });

  const highest = Math.max(...highestValue);

  if (highest < 5) {
    return 5.5;
  } else {
    return highest + (highest * 5) / 100;
  }
};
