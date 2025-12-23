import { errorTitle as error } from '@constants/static';
import _some from 'lodash/some';

export const errorTitle = {
  ...error,
  403: '403. Sorry, The Link is No Longer Valid',
};

export const pickStatus = (message) => {
  const patterns = [
    { pattern: /approved/i, status: 'approved' },
    { pattern: /returned/i, status: 'returned' },
    { pattern: /rejected/i, status: 'rejected' },
  ];

  const matchedPattern = patterns.find(({ pattern }) =>
    _some([pattern], (p) => p.test(message)),
  );

  return matchedPattern ? matchedPattern.status : 'error';
};
