import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CheckCircle from '@assets/Svg/CheckCircle';
import { Tooltip } from '@legion-ui/core';
import useStyles from './styles';
import clsx from 'clsx';

const ReadMoreComponent = ({ description, maxCharLimit }) => {
  const classes = useStyles();

  const SHOW_MORE_TEXT = 'more';
  const SHOW_LESS_TEXT = 'less';
  const ELLIPSES = '…';

  const [showingAll, setShowingAll] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setShowingAll(!showingAll);
  };

  const remapDescription = (description, maxCharLimit) => {
    return description.map((item) => {
      if (item.attribute.length > maxCharLimit) {
        return {
          ...item,
          attribute: item.attribute.substring(0, maxCharLimit) + ELLIPSES,
        };
      }
      return item;
    });
  };

  const remappedDescription =
    Array.isArray(description) && remapDescription(description, maxCharLimit);

  const getActionButton = ({ showingAll }) => {
    let buttonText = showingAll ? SHOW_LESS_TEXT : SHOW_MORE_TEXT;

    if (!Array.isArray(description) || description.length <= 1) {
      return null;
    } else {
      return (
        <button
          className={classes.readMoreButton}
          onClick={(e) => handleToggle(e)}
          type="button"
        >
          {buttonText}
        </button>
      );
    }
  };

  let actionButton = getActionButton({ showingAll });

  return (
    <div>
      {remappedDescription.length > 1 && !showingAll ? (
        <>
          <ul>
            <li style={{ listStyle: 'disc' }}>
              {remappedDescription[0].attribute}
            </li>
            {actionButton}
          </ul>
        </>
      ) : (
        <ul>
          {Array.isArray(description)
            ? remappedDescription.map((item, index) => (
                <li
                  key={index}
                  className={clsx(classes.listStyleItem, {
                    [classes.readMoreTextHide]: !showingAll && index > 0,
                    [classes.readMoreTextShow]: showingAll || index === 0,
                    [classes.noListStyleItem]: remappedDescription.length === 1,
                  })}
                >
                  {item.attribute}
                  {item.isNCXGenerated && (
                    <Tooltip key={index} text="Auto generated by NCX/SC One">
                      <span style={{ marginLeft: '3px' }}>
                        <CheckCircle />
                      </span>
                    </Tooltip>
                  )}
                </li>
              ))
            : description}
          {actionButton}
        </ul>
      )}
    </div>
  );
};

ReadMoreComponent.defaultProps = {
  description: [],
  maxCharLimit: 100,
};

ReadMoreComponent.propTypes = {
  description: PropTypes.array,
  maxCharLimit: PropTypes.number,
};

export default ReadMoreComponent;
