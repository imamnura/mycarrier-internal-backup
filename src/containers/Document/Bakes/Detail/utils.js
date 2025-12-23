import React from 'react';
import { dateFormat } from '@utils/parser';
import Typography from '@components/Typography';

export const getBakesStatus = (status) => {
  if (!status) {
    return undefined;
  }

  const variant =
    {
      approved: 'success',
      'customer approval': 'warning',
      draft: 'primary',
      rejected: 'danger',
      returned: 'danger',
      'telkom approval': 'warning',
    }[status] || '';

  return {
    children: status,
    variant: variant,
  };
};

export const schemaStatus = {
  send: 'success',
  failed: 'danger',
};

export const getBakesStepper = (data) => {
  const { status, worklog } = data || {};

  let active =
    {
      draft: 0,
      'telkom approval': 1,
      'customer approval': 2,
      approved: 3,
    }[status] || 0;

  let errors = undefined;

  let steps = ['Submitted', 'Telkom Approval', 'Customer Approval', 'Approved'];

  if (['returned', 'rejected'].includes(status)) {
    errors = status;

    const lastStatus = worklog[worklog.length - 2]?.status;
    const lastActive = {
      'telkom approval': 1,
      'customer approval': 2,
    }[lastStatus];

    if (lastActive) {
      active = lastActive;
    }
  }

  if (active >= 2) {
    steps[1] = 'Telkom Approved';
  }

  if (active >= 3) {
    steps[2] = 'Customer Approved';
  }

  return {
    active,
    errors,
    steps,
  };
};

const generateWorklogNote = ({ status, note, statusLabel }) => {
  let notes = {
    draft: 'Document created',
    'telkom approval': 'Document submitted',
    'customer approval': 'Document submitted',
    approved: 'Document approved',
  }[status];

  const telkomApprovalRegex =
    /^TELKOM REVIEWER [1-9] \| (?:APPROVED|RE(?:JECT|TURN)ED)$/g;
  const customerApprovalRegex =
    /^CUSTOMER REVIEWER [1-9] \| (?:APPROVED|RE(?:JECT|TURN)ED)$/g;

  if (
    (statusLabel?.match(telkomApprovalRegex) ||
      statusLabel?.match(customerApprovalRegex)) &&
    note
  ) {
    const splittedLabel = statusLabel.split(' ');
    notes = (
      <>
        <Typography color="general-mid" inline variant="caption">
          Document {splittedLabel[4].toLowerCase()}
        </Typography>
        <Typography color="general-mid" variant="caption">
          Note: &ldquo;{note}&rdquo;
        </Typography>
      </>
    );
  }

  return notes;
};

export const getBakesWorklog = (worklog) => {
  return worklog
    ?.filter(({ status }) => status !== 'draft')
    .map(({ status, createdBy, dateTime, note }) => {
      let statusLabel = {
        approved: 'APPROVED',
        'customer approval': 'APPROVAL CUSTOMER | SUBMITTED',
        'telkom approval': 'APPROVAL TELKOM | SUBMITTED',
      }[status];

      if (
        createdBy.includes('telkom approval') ||
        createdBy.includes('customer approval')
      ) {
        let actionStatus =
          {
            rejected: 'REJECTED',
            returned: 'RETURNED',
          }[status] || 'APPROVED';

        const creators = createdBy
          .split(' ')
          .map((t, i) => (i === 1 ? 'reviewer' : t))
          .join(' ');

        statusLabel = `${creators.toUpperCase()} | ${actionStatus}`;
      }

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, status, statusLabel }),
        status: statusLabel,
      };
    })
    .reverse();
};
