import Download from '@assets/icon-v2/Download';
import Button from '@components/Button';
import ButtonMinimal from '@components/ButtonMinimal';
import FileUpload from '@components/FileUpload';
import { TextField } from '@components/FormField';
import Stepper from '@components/Stepper';
import Typography from '@components/Typography';
import { postUploadFile } from '@containers/BillsAndPayment/Settlement/_repositories/repositories';
import { Box, Dialog, Divider, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { label } from './utils';

const ValidationAndSendMOM = (props) => {
  const {
    control,
    generateLoading,
    handleSubmit,
    momDocument,
    onCancel,
    onDownloadRawMom,
    onPrevious,
    onSendDocument,
    onSubmitValidation,
    open,
    setMomDocument,
    settlementId,
    step,
    customerFields,
    onAddCustomer,
    onDeleteCustomer,
  } = useAction(props);

  const classes = useStyles({ step });

  const { title, subTitle } = label(step);

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open={open}
      scroll="body"
    >
      <Box className={classes.container}>
        <Box sx={{ width: 310 }}>
          <Typography inline variant="h5" weight="medium">
            {title}
          </Typography>
          <Typography color="general-mid" variant="caption">
            {subTitle}
          </Typography>
        </Box>
        <Box sx={{ mt: 3, px: 6 }}>
          <Stepper
            active={step - 1}
            steps={['Signature Validation', 'Download & Upload MOM']}
            variant="number"
          />
        </Box>
      </Box>
      {step === 1 && (
        <>
          <Box mt={3}>
            {customerFields.map((field, index) => (
              <Fragment key={field.id}>
                <Grid container spacing={2}>
                  <Grid item lg={2} xs={12}>
                    <Box mt={2}>
                      <Typography color="general-mid" variant="body1">
                        Customer {index + 1}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item lg={2} sm={3} xs={12}>
                    <TextField
                      control={control}
                      label="Customer Name"
                      maxLength={60}
                      name={`customerSign.${index}.customerName`}
                      required
                      // shouldUnregister
                    />
                  </Grid>
                  <Grid item lg={2} sm={3} xs={12}>
                    <TextField
                      control={control}
                      label="Customer Position"
                      maxLength={60}
                      name={`customerSign.${index}.customerPosition`}
                      required
                      // shouldUnregister
                    />
                  </Grid>
                  <Grid item lg={2} sm={3} xs={12}>
                    <TextField
                      control={control}
                      label="Email"
                      maxLength={60}
                      name={`customerSign.${index}.email`}
                      required
                      // shouldUnregister
                    />
                  </Grid>
                  <Grid item lg={2} sm={3} xs={12}>
                    <TextField
                      control={control}
                      label="Phone Number"
                      maxLength={60}
                      name={`customerSign.${index}.phoneNumber`}
                      required
                      // shouldUnregister
                    />
                  </Grid>
                </Grid>
                {(index < customerFields.length - 1 || index === 4) && (
                  <Box mt={4}>
                    <Grid alignItems="center" container>
                      <Grid item xs={10}>
                        <div className={classes.dashed} />
                      </Grid>
                      <Grid item xs={2}>
                        <ButtonMinimal
                          label="delete customer"
                          onClick={onDeleteCustomer(index)}
                          variant="delete"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Fragment>
            ))}
            {customerFields.length < 5 && (
              <Box mt={4}>
                <Grid alignItems="center" container>
                  <Grid item xs={10}>
                    <div className={classes.dashed} />
                  </Grid>
                  <Grid item xs={2}>
                    <ButtonMinimal
                      label="add customer"
                      onClick={onAddCustomer}
                      variant="add"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button onClick={onCancel} variant="ghost">
              Cancel
            </Button>
            <div className={classes.actionDivider} />
            <Button
              loading={generateLoading}
              onClick={handleSubmit(onSubmitValidation)}
            >
              Next
            </Button>
          </Box>
        </>
      )}
      {step === 2 && (
        <Box className={classes.container}>
          <Box sx={{ width: 310 }}>
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                leftIcon={Download}
                onClick={onDownloadRawMom}
                variant="ghost"
              >
                MOM-DOCUMENT.doc
              </Button>
            </Box>
            <Divider />
            <Box sx={{ width: 310, my: 2 }}>
              <Typography inline variant="h5" weight="medium">
                Then Upload MOM Document
              </Typography>
              <Typography color="general-mid" variant="caption">
                Last step, please upload MOM document that you’ve been signed,
                then send it to the Customer
              </Typography>
            </Box>
            <FileUpload
              accept={['.pdf']}
              fetcher={postUploadFile(settlementId)}
              helperText="Upload .pdf document, max 5 MB "
              maxSize={5242880}
              onChange={setMomDocument}
              placeholder="Example: mom-document.pdf"
              value={momDocument}
            />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <Button onClick={onCancel} variant="ghost">
              Cancel
            </Button>
            <div className={classes.actionDivider} />
            <Button onClick={onPrevious} variant="ghost">
              Previous
            </Button>
            <Button disabled={!momDocument} ml={16} onClick={onSendDocument}>
              Send Document
            </Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default ValidationAndSendMOM;
