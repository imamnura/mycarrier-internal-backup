import { defaultPalette } from './constant';

export const normalizeLine = (data) => {
  return data.map((item) => ({
    ...item,
    averageIn: `${(item.averageIn / 1000).toFixed(2)} Mb`,
    averageOut: `${(item.averageOut / 1000).toFixed(2)} Mb`,
    maxIn: `${(item.maxIn / 1000).toFixed(2)} Mb`,
    maxOut: `${(item.maxOut / 1000).toFixed(2)} Mb`,
    data: item.data.map((i, key) => ({
      ...i,
      data: i.data.map((x) => ({
        ...x,
        y: (x.y / 1000).toFixed(2),
      })),
      color: defaultPalette[key],
    })),
  }));
};
