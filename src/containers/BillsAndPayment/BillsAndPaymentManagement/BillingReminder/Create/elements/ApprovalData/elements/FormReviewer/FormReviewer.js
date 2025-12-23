import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography/Typography';
import { TextField, AutoComplete } from '@components/FormField';
import { Box } from '@legion-ui/core';
import DraggableIcon from '@assets/icon-v2/Draggable';
import useAction from './hooks/useAction';

const FormReviewer = (props) => {
  const { field, provided, index, control } = props;
  const { listReviewerName, loadingListReviewer, onAutoComplete } =
    useAction(props);

  return (
    <Grid container spacing={2}>
      <Grid item lg={2} xs={12}>
        <Box mt={'2px'} style={{ display: 'flex', gap: '8px' }}>
          {field.isEdit && (
            <div {...provided.dragHandleProps}>
              <DraggableIcon fontSize="small" />
            </div>
          )}
          <Typography color="general-mid" variant="body1">
            Reviewer {index + 1}
          </Typography>
        </Box>
      </Grid>
      <Grid item lg={2} sm={3} xs={12}>
        <AutoComplete
          control={control}
          label="Name"
          loading={loadingListReviewer}
          maxLength={60}
          inputProps={{
            maxLength: 60,
          }}
          name={`reviewer.${index}.name`}
          required
          disabled={!field?.isEdit}
          options={listReviewerName}
          customOnChange={(v) => onAutoComplete(index, v)}
          disableFilterOptions
          allowSelectSameValue
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
          disabled={!field?.isEdit}
          // shouldUnregister
        />
      </Grid>
      <Grid item lg={2} sm={3} xs={12}>
        <TextField
          control={control}
          label="Phone Number"
          maxLength={15}
          name={`reviewer.${index}.phoneNumber`}
          required
          disabled={!field.isEdit}
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
          disabled={!field?.isEdit}
          // shouldUnregister
        />
      </Grid>
    </Grid>
  );
};

FormReviewer.propTypes = {
  field: PropTypes.object.isRequired,
  provided: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  control: PropTypes.any.isRequired,
  onAutoComplete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
};

export default FormReviewer;
