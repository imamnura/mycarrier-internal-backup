import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import useActions from './hooks/useActions';
import {
  TextField,
  RadioGroup,
  AutoComplete,
  FileUpload,
} from '@components/FormField';
import ArrowDown from '@assets/Svg/ArrowDown';

const EmptyBakes = (props) => {
  const { content, useNote } = props;
  const {
    control,
    formState: { isValid, isDirty },
    handleSubmit,
    handleUpdateStatus,
    loadingOptionBakes,
    onClose,
    optionsBakesNumber,
    watch,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={content}>
      <form onSubmit={handleSubmit(handleUpdateStatus)}>
        <Grid container style={{ padding: '0.5rem 1.5rem' }}>
          <Grid align="center" item xs={12}>
            <Typography
              children="BAKES document"
              variant="h5"
              weight="medium"
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Typography
              children="Please select or upload BAKES file"
              color="general-mid"
              variant="caption"
              weight="normal"
            />
          </Grid>
          <Grid item style={{ paddingTop: '1.5rem' }} xs={12}>
            <RadioGroup
              alignItems="flex-start"
              control={control}
              name="radioBakes"
              options={[
                {
                  label: (
                    <Grid container spacing={1} style={{ marginBottom: 16 }}>
                      <Grid item xs={12}>
                        <Typography
                          children="Select BAKES"
                          variant="subtitle1"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <AutoComplete
                          control={control}
                          disabled={watch('radioBakes') !== '1'}
                          label="BAKES Number"
                          loading={loadingOptionBakes}
                          name="bakesNumberAuto"
                          options={optionsBakesNumber.map((v) => v.bakesNumber)}
                          required
                          rightAdornment={ArrowDown}
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
                        <Typography
                          children="Upload New BAKES File"
                          variant="subtitle1"
                        />
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
          {useNote && (
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  label="Please describe the note.."
                  maxLength={1000}
                  minRows={3}
                  multiline
                  name="noteProgress"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="general-mid"
                  variant="caption"
                  weight="normal"
                >
                  Once you approved this, it will be process and data will be
                  sent to customer automatically.
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid
            container
            item
            justifyContent="center"
            pt={2}
            spacing={2}
            style={{ paddingTop: '1.5rem' }}
          >
            <Grid item>
              <Button children="CANCEL" onClick={onClose} variant="ghost" />
            </Grid>
            <Grid item>
              <Button
                children="SUBMIT"
                disabled={!isValid || !isDirty}
                type="submit"
              />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

EmptyBakes.defaultProps = {
  content: null,
  useNote: true,
};

EmptyBakes.propTypes = {
  content: PropTypes.object,
  useNote: PropTypes.bool,
};

export default EmptyBakes;
