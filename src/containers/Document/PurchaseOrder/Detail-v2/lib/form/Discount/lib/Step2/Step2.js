import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import { TextField, RadioGroup } from '@components/FormField';
import { Divider, Grid } from '@material-ui/core';

const Component = (props) => {
  const { control, watch } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RadioGroup
          alignItems="flex-start"
          control={control}
          name="radioApproval"
          options={[
            {
              label: (
                <Grid container spacing={1} style={{ marginBottom: 16 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Input discount and need GM Segment approval
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      control={control}
                      disabled={watch('radioApproval') !== '1'}
                      label="Discount (%)"
                      maxLength={3}
                      name="discount"
                      required
                      type="number"
                    />
                    {/* <TextFieldMasked
                      control={control}
                      label="Discount (%)"
                      maskType="currency"
                      maxLength={3}
                      name="discount"
                      required
                      rules={{
                        required: 'Discount is a required field'
                      }}
                    /> */}
                  </Grid>
                </Grid>
              ),
              value: '1',
            },
            {
              label: 'Auto approval without discount price',
              value: '2',
            },
          ]}
          required
        />
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <TextField
          control={control}
          label="Note"
          maxLength={1000}
          minRows={3}
          multiline
          name="noteProgress"
          placeholder="Please describe the note.."
          required
        />
      </Grid>
    </Grid>
  );
};

Component.propTypes = {
  control: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
};

export default Component;
