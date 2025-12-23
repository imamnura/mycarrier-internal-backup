import React, { useEffect, useState } from 'react';
import PropType from 'prop-types';
import Typography from '@components/Typography/Typography';
import { Box, Dialog, Divider } from '@material-ui/core';
import useStyles from './styles';
import OptionList from '@components/OptionList/OptionList';
import Button from '@components/Button/Button';

const RemindingOption = (props) => {
  const { onClose, onSubmit: _onSubmit, open, value: _value } = props;
  const { dialogRoot } = useStyles();

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  const onSubmit = () => _onSubmit(value);

  return (
    <Dialog classes={{ paper: dialogRoot }} maxWidth="lg" open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          textAlign: 'center',
        }}
      >
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Send Billing Reminder
        </Typography>
        <Typography color="general-mid" variant="caption">
          First, choose option below for sending billing reminder
        </Typography>
      </Box>
      <Box sx={{ mt: 3, minWidth: 352 }}>
        <OptionList
          onChange={setValue}
          options={[
            {
              label: 'Billing Reminder Letter 1',
              description: 'Send billing list to customer',
              value: 'reminder1',
            },
            {
              label: 'Billing Reminder Letter 2',
              description: 'Send message with notice approach',
              value: 'reminder2',
            },
            {
              label: 'Billing Reminder Letter 3',
              description: 'Send message with warning approach',
              value: 'reminder3',
            },
          ]}
          redBorder
          value={value}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 16,
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Box sx={{ height: 24 }}>
          <Divider orientation="vertical" />
        </Box>
        <Button id="btn-next" disabled={!value} onClick={onSubmit}>
          Next
        </Button>
      </Box>
    </Dialog>
  );
};

RemindingOption.defaultProps = {
  value: '',
};

RemindingOption.propTypes = {
  onClose: PropType.func.isRequired,
  onSubmit: PropType.func.isRequired,
  open: PropType.bool.isRequired,
  value: PropType.bool.string,
};

export default RemindingOption;
