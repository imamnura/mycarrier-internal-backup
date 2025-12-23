import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from '../../styles';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import Cancel from '@assets/icon-v2/Cancel';
import useAction from './hooks/useAction';
import Stepper from '@components/Stepper';
import { Checkbox } from '@legion-ui/core';

const ApprovedDocumentReview = (props) => {
  const classes = useStyles({ step: 2 });
  const {
    approved,
    onClose,
    handleApproved,
    onBackStep,
    onSubmit,
    isSubmitDisabled,
  } = useAction(props);

  return (
    <div className={classes.wrapperSidebar}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" weight="bold">
          BASO Approval
        </Typography>
        <Cancel className={classes.icon} onClick={onClose} />
      </div>
      <Stepper
        active={2}
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
          Approved Document Review
        </Typography>
        <Typography variant="body2" color="general-mid">
          You have successfully filled out the forms and added your approval.
          Please review the document carefully one last time before approving
          it.
        </Typography>
        <Typography variant="body2" color="general-mid">
          Once approved, the document will be sent to the customer.
        </Typography>
      </div>

      <Checkbox
        checked={approved}
        onChange={handleApproved}
        label={
          <Typography variant="body2" color="general-mid">
            I have read and approve to this document.
          </Typography>
        }
      />
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ marginRight: 'auto' }}>
          <Button variant="ghost" leftIcon={ChevronLeft} onClick={onBackStep}>
            Back
          </Button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <Button disabled={isSubmitDisabled()} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApprovedDocumentReview;
