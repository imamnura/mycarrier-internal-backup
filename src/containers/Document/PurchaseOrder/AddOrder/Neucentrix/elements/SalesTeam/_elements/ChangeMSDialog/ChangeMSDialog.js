import React, { useState } from 'react';
import { Box, Typography, Grid, Dialog } from '@material-ui/core';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import SelectMS from './SelectMS';
import useStyles from '../../styles';

const ChangeMSDialog = ({ handleAssign, currentData }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const classes = useStyles();

  const handleChange = (value) => {
    setSelected(value);
  };

  const handleSubmit = () => {
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
        <Button onClick={() => setOpen(!open)}>
          {' '}
          {!selected.length
            ? 'Add Manager Segment'
            : 'Change MGR. Segment'}{' '}
        </Button>
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
            Search Manager Segment
          </Typography>
          <Typography color="general-mid" variant="caption">
            {' '}
            Type Manager Segment’s name or NIK that you want to assign
          </Typography>
        </Box>
        <SelectMS onChange={handleChange} value={currentData} />
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

ChangeMSDialog.propTypes = {
  currentData: PropTypes.array.isRequired,
  handleAssign: PropTypes.func.isRequired,
};

export default ChangeMSDialog;
