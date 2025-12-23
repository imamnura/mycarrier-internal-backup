import React from 'react';
import NotFound from '@assets/Svg/NotFound';
import { Flex } from '@legion-ui/core';
import StateMessage from '@components/StateMessage';

const Unauthorize = () => {
  return (
    <Flex alignX="center" alignY="center" height={'80vh'} direction="column">
      <StateMessage
        message="Unauthorize!"
        description="You don't have permission to view this content."
        ilustration={NotFound}
      />
    </Flex>
  );
};

export default Unauthorize;
