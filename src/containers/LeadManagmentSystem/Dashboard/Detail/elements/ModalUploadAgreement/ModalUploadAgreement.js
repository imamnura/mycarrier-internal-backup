import Button from '@components/Button';
import FileUpload from '@components/FileUpload';
import { TextField, TextFieldMasked } from '@components/FormField';
import Stepper from '@components/Stepper';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { label } from './utils';

const ModalUploadAgreement = (props) => {
  const {
    show,
    step,
    control,
    handleSubmit,
    onClose,
    onPrevious,
    onNext,
    onSubmit,
    agreementDoc,
    setAgreementDoc,
  } = useAction(props);

  const classes = useStyles();

  const { title, subTitle } = label(step);

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={show}>
      <Box sx={{ width: 320 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            textAlign: 'center',
            width: 310,
          }}
        >
          <Typography variant="h5" weight="medium">
            {title}
          </Typography>
          <Typography color="general-mid" variant="caption">
            {subTitle}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, px: 4 }}>
          <Stepper
            active={step - 1}
            steps={['Upload Agreement Document', 'Fill Agreement Revenue']}
            variant="number"
          />
        </Box>
      </Box>
      {step === 1 && (
        <>
          <Box sx={{ width: 320 }}>
            <FileUpload
              accept={['.pdf']}
              control={control}
              helperText="Upload .pdf document, max 5 MB "
              maxSize={5242880}
              onChange={setAgreementDoc}
              placeholder="Example: agreement-document.pdf"
              value={agreementDoc}
            />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <div className={classes.actionDivider} />
            <Button disabled={!agreementDoc} onClick={onNext}>
              Next
            </Button>
          </Box>
        </>
      )}
      {step === 2 && (
        <>
          <Box sx={{ width: 320 }}>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    control={control}
                    disabled
                    label="Product"
                    name="product"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldMasked
                    control={control}
                    label="Revenue"
                    maskType="currency"
                    name="revenue"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    control={control}
                    label="Subscription Period (Month)"
                    name="subscriptionPeriod"
                    required
                    type="number"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <div className={classes.actionDivider} />
            <Button onClick={onPrevious} variant="ghost">
              Previous
            </Button>
            <Button ml={16} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default ModalUploadAgreement;
