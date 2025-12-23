import React from 'react';
import useQueryParams from '@utils/hooks/useQueryParams';
import GameQoo from './GameQoo';
import Msight from './Msight';
import General from './General';
import Solutions from './Solutions';
import Neucentrix from './Neucentrix';

const NewInstall = (props) => {
  const { queryParams } = useQueryParams();

  switch (queryParams?.productName) {
    case 'gameqoo':
    case 'smarthand neucentrix':
      return <GameQoo {...props} />;
    case 'antares iot':
    case 'omni-channel communication':
    case 'wa business':
    case 'neutra dc':
    case 'netmonk':
      return <Solutions {...props} />;
    case 'msight':
      return <Msight {...props} />;
    case 'neucentrix cndc':
      return <Neucentrix {...props} />;
    default:
      return <General {...props} />;
  }
};

export default NewInstall;
