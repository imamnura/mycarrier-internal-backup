import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import Stepper from '@components/Stepper';
import { Controller } from 'react-hook-form';
import useAction from './hooks/useAction';
import Button from '@components/Button';
import useStyles from '../../styles';
import SalesTeamPicker from '@containers/LeadManagmentSystem/Dashboard/_elements/SalesTeamPicker';

const PickSalesTeam = (props) => {
  const { onClose, isEdit } = props;
  const { control, onSubmit, onPrevious, disabled, handleSubmit } =
    useAction(props);

  const classes = useStyles();

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Please assign this lead
        </Typography>
        <Typography color="general-mid" variant="caption">
          {' '}
          Then, type Sales Team’s name or NIK that you want to assign{' '}
        </Typography>
      </Box>
      <Box my={3}>
        <Stepper
          active={2}
          steps={['Company Validation', 'Choose Option', 'Fill Option Data']}
          variant="number"
        />
      </Box>
      <Box sx={{ maxHeight: '10%', overflow: 'hidden' }}>
        <Controller
          control={control}
          name="amMapping"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <Box sx={{ textAlign: 'center', mb: 1 }}>
                {error?.type !== 'min' && (
                  <Typography color="primary-main" variant="body2">
                    {error?.message}
                  </Typography>
                )}
              </Box>
              <SalesTeamPicker
                isPopup={true}
                onChange={onChange}
                value={value}
              />
            </>
          )}
        />
      </Box>
      <Grid
        component={Box}
        container
        justifyContent="center"
        spacing={2}
        sx={{ width: '100%', padding: 16, pt: 4 }}
      >
        <Grid item>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </Grid>
        <div className={classes.actionDivider} />
        {!isEdit && (
          <Grid item>
            <Button onClick={onPrevious} variant="ghost">
              Previous
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button disabled={disabled} onClick={handleSubmit(onSubmit)}>
            {' '}
            {isEdit ? 'Reassign' : 'Assign'}{' '}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

PickSalesTeam.defaultProps = {
  isEdit: false,
  setActiveTab: () => {},
};

PickSalesTeam.propTypes = {
  isEdit: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func,
};

export default PickSalesTeam;
