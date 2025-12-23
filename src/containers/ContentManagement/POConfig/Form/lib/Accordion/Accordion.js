import React, { useState } from 'react';
import useAccordionStyles from './Accordion.styles';
import ArrowDown from '@assets/icon-v2/ArrowDown';
import { Text } from '@legion-ui/core';

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  const classes = useAccordionStyles({
    rootEvent: isActive,
  });

  return (
    <div className={classes.accordionItem}>
      <div
        className={classes.accordionTitle}
        onClick={() => setIsActive(!isActive)}
      >
        <Text children={title} size="20px" weight="700" color="secondary500" />
        <ArrowDown className={classes.arrow} />
      </div>
      {isActive && <div className={classes.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;
