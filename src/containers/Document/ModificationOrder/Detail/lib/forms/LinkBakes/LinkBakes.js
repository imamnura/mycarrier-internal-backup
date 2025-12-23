import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Dialog from '@__old/components/elements/Dialog';
import Button from '@components/Button';
import Typography from '@components/Typography';
import {
  TextField,
  RadioGroup,
  FileUpload,
  Select,
} from '@components/FormField';
import useActions from './hooks/useActions';
import Attachment from '@components/Attachment';

export default function Component(props) {
  const { modalLinkBakes } = props;

  const {
    control,
    formState: { isValid, isDirty },
    handleUpdateStatus,
    handleSubmit,
    onClose,
    step,
    setStep,
    chooseBakes,
    onClickCrateBAKES,
    // typeBakes,
    bakesOptions,
    loadingBakesOptions,
    BAKESName,
  } = useActions(props);

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalLinkBakes}>
      <Grid container spacing={2} style={{ padding: '16px 24px' }}>
        <Grid align="center" item xs={12}>
          <Typography variant="h5" weight="medium">
            Link BAKES
          </Typography>
        </Grid>
        <Grid align="center" item xs={12}>
          <Typography variant="caption" weight="normal">
            Please choose the suitable BAKES
          </Typography>
        </Grid>
        {step === 0 && (
          <Grid item xs={12}>
            <RadioGroup
              control={control}
              name="chooseBakes"
              options={[
                { label: 'Choose form available BAKES', value: 'existing' },
                { label: 'Upload New BAKES File', value: 'upload' },
                { label: 'Create New BAKES File', value: 'create' },
              ]}
              required
            />
          </Grid>
        )}
        {chooseBakes === 'existing' && step === 1 && (
          <>
            <Grid item xs={12}>
              <RadioGroup
                control={control}
                name="typeBakes"
                options={[
                  {
                    label: 'Existing Customer BAKES',
                    value: 'Existing Customer BAKES',
                  },
                  { label: 'From BAKES Module', value: 'From BAKES Module' },
                ]}
                required
                shouldUnregister
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                control={control}
                fullWidth
                // isDisabled={!typeBakes || loadingBakesOptions}
                isLoading={loadingBakesOptions}
                label="BAKES Name"
                name="BAKESName"
                // options={bakesOptions}
                options={[{ label: 'labelllll', value: 'y' }]}
                placeholder="Choose BAKES Name"
                required
              />
            </Grid>
            {BAKESName && (
              <Grid item xs={12}>
                <Attachment
                  {...bakesOptions.find((i) => i.value === BAKESName)?.document}
                />
              </Grid>
            )}
          </>
        )}
        {chooseBakes === 'upload' && step === 1 && (
          <>
            <Grid item xs={12}>
              <TextField
                control={control}
                label="BAKES Number"
                maxLength={40}
                name="BAKESNumber"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FileUpload
                accept={['.pdf']}
                control={control}
                helperText="Upload .pdf document here, max 5 MB "
                maxSize={5242880}
                name="media"
                placeholder="Example: filename.pdf"
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container item justifyContent="center" pt={2} spacing={2}>
        <Grid item>
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
        </Grid>
        <Grid item>
          {step === 0 ? (
            <Button
              disabled={!chooseBakes || !isDirty}
              onClick={
                chooseBakes === 'create' ? onClickCrateBAKES : () => setStep(1)
              }
            >
              CONTINUE
            </Button>
          ) : (
            <Button
              disabled={!isValid || !isDirty}
              onClick={handleSubmit(handleUpdateStatus)}
              type="submit"
            >
              SUBMIT
            </Button>
          )}
        </Grid>
      </Grid>
    </Dialog>
  );
}

Component.defaultProps = {
  modalLinkBakes: null,
};

Component.propTypes = {
  modalLinkBakes: PropTypes.object,
};
