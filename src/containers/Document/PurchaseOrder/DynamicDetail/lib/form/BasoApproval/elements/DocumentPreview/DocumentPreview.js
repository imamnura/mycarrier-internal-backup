import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from '../../styles';
import { Text, Textfield } from '@legion-ui/core';
import { ChevronRight } from '@material-ui/icons';
import React from 'react';
import Cancel from '@assets/icon-v2/Cancel';
import useAction from './hooks/useAction';
import Stepper from '@components/Stepper';

const DocumentPreview = (props) => {
  const classes = useStyles({ step: 0 });
  const { form, onClose, onNextStep, handleChangeForm, loading } =
    useAction(props);

  const required = (label) => {
    return (
      <>
        <Text children="* " size="sm" color="#DE1B1B" />
        {label}
      </>
    );
  };

  return (
    <div className={classes.wrapperSidebar}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" weight="bold">
          BASO Approval
        </Typography>
        <Cancel className={classes.icon} onClick={onClose} />
      </div>
      <Stepper
        active={0}
        steps={[
          'Document Preview',
          'Approve Document',
          'Approved Document Review',
        ]}
        variant="number"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <Typography variant="h4" weight="bold" inline>
          Document Preview
        </Typography>
        <Typography variant="body2" color="general-mid">
          Please complete the forms below for approval of this BASO document.
        </Typography>
        <Textfield
          required
          disabled
          label={required('Full Name of Person in Charge')}
          placeholder="Input full name of Person In Charge"
          name="fullName"
          value={form.fullName}
          onChange={handleChangeForm}
        />
        <div
          style={{
            display: 'flex',
            gap: '8px',
          }}
        >
          <Textfield
            required
            disabled
            style={{ flex: 1, width: '100%' }}
            label={required('Job TItle')}
            placeholder="Input Job TItle"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChangeForm}
          />
          <Textfield
            required
            disabled
            style={{ flex: 1, width: '100%' }}
            label={required('Unit')}
            placeholder="Input Unit"
            name="unit"
            value={form.unit}
            onChange={handleChangeForm}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ marginLeft: 'auto' }}>
          <Button
            rightIcon={ChevronRight}
            onClick={onNextStep}
            loading={loading}
            disabled={loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
