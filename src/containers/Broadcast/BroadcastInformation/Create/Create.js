import React from 'react';
import PropTypes from 'prop-types';
import { route } from '@configs';
import Create from '@fragments/Create';
import {
  DateTimePicker,
  Select,
  TextField,
  Switch,
  FileUpload,
} from '@components/FormField';
import useAction from './hooks/useAction';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import { postUploadFile } from '../_repositories/repositories';
import useStyles from './styles';
import MessagePreview from '../_elements/MessagePreview';
import Card from '@components/Card/Card';

const BroadcastInformationCreate = (props) => {
  const {
    control,
    handleSubmit,
    isSendNow,
    loading,
    loadingContactGroup,
    media,
    onSubmit,
    optionContactGroup,
    paragraph1,
    paragraph2,
    paragraph3,
    remainingParagraphLength,
    scheduleTime,
  } = useAction(props);

  const classes = useStyles();
  return (
    <Create
      action={[
        {
          children: 'Save as draft',
          onClick: handleSubmit(onSubmit('draft')),
          variant: 'ghost',
        },
        {
          children: 'Submit',
          onClick: handleSubmit(onSubmit('submit')),
        },
      ]}
      breadcrumb={[
        {
          label: 'Broadcast Information',
          url: route.broadcastInformation('list'),
        },
        { label: 'Create Broadcast' },
      ]}
      loading={loading}
    >
      <Grid container spacing={3} style={{ marginTop: -24 }}>
        <Grid item md xs={12}>
          <Card title="General Settings">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  label="Broadcast Name"
                  maxLength={80}
                  name="broadcastName"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  control={control}
                  fullWidth
                  isLoading={loadingContactGroup}
                  isMulti
                  label="Contact Group"
                  maxWidth={300}
                  name="contactGroup"
                  options={optionContactGroup}
                  placeholder="Choose Contact Group"
                  required
                />
              </Grid>
              <Grid alignItems="center" container item spacing={1} xs={12}>
                <Grid item>
                  <Typography color="general-mid">
                    Do you want sent broadcast information right now?
                  </Typography>
                </Grid>
                <Grid item>
                  <Switch control={control} name="isSendNow" />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.dateTimeWrapper}>
                    <DateTimePicker
                      control={control}
                      disabled={isSendNow}
                      label="Select Date"
                      minDateTime={new Date().toJSON()}
                      name="schedule"
                      required
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <FileUpload
                    accept={['.jpg', '.png', '.pdf']}
                    control={control}
                    fetcher={postUploadFile}
                    helperText="Upload .png, .jpg, or .pdf image, max 2 MB "
                    label="Upload Media"
                    maxSize={2097152}
                    name="media"
                    placeholder="Example: image.png"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Card>
          <Card title="Broadcast Message" style={{ marginTop: 24 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  disabled={!remainingParagraphLength.paragraph1}
                  label="Paragraph 1"
                  maxLength={remainingParagraphLength.paragraph1}
                  minRows={4}
                  multiline
                  name="paragraph1"
                  required
                  valueLength={paragraph1?.length}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  disabled={!remainingParagraphLength.paragraph2}
                  label="Paragraph 2"
                  maxLength={remainingParagraphLength.paragraph2}
                  minRows={4}
                  multiline
                  name="paragraph2"
                  valueLength={paragraph2?.length}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  control={control}
                  disabled={!remainingParagraphLength.paragraph3}
                  label="Paragraph 3"
                  maxLength={remainingParagraphLength.paragraph3}
                  minRows={4}
                  multiline
                  name="paragraph3"
                  valueLength={paragraph3?.length}
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md="auto" xs={12}>
          <Card title="Message Preview">
            <div className={classes.previewWrapper}>
              <MessagePreview
                media={media}
                message={[paragraph1, paragraph2, paragraph3]}
                time={scheduleTime}
              />
            </div>
          </Card>
        </Grid>
      </Grid>
    </Create>
  );
};

BroadcastInformationCreate.propTypes = {
  feature: PropTypes.array.isRequired,
};

export default BroadcastInformationCreate;
