import React from 'react';
import Create from '@fragments/Create';
import { Box, Divider, Grid } from '@material-ui/core';
import useAction from './hooks/useAction';
import Typography from '@components/Typography';
import PropTypes from 'prop-types';
import { breadcrumb } from '../../utils';
import Stepper from '@components/Stepper/Stepper';
import Journey from './../privilege/journey';
import useStyles from '../../styles';

const ChoosePrivilege = (props) => {
  const { loading } = props;
  const { onCancel, onPrevious, onSubmit, listPrivilege, getJourney, roleId } =
    useAction(props);

  const classes = useStyles();

  const renderPrivilege = () => {
    return (
      listPrivilege.length > 0 &&
      listPrivilege.map((journey, i) => (
        <div key={i} style={{ display: 'inline-block', width: '100%' }}>
          <Journey
            classes={classes}
            getJourney={getJourney}
            journey={journey}
          />
        </div>
      ))
    );
  };

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          variant: 'ghost',
          onClick: onCancel,
        },
        {
          children: 'Previous',
          disabled: false,
          onClick: onPrevious,
        },
        {
          children: 'Save',
          disabled: false,
          onClick: onSubmit,
        },
      ]}
      breadcrumb={breadcrumb(roleId)}
      loading={loading}
      stepperTab={
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2, mb: 1 }}>
            <Box sx={{ width: 200 }}>
              <Stepper
                active={1}
                steps={['Role Profile', 'Choose Privilege']}
                variant="number"
              />
            </Box>
          </Box>
          <Divider />
        </>
      }
    >
      <Grid
        container
        direction="column"
        style={{
          padding: '24px 32px',
          borderRadius: '8px',
          backgroundColor: '#fff',
          marginTop: '20px',
        }}
      >
        <Box pb={4}>
          <Typography color="general-mid" variant="h4" weight="medium">
            Privilege
          </Typography>
        </Box>
        <div
          style={{
            columnCount: 2,
            columnGap: '1em',
          }}
        >
          {renderPrivilege()}
        </div>
      </Grid>
    </Create>
  );
};

ChoosePrivilege.defaultProps = {
  classes: {},
};

ChoosePrivilege.propTypes = {
  classes: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export default ChoosePrivilege;
