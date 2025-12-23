import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import HeaderAndFilter from '../HeaderAndFilter';
import useStyles from './styles';
import clsx from 'clsx';

const Create = (props) => {
  const { action, breadcrumb, children, stepperTab, loading } = props;

  const classes = useStyles();

  return (
    <>
      <HeaderAndFilter
        action={!loading ? action : []}
        breadcrumb={breadcrumb}
        loading={loading}
      />
      <div className={classes.headerContainer}>
        {stepperTab && (
          <>
            <Box pt={3} />
            {stepperTab}
          </>
        )}
      </div>
      {!loading && (
        <Box
          className={clsx({
            [classes.contentContainer]: !stepperTab,
          })}
          pb={4}
          px={5}
        >
          {children}
        </Box>
      )}
    </>
  );
};

Create.defaultProps = {
  action: [],
  breadcrumb: [],
  loading: false,
  stepperTab: null,
};

Create.propTypes = {
  action: PropTypes.array,
  breadcrumb: PropTypes.array,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  stepperTab: PropTypes.node,
};

export default Create;
