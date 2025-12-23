import moment from 'moment';
import { dateFormat } from '@utils/parser';

const replaceDate = (baseDate, time) => {
  const _baseDate = moment(baseDate).format('YYYY-MM-DD');
  const formatTime = moment(time).format('HH:mm');
  const result = dateFormat({
    date: `${_baseDate} ${formatTime}`,
    type: 'timezone-jakarta',
  });

  return result;
};

export const reOrder = ({ data, sourceIndex, destinationIndex, type }) => {
  const stickSequence = data.map((stickData) => {
    if (type === 'event') {
      const { title, date } = stickData;
      return { title, date };
    } else {
      const { startTime, endTime } = stickData;
      return { startTime, endTime };
    }
  });
  const result = Array.from(data);

  const [removed] = result.splice(sourceIndex, 1);

  result.splice(destinationIndex, 0, removed);

  const result2 = result.map((r, i) => ({ ...r, ...stickSequence[i] }));

  if (type === 'event') {
    const reMapDate = result2.map((items) => ({
      items: items.items.map((i) => ({
        ...i,
        endTime: replaceDate(items.date, i.endTime),
        startTime: replaceDate(items.date, i.startTime),
      })),
    }));

    return reMapDate.map((r, i) => ({ ...r, ...stickSequence[i] }));
  } else {
    return result2;
  }
};

export const ordinalDate = (length, languange) => {
  let arr = [];

  for (let i = 0; i < length; i++) {
    if (languange === 'id') {
      if (length > 10) {
        arr.push(`Hari ke-${i + 1}`);
      } else {
        arr.push(
          'Hari Pertama',
          'Hari Kedua',
          'Hari Ketiga',
          'Hari Keempat',
          'Hari Kelima',
          'Hari Keenam',
          'Hari Ketujuh',
          'Hari Kedelapan',
          'Hari Kesembilan',
          'Hari Kesepuluh',
        );
      }
    } else {
      if (length > 10) arr.push(`${i + 1}-th Day`);
      else
        arr.push(
          'First Day',
          'Second Day',
          'Third Day',
          'Fourth Day',
          'Fifth Day',
          'Sixth Day',
          'Seventh Day',
          'Eighth Day',
          'Ninth Day',
          'Tenth Day',
        );
    }
  }

  return arr;
};

export const generateInitialData = (_rangeDate) => {
  const rangeDate = [];
  const startDate = moment(_rangeDate[0]);
  const endDate = moment(_rangeDate[1]);

  for (let i = 0; i <= endDate.diff(startDate, 'days'); i++) {
    rangeDate.push(moment(startDate).add(i, 'days').toJSON());
  }

  return rangeDate.map((date) => ({
    items: [],
    date: dateFormat({ date: date, type: 'timezone-jakarta' }),
    title: moment(date).format('DD MMMM YYYY'),
  }));
};
