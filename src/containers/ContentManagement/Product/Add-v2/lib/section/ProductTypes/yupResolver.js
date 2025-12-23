import * as yup from 'yup';

export const validation = yup.object().shape({
  l2TypeTitleid: yup.string().max(40).label('Title'),
  l2TypeDescid: yup.string().max(1500).label('Description'),
});
