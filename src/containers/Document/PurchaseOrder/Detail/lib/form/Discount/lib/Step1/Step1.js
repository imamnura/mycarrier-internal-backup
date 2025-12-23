import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@components/Typography';
import {
  TextField,
  RadioGroup,
  AutoComplete,
  FileUpload,
} from '@components/FormField';
import { Grid } from '@material-ui/core';

const Component = (props) => {
  const { control, watch, optionsBakesNumber } = props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <RadioGroup
          alignItems="flex-start"
          control={control}
          name="radioBakes"
          options={[
            {
              label: (
                <Grid container spacing={1} style={{ marginBottom: 16 }}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Select BAKES</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AutoComplete
                      control={control}
                      disabled={watch('radioBakes') !== '1'}
                      label="BAKES Number"
                      maxLength={27}
                      name="bakesNumberAuto"
                      options={optionsBakesNumber.map((v) => v.bakesNumber)}
                      required
                    />
                  </Grid>
                </Grid>
              ),
              value: '1',
            },
            {
              label: (
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Upload New BAKES File
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FileUpload
                      accept={['.pdf']}
                      control={control}
                      disabled={watch('radioBakes') !== '2'}
                      helperText="Upload .pdf document, max 5 MB "
                      maxSize={5242880}
                      name="media"
                      placeholder="Example: bakes.pdf"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      control={control}
                      disabled={watch('radioBakes') !== '2'}
                      label="BAKES Number"
                      maxLength={27}
                      name="bakesNumber"
                      required
                    />
                  </Grid>
                </Grid>
              ),
              value: '2',
            },
          ]}
          required
        />
      </Grid>
    </Grid>
  );
};

Component.propTypes = {
  control: PropTypes.object.isRequired,
  optionsBakesNumber: PropTypes.array.isRequired,
  watch: PropTypes.func.isRequired,
};

export default Component;
