import Button from '@components/Button';
import Typography from '@components/Typography';
import useStyles from '../../styles';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import React from 'react';
import Cancel from '@assets/icon-v2/Cancel';
import useAction from './hooks/useAction';
import Stepper from '@components/Stepper';
import Feather from '@assets/icon-v2/Feather';

const ApproveDocument = (props) => {
  const classes = useStyles({ step: 1 });
  const {
    onClose,
    addSignature,
    isSignatureDisabled,
    onNextStep,
    onBackStep,
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
        active={1}
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
          Approve Document
        </Typography>
        <Typography variant="body2" color="general-mid">
          Place your signature in the desired area. Make sure to sign in the
          correct spot to ensure the document is properly approved.s
        </Typography>
        <div>
          <Button
            disabled={isSignatureDisabled()}
            rightIcon={Feather}
            onClick={addSignature}
          >
            PLACE SIGNATURE
          </Button>
        </div>
      </div>

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
          <Button
            disabled={isSubmitDisabled()}
            rightIcon={ChevronRight}
            onClick={onNextStep}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDocument;
