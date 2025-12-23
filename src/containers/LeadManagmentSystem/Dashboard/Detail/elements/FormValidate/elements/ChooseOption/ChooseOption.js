import React from 'react';
import Typography from '@components/Typography';
import { Box, Grid } from '@material-ui/core';
import Stepper from '@components/Stepper';
import { Controller } from 'react-hook-form';
import useAction from './hooks/useAction';
import Button from '@components/Button';
import useStyles from '../../styles';
import OptionList from '@components/OptionList';

const ChooseOption = (props) => {
  const { control, onSubmit, handleSubmit, onPrevious, onClose, option } =
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
          Second, choose option below for mapping this lead
        </Typography>
      </Box>
      <Box my={3}>
        <Stepper
          active={1}
          steps={['Company Validation', 'Choose Option', 'Fill Option Data']}
          variant="number"
        />
      </Box>
      <Box>
        <Controller
          control={control}
          name="validBy"
          render={({ field: { ...res }, fieldState: { error } }) => {
            return (
              <>
                <Box sx={{ mb: 1 }} textAlign="center">
                  <Typography color="primary-main" variant="body2">
                    {error?.message}
                  </Typography>
                </Box>
                <Box>
                  <OptionList redBorder={true} {...res} options={option} />
                </Box>
              </>
            );
          }}
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
        <Grid item>
          <Button onClick={onPrevious} variant="ghost">
            Previous
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSubmit(onSubmit)}> Next </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChooseOption;
