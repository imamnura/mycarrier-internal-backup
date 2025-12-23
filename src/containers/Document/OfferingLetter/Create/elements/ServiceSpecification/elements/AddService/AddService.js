import Button from '@components/Button';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './styles';
import { RadioGroup, Select, TextField } from '@components/FormField';
import useAction from './hooks/useAction';
import FormManual from '../FormManual';
import FormAuto from '../FormAuto';
import LoadingBar from '@components/LoadingBar';

const AddService = (props) => {
  const { onClose, type } = props;

  const {
    control,
    currentFormData,
    formBuilder,
    loadingForm,
    loadingSubmit,
    onSubmit,
    optionService,
    setValue,
  } = useAction(props);

  const { dialogRoot } = useStyles();

  return (
    !!type && (
      <Dialog classes={{ paper: dialogRoot }} open scroll="body">
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            Add service
          </Typography>
          <Typography color="general-mid" variant="caption">
            Filling data each service
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Select
              control={control}
              isDisabled={type !== 'new'}
              isSearchable
              label="Service Name"
              maxWidth="100%"
              menuPosition="fixed"
              name="serviceName"
              options={optionService}
              rawValue
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              label="SLG (%)"
              name="slg"
              required
              rules={{
                required: 'SLG (%) is a required field',
                min: {
                  message: 'SLG (%) must be greater than or equal to 0',
                  value: 0,
                },
                max: {
                  message: 'SLG (%) must be lower than or equal to 100',
                  value: 100,
                },
              }}
              type="number"
            />
          </Grid>
          {loadingForm ? (
            <Grid item xs={12}>
              <LoadingBar loading />
            </Grid>
          ) : (
            <>
              {currentFormData?.serviceName?.data?.epicProduct &&
                !formBuilder.type && (
                  <Grid item xs={10}>
                    <RadioGroup
                      control={control}
                      direction="horizontal"
                      label="Price"
                      name="price"
                      options={[
                        { label: 'Auto Price', value: 'auto' },
                        { label: 'Manual Price', value: 'manual' },
                      ]}
                      required
                    />
                  </Grid>
                )}
              {currentFormData.price === 'manual' && (
                <Grid item xs={12}>
                  <FormManual builder={formBuilder.form} control={control} />
                </Grid>
              )}
              {currentFormData.price === 'auto' && (
                <Grid item xs={12}>
                  <FormAuto
                    builder={formBuilder.form}
                    control={control}
                    serviceName={currentFormData.serviceName}
                    setValue={setValue}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
        <Grid
          component={Box}
          container
          justifyContent="center"
          spacing={2}
          sx={{ width: '100%', padding: 16 }}
        >
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              disabled={
                !currentFormData.price || !currentFormData?.serviceName?.label
              }
              loading={loadingSubmit}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    )
  );
};

AddService.defaultProps = {
  allData: [],
  defaultValues: undefined,
  type: '',
};

AddService.propTypes = {
  allData: PropTypes.array,
  defaultValues: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default AddService;
