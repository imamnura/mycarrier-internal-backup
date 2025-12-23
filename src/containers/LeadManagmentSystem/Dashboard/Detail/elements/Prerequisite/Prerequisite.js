/* eslint-disable react/no-danger */
import ArrowDown from '@assets/icon-v2/ArrowDown';
import CircleCheck from '@assets/icon-v2/CircleCheck';
import Typography from '@components/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Prerequisite = ({ isHaveError, data }) => {
  const classes = useStyles({ isHaveError });

  return (
    <Accordion
      classes={{
        root: classes.root,
        rounded: classes.rootRound,
      }}
      defaultExpanded
    >
      <AccordionSummary
        classes={{
          content: classes.headerContent,
          root: classes.header,
        }}
        expandIcon={<ArrowDown className={classes.icon} />}
      >
        <Typography variant="h5" weight="medium">
          Prerequisite
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={classes.itemRoot}>
          {data.map(({ label, status }, index) => {
            if (status) {
              return (
                <div
                  className={clsx(classes.item, classes.itemSuccess)}
                  key={index}
                >
                  <CircleCheck />
                  <Typography variant="subtitle1">
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                  </Typography>
                </div>
              );
            } else {
              return (
                <div className={classes.item} key={index}>
                  <div className={classes.number}>
                    <Typography color="white" variant="body2">
                      {index + 1}
                    </Typography>
                  </div>
                  <Typography color="primary-main" variant="subtitle1">
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                  </Typography>
                </div>
              );
            }
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

Prerequisite.propTypes = {
  data: PropTypes.array.isRequired,
  isHaveError: PropTypes.bool.isRequired,
};

export default Prerequisite;
