import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../styles';
import Typography from '@components/Typography';
import { Box } from '@material-ui/core';
import clsx from 'clsx';
import { dateFormat } from '@utils/parser';

const Reviewers = (props) => {
  const { data, idx, initialExpandedIndexes } = props;
  const classes = useStyles();

  const [expandedIndexes, setExpandedIndexes] = useState(
    initialExpandedIndexes,
  );

  const toogleShowApproval = (index) => {
    if (expandedIndexes.includes(index)) {
      // If item is already expanded, remove it from the expandedIndexes array
      setExpandedIndexes(
        expandedIndexes.filter((itemIndex) => itemIndex !== index),
      );
    } else {
      // If item is not expanded, add it to the expandedIndexes array
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <>
      <Box
        className={clsx({
          [classes.contentCollapsed]: true,
          [classes.contentExpanded]: expandedIndexes.includes(idx),
        })}
      >
        {data.map(({ name, email, status, createdAt }, j) => (
          <div key={j}>
            {expandedIndexes.includes(idx) && (
              <div className={classes.worklogItem}>
                <div
                  className={clsx({
                    [classes.node]: true,
                    [classes.activeNode]: status === 'approve',
                    [classes.rejectNode]: status === 'reject',
                    [classes.waitingNode]: status === 'waiting approval',
                  })}
                />
                <div
                  className={clsx({
                    [classes.content]: true,
                    [classes.activeContent]: status === 'approve',
                    [classes.lastChild]: j === data.length - 1,
                  })}
                >
                  <Typography
                    children={name}
                    color="general-general"
                    inline
                    style={{ lineHeight: 1, marginBottom: '4px' }}
                    variant="subtitle2"
                    weight="medium"
                  />
                  <Typography
                    children={email}
                    color="general-mid"
                    inline
                    variant="caption"
                  />
                  {(status && status !== 'waiting approval' && createdAt && (
                    <Typography
                      children={`${status} on ${dateFormat({
                        date: createdAt,
                        type: 'date-time-full',
                      })}`}
                      color="general-mid"
                      variant="caption"
                      weight="bold"
                    />
                  )) ||
                    (status && (
                      <Typography
                        children={`${status}`}
                        color="general-mid"
                        variant="caption"
                        weight="bold"
                      />
                    ))}
                </div>
              </div>
            )}

            {data?.length > 1 && data.length === j + 1 && (
              <Box mt={0.5} sx={{ cursor: 'pointer' }}>
                <Typography
                  children={
                    expandedIndexes.includes(idx)
                      ? 'HIDE APPROVER'
                      : 'SHOW APPROVER'
                  }
                  color="primary-main"
                  onClick={() => toogleShowApproval(idx)}
                  variant="caption"
                  weight="bold"
                />
              </Box>
            )}
          </div>
        ))}
      </Box>
    </>
  );
};

Reviewers.defaultProps = {
  data: [],
  idx: null,
  initialExpandedIndexes: [],
};

Reviewers.propTypes = {
  data: PropTypes.array,
  idx: PropTypes.number,
  initialExpandedIndexes: PropTypes.array,
};

export default Reviewers;
