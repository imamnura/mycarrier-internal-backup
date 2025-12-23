import { Text } from '@legion-ui/core';
import React from 'react';
import useCardStyles from './Card.styles';

const Card = ({
  title,
  subTitle,
  action = null,
  children,
  border,
  isCustomStyleTitle = false,
  ...other
}) => {
  const classes = useCardStyles({ border });
  return (
    <div className={classes.root} {...other}>
      {title ? (
        <div
          className={isCustomStyleTitle ? classes.headerCustom : classes.header}
        >
          <div>
            <Text size="20px" weight="700" color="secondary-500">
              {title}
            </Text>
            {subTitle && (
              <Text block size="12px" color="secondary-400">
                {subTitle}
              </Text>
            )}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
};

export default Card;
