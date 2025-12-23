import Account from '@assets/icon-v2/Account';
import Button from '@components/Button';
import ButtonMinimal from '@components/ButtonMinimal';
import { Select, TextField } from '@components/FormField';
import OptionList from '@components/OptionList';
import Typography from '@components/Typography';
import { Box, Dialog, Grid } from '@material-ui/core';
import React, { Fragment } from 'react';
import EditNDE from '../EditNDE';
import useAction from './hooks/useAction';
import useStyles from './styles';

const SendNDE = (props) => {
  const {
    approvalType,
    control,
    edit,
    handleSubmit,
    loadingGenerate,
    managerPositionOption,
    onAddRecipient,
    onCancel,
    onDeleteReviewer,
    onSubmit,
    onSubmitEdit,
    onSubmitType,
    open,
    reviewerFields,
    setEdit,
    setType,
    type,
    recepientCC,
    onAddCC,
    fetchDeleteCC,
  } = useAction(props);

  const classes = useStyles({ approvalType });

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogRoot }}
        maxWidth="lg"
        open={open}
        scroll="body"
      >
        {!approvalType ? (
          <>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h5" weight="medium">
                Choose reviewer approval type
              </Typography>
            </Box>
            <OptionList
              onChange={setType}
              options={[
                {
                  Icon: Account,
                  label: 'Including Reviewer',
                  description:
                    'Fill reviewer data first then they will get microsite approval',
                  value: '1',
                },
                {
                  Icon: Account,
                  label: 'Without Reviewer',
                  description: 'Reviewer will not get approval',
                  value: '2',
                },
              ]}
              value={type}
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 16,
              }}
            >
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
              <Button loading={loadingGenerate} onClick={onSubmitType}>
                go ahead
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" weight="medium">
                Input NDE Data
              </Typography>
              <Box sx={{ maxWidth: 560 }}>
                <Typography color="general-mid" variant="caption">
                  First step, please make a validation of Customer data that
                  will mark a signature on Customer column, then input reviewer
                  list
                </Typography>
              </Box>
            </Box>
            <Box width="100%">
              <Box pb={4} pt={5}>
                <Typography color="general-mid" variant="h4" weight="medium">
                  Account Manager
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <Box mt={2}>
                    <Typography color="general-mid" variant="body1">
                      AM Reviewer
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    control={control}
                    label="Name"
                    maxLength={60}
                    name={`accountManager.name`}
                    required
                    // shouldUnregister
                  />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                  <TextField
                    control={control}
                    label="Phone Number"
                    maxLength={60}
                    name={`accountManager.phoneNumber`}
                    required
                    // shouldUnregister
                  />
                </Grid>
              </Grid>
              <Box pb={4} pt={5}>
                <Typography color="general-mid" variant="h4" weight="medium">
                  General Manager
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={2} xs={12}>
                  <Box mt={2}>
                    <Typography color="general-mid" variant="body1">
                      General Manager
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={8} sm={12} xs={12}>
                  <Select
                    control={control}
                    label="General Manager Position"
                    maxWidth="100%"
                    menuPosition="fixed"
                    name="generalManager"
                    options={managerPositionOption}
                    rawValue
                    required
                    // shouldUnregister
                    staticWidth={240}
                    variant="secondary"
                  />
                </Grid>
              </Grid>
            </Box>
            {approvalType == '1' && (
              <>
                <Box pb={4} pt={5}>
                  <Typography color="general-mid" variant="h4" weight="medium">
                    Reviewer
                  </Typography>
                </Box>
                {reviewerFields.map((field, index) => (
                  <Fragment key={field.id}>
                    <Grid container spacing={2}>
                      <Grid item lg={2} xs={12}>
                        <Box mt={2}>
                          <Typography color="general-mid" variant="body1">
                            Reviewer {index + 1}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item lg={2} sm={3} xs={12}>
                        <TextField
                          control={control}
                          label="Name"
                          maxLength={60}
                          name={`reviewer.${index}.name`}
                          required
                          // shouldUnregister
                        />
                      </Grid>
                      <Grid item lg={2} sm={3} xs={12}>
                        <TextField
                          control={control}
                          label="Job Title"
                          maxLength={60}
                          name={`reviewer.${index}.position`}
                          required
                          // shouldUnregister
                        />
                      </Grid>
                      <Grid item lg={2} sm={3} xs={12}>
                        <TextField
                          control={control}
                          label="Phone Number"
                          maxLength={60}
                          name={`reviewer.${index}.phoneNumber`}
                          required
                          // shouldUnregister
                        />
                      </Grid>
                      <Grid item lg={2} sm={3} xs={12}>
                        <TextField
                          control={control}
                          label="Email"
                          maxLength={60}
                          name={`reviewer.${index}.email`}
                          required
                          // shouldUnregister
                        />
                      </Grid>
                    </Grid>
                    {(index < reviewerFields.length - 1 || index === 4) && (
                      <Box mt={4}>
                        <Grid alignItems="center" container>
                          <Grid item xs={10}>
                            <div className={classes.dashed} />
                          </Grid>
                          <Grid item xs={2}>
                            <ButtonMinimal
                              label="delete reviewer"
                              onClick={onDeleteReviewer(index)}
                              variant="delete"
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Fragment>
                ))}
                {reviewerFields.length < 5 && (
                  <Box mt={4}>
                    <Grid alignItems="center" container>
                      <Grid item xs={10}>
                        <div className={classes.dashed} />
                      </Grid>
                      <Grid item xs={2}>
                        <ButtonMinimal
                          label="add reviewer"
                          onClick={onAddRecipient}
                          variant="add"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </>
            )}
            <Box pb={4} pt={5}>
              <Typography color="general-mid" variant="h4" weight="medium">
                CC
              </Typography>
            </Box>
            {recepientCC?.map((data, i) => (
              <Fragment key={i}>
                <Grid alignItems="center" container key={`cc${i}`}>
                  <Grid item xs={2}>
                    <Typography color="general-mid" variant="body1">
                      CC {i + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography
                      color="general-main"
                      variant="body1"
                      weight="medium"
                    >
                      {data}
                    </Typography>
                  </Grid>
                </Grid>
                {i > 3 && (
                  <Grid alignItems="center" container>
                    <Grid item xs={10}>
                      <div className={classes.dashed} />
                    </Grid>
                    <Grid item xs={2}>
                      <ButtonMinimal
                        label="delete CC"
                        onClick={fetchDeleteCC(data)}
                        variant="delete"
                      />
                    </Grid>
                  </Grid>
                )}
              </Fragment>
            ))}
            <Box>
              <Grid alignItems="center" container>
                <Grid item xs={10}>
                  <div className={classes.dashed} />
                </Grid>
                <Grid item xs={2}>
                  <ButtonMinimal
                    label="add cc"
                    onClick={onAddCC}
                    variant="add"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 16,
              }}
            >
              <Button onClick={onCancel} variant="ghost">
                Cancel
              </Button>
              <Button
                loading={loadingGenerate}
                onClick={handleSubmit(onSubmit)}
              >
                generate nde
              </Button>
            </Box>
          </>
        )}
      </Dialog>
      <EditNDE
        onClose={setEdit({ open: false })}
        onSubmit={onSubmitEdit}
        open={edit.open}
        template={edit.template}
      />
    </>
  );
};

export default SendNDE;
