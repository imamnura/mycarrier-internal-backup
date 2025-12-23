import React, { useState } from 'react';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import SalesTeamPicker from './SelectAM';
import useStyles from '../../styles';

const AddAMDialog = ({ handleAssign, currentData }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const classes = useStyles();

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleSubmit = () => {
    // doing selected things
    handleAssign(selected);
    onClose();
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      {' '}
      <Grid container justifyContent="center">
        <Button onClick={() => setOpen(!open)}> ADD AM </Button>
      </Grid>
      <Dialog classes={{ paper: classes.dialogRoot }} open={open}>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '24px',
          }}
        >
          <Typography color="general-dark" inline variant="h5" weight="medium">
            Search AM
          </Typography>
          <Typography color="general-mid" variant="caption">
            {' '}
            Type AM’s name or NIK that you want to assign
          </Typography>
        </Box>

        <SalesTeamPicker onChange={handleChange} value={currentData} />

        <Grid
          component={Box}
          container
          justifyContent="center"
          spacing={2}
          sx={{ width: '100%', padding: 16, pt: 4 }}
        >
          <Grid item>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={!selected.length} onClick={handleSubmit}>
              Assign
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

AddAMDialog.propTypes = {
  currentData: PropTypes.array.isRequired,
  handleAssign: PropTypes.func.isRequired,
};

export default AddAMDialog;
