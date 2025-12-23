import React, { useState } from 'react';
import useAccordionStyles from './Accordion.styles';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import { Text } from '@legion-ui/core';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(true);

  const classes = useAccordionStyles({
    rootEvent: isActive,
  });

  return (
    <div className={classes.accordionItem}>
      <div
        className={classes.accordionTitle}
        onClick={() => setIsActive(!isActive)}
      >
        <Text children={title} size="16px" weight="600" color="#3B525C" />
        <ArrowDown className={classes.arrow} />
      </div>
      {isActive && <div className={classes.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;
