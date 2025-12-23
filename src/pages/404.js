import React from 'react';
import NotFound from '@assets/Svg/NotFound';
import { Flex } from '@legion-ui/core';
import StateMessage from '@components/StateMessage';

const Page404 = () => {
  return (
    <Flex alignX="center" alignY="center" height={'80vh'} direction="column">
      <StateMessage
        message="Oops! The page you were looking for doesn't exist"
        description="You may have miss-typed the address or the page may have moved."
        ilustration={NotFound}
      />
    </Flex>
  );
};

export default Page404;
