import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';
import { route } from '@configs';

export const breadcrumb = (id) => [
  { label: 'Purchase Order', url: route.purchaseOrder('list') },
  { label: id || '-' },
];

export const statusLabel = {
  'am approval': 'am approval',
  'am approved': 'approved',
  'am returned': 'returned',
  approved: 'completed',
  actived: 'completed',
  'baso signed': 'baso signed',
  checking: 'checking',
  completed: 'completed',
  confirmation: 'confirmation',
  'customer agreement': 'customer agreement',
  'customer returned': 'returned',
  'delay order': 'delay order',
  'delivery approved': 'approved',
  'delivery approval': 'delivery approval',
  'delivery returned': 'returned',
  'operator checking': 'operator checking',
  'operator approval': 'operator approval',
  'operator returned': 'returned',
  provisioning: 'provisioning',
  returned: 'returned',
  'segment approval': 'segment approval',
  'segment returned': 'returned',
  submitted: 'submitted',
  'wds approval': 'wds approval',
  'wds approved': 'approved',
  'wds returned': 'returned',
  rejected: 'rejected',
  draft: 'draft',
};

export const statusVariant = {
  'am approval': 'primary',
  approved: 'success',
  'baso signed': 'warning',
  checking: 'primary',
  completed: 'success',
  confirmation: 'warning',
  'customer agreement': 'warning',
  'delay order': 'warning',
  'delivery approval': 'warning',
  draft: 'primary',
  'operator checking': 'warning',
  'operator approval': 'warning',
  provisioning: 'warning',
  returned: 'danger',
  rejected: 'danger',
  'segment approval': 'warning',
  'segment returned': 'warning',
  submitted: 'warning',
  'wds approval': 'warning',
};

export const generateWorklogNote = ({ note, noteProgress }) => {
  if (noteProgress) {
    return (
      <>
        <Typography children={note} color="general-mid" variant="caption" />
        <Box display="block">
          <Typography color="general-mid" variant="caption">
            Note: &ldquo;{noteProgress}&rdquo;
          </Typography>
        </Box>
      </>
    );
  } else if (note) {
    return note;
  } else {
    return '';
  }
};

export const getPurchaseOrderWorklog = (worklog, productName = '') => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          actived: 'OPERATOR | APPROVED',
          'admin approval': 'TELKOMREG-ADMIN | APPROVED',
          'am approval': 'TELKOMREG-AM | CHECKING',
          'am checking': 'TELKOMREG-AM | CHECKING',
          'am returned': 'TELKOMREG-AM | RETURNED',
          approved: 'APPROVED',
          'am approved': 'TELKOMREG-AM | APPROVED',
          'bakes created': 'TELKOMREG-SEGMENT-SUPPORT | APPROVED',
          'baso signed': 'BASO SIGNED | DELIVERY UPLOADED SIGNED',
          'baso completed': 'BASO SIGNED | BASO COMPLETED',
          checking: 'TELKOMREG-AM  | CHECKING',
          completed: 'COMPLETED | PO COMPLETED',
          'customer agreement': 'OPERATOR | CHECKED',
          'customer returned': 'TELKOMREG-AM | RETURNED',
          'delay order': 'DELAY ORDER | ORDER DELAYED',
          'delivery approved': 'TELKOMREG-DELIVERY | APPROVED',
          'delivery approval': 'TELKOMREG-AM | APPROVED',
          'delivery returned': 'TELKOMREG-DELIVERY | RETURNED',
          'gameqoo signed': 'BASO SIGNED | DELIVERY UPLOADED BASO',
          'gameqoo completed': 'BASO SIGNED | CUSTOMER SIGNED BASO',
          'gameqoo am approval': 'TELKOMREG-AM | APPROVED',
          'gameqoo delivery approval': 'TELKOMREG-AM-GM-SEGMENT | APPROVED',
          'gameqoo delivery returned': 'TELKOMREG-AM-GM-SEGMENT | RETURNED',
          'FAB checked': `PROVISIONING | FAB CHECKED ${productName?.toUpperCase()}`,
          'FAB installed': `PROVISIONING | FAB INSTALLATION ${productName?.toUpperCase()}`,
          'FAB completed': `PROVISIONING | FAB COMPLETED ${productName?.toUpperCase()}`,
          'operator checking': 'TELKOMREG-DELIVERY | APPROVED',
          'operator approval': 'CUSTOMER | AGREEMENT',
          'operator returned': 'OPERATOR | RETURNED',
          provisioning: 'TELKOMREG-DELIVERY | APPROVED',
          'provisioning started': 'PROVISIONING | STARTED',
          'provisioning completed': 'PROVISIONING | COMPLETED',
          'segment approval': 'TELKOMREG-AM-GM-SEGMENT | APPROVED',
          'segment returned': 'TELKOMREG-SEGMENT-SUPPORT | RETURNED',
          submitted: 'CUSTOMER | SUBMITTED',
          'wds approval': 'TELKOMREG-AM | APPROVED',
          'wds returned': 'TELKOMREG-WDS | RETURNED',
          rejected: 'TELKOMREG-AM | REJECTED',
          'wds approved': 'TELKOMREG-WDS | APPROVED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }),
        status: statusLabel,
      };
    })
    .reverse();
};

export const optionsDuration = [
  { label: '1 Month', value: '1' },
  { label: '2 Months', value: '2' },
  { label: '3 Months', value: '3' },
  { label: '4 Months', value: '4' },
  { label: '5 Months', value: '5' },
  { label: '6 Months', value: '6' },
  { label: '7 Months', value: '7' },
  { label: '8 Months', value: '8' },
  { label: '9 Months', value: '9' },
  { label: '10 Months', value: '10' },
  { label: '11 Months', value: '11' },
  { label: '12 Months', value: '12' },
];
