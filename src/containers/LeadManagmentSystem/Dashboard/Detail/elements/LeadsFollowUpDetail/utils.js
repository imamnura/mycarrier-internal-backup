import React from 'react';
import { IconButton } from '@material-ui/core';
import Edit from '@assets/icon-v2/Edit';
import color from '@styles/color';
import Trash from '@assets/icon-v2/Trash';
import Typography from '@components/Typography';
import {
  maskLeadStatus,
  schemaLeadStatus,
} from '@containers/LeadManagmentSystem/Dashboard/utils';

const schemaActivities = (visibleCrud) => [
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'ACTIVITY ON',
    name: 'salesType',
    schemaStatus: schemaLeadStatus,
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'TYPE',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'DESCRIPTION',
    name: 'description',
  },
  {
    cellStyle: {
      minWidth: 180,
    },
    label: 'DUE',
    name: 'due_date',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'STATUS',
    name: 'status',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'PRIORITY',
    name: 'priority',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'ACCOUNT',
    name: 'account',
  },
  {
    cellStyle: {
      minWidth: 80,
    },
    label: 'DURATION',
    name: 'duration',
  },
  ...(visibleCrud
    ? [
        {
          label: '',
          name: 'action',
        },
      ]
    : []),
];

const normalizeActivities = (data, actions) =>
  data.map((d) => ({
    ...d,
    salesType: maskLeadStatus(d.salesType),
    action: (
      <>
        <div>
          <IconButton
            // // onClick={() => actions.onEditFollowUp(d)}
            onClick={actions.onEditFollowUp(d)}
            size="small"
            style={{ color: color.yellow.main, padding: 8 }}
          >
            <Edit />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={actions.onDeleteFollowUp(d)}
            size="small"
            style={{ color: color.primary.main, padding: 8 }}
          >
            <Trash />
          </IconButton>
        </div>
      </>
    ),
  }));

const schemaNotes = (visibleCrud) => [
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'CREATED',
    name: 'createdAt',
    formatDate: 'date-time-full',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'CREATED BY',
    name: 'createdBy',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'TYPE',
    name: 'type',
  },
  {
    cellStyle: {
      minWidth: 250,
    },
    label: 'DESCRIPTION',
    name: 'description',
  },
  ...(visibleCrud
    ? [
        {
          label: '',
          name: 'action',
        },
      ]
    : []),
];

const normalizeNotes = (data, actions) =>
  data.map((d) => ({
    ...d,
    action: (
      <>
        <div>
          <IconButton
            // onClick={() => actions.onEditFollowUp(d)}
            onClick={actions.onEditFollowUp(d)}
            size="small"
            style={{ color: color.yellow.main, padding: 8 }}
          >
            <Edit />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={actions.onDeleteFollowUp(d)}
            size="small"
            style={{ color: color.primary.main, padding: 8 }}
          >
            <Trash />
          </IconButton>
        </div>
      </>
    ),
  }));

const schemaAttachments = (visibleCrud) => [
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'NAME',
    name: 'name',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'SIZE (IN BYTES)',
    name: 'size',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'TYPE',
    name: 'docType',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'MODIFIED',
    name: 'modified',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'UPDATE FILE',
    name: 'updateFile',
  },
  {
    cellStyle: {
      minWidth: 228,
    },
    label: 'COMMENTS',
    name: 'comment',
  },
  {
    cellStyle: {
      minWidth: 228,
    },
    label: 'INTEGRATION STATUS',
    name: 'integrationStatus',
  },
  ...(visibleCrud
    ? [
        {
          label: '',
          name: 'action',
        },
      ]
    : []),
];

const normalizeAttachments = (data, actions) =>
  data.map((d) => ({
    ...d,
    name: (
      <Typography
        color="primary-main"
        onClick={actions.onPreviewDocument({
          title: d.fileName,
          url: d.fileUrl,
        })}
        style={{ cursor: 'pointer' }}
        variant="subtitle2"
        weight="medium"
      >
        {d.fileName}
      </Typography>
    ),
    action: (
      <>
        {/* <div>
        <IconButton
          // onClick={() => actions.onEditFollowUp(d)}
          onClick={actions.onEditFollowUp(d)}
          size="small"
          style={{ color: color.yellow.main, padding: 8 }}
        >
          <Edit/>
        </IconButton>
      </div> */}
        <div>
          <IconButton
            onClick={actions.onDeleteFollowUp(d)}
            size="small"
            style={{ color: color.primary.main, padding: 8 }}
          >
            <Trash />
          </IconButton>
        </div>
      </>
    ),
  }));

const schemaProducts = (visibleCrud) => [
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'AUTO QUOTE',
    name: 'autoQuote',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'PRODUCT',
    name: 'product',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'PRODUCT LINE',
    name: 'productLine',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'QUANTITY',
    name: 'quantity',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'NET PRICE',
    name: 'netPrice',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'REVENUE',
    name: 'revenue',
    currency: true,
  },
  {
    cellStyle: {
      minWidth: 152,
    },
    label: 'PROBABILITY (%)',
    name: 'probability',
  },
  {
    cellStyle: {
      minWidth: 316,
    },
    label: 'SALES REP',
    name: 'salesRep',
  },
  ...(visibleCrud
    ? [
        {
          label: '',
          name: 'action',
        },
      ]
    : []),
];

const normalizeProduct = (data, actions) =>
  data.map((d) => ({
    ...d,
    autoQuote: d.autoQuote === 'Y' ? 'Yes' : 'No',
    action: (
      <>
        <div>
          <IconButton
            // onClick={() => actions.onEditFollowUp(d)}
            onClick={actions.onEditFollowUp(d)}
            size="small"
            style={{ color: color.yellow.main, padding: 8 }}
          >
            <Edit />
          </IconButton>
        </div>
        {/* <div>
        <IconButton
          size="small"
          style={{ color: color.primary.main, padding: 8 }}
        >
          <Trash/>
        </IconButton>
      </div> */}
      </>
    ),
  }));

const schemaContact = (visibleCrud) => [
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'PRIMARY',
    name: 'primary',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'NAME',
    name: 'contactName',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'FIRST NAME',
    name: 'firstName',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'LAST NAME',
    name: 'lastName',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'MR/MRS',
    name: 'gender',
  },
  {
    cellStyle: {
      minWidth: 184,
    },
    label: 'WORK PHONE',
    name: 'workPhone',
  },
  {
    cellStyle: {
      minWidth: 228,
    },
    label: 'WORK FAX',
    name: 'workFax',
  },
  {
    cellStyle: {
      minWidth: 228,
    },
    label: 'EMAIL',
    name: 'email',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'MOBILE PHONE',
    name: 'mobilePhone',
  },
  ...(visibleCrud
    ? [
        {
          label: '',
          name: 'action',
        },
      ]
    : []),
];

const normalizeContact = (data, actions) =>
  data.map((d) => ({
    ...d,
    name: d?.firstName + d?.lastName,
    action: (
      <>
        <div>
          <IconButton
            onClick={actions.onEditFollowUp(d)}
            size="small"
            style={{ color: color.yellow.main, padding: 8 }}
          >
            <Edit />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={actions.onDeleteFollowUp(d)}
            size="small"
            style={{ color: color.primary.main, padding: 8 }}
          >
            <Trash />
          </IconButton>
        </div>
      </>
    ),
  }));

const schemaQuote = [
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'QUOTE',
    name: 'quote',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'QUOTE NAME',
    name: 'quoteName',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'REVISION',
    name: 'revision',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'CREATED BY',
    name: 'createdBy',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'CUSTOMER ACCOUNT',
    name: 'customerAccount',
  },
  {
    cellStyle: {
      minWidth: 252,
    },
    label: 'LAST NAME',
    name: 'lastName',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'STATUS',
    name: 'status',
  },
  {
    cellStyle: {
      minWidth: 160,
    },
    label: 'CHILD AGREEMENT',
    name: 'childAgreement',
  },
  {
    cellStyle: {
      minWidth: 148,
    },
    label: 'ACCOUNT TEAM',
    name: 'accountTeam',
  },
];

const normalizeQuote = (data) =>
  data.map((d) => ({
    ...d,
    action: (
      <>
        <div>
          <IconButton
            size="small"
            style={{ color: color.yellow.main, padding: 8 }}
          >
            <Edit />
          </IconButton>
        </div>
        <div>
          <IconButton
            size="small"
            style={{ color: color.primary.main, padding: 8 }}
          >
            <Trash />
          </IconButton>
        </div>
      </>
    ),
  }));

export const schemaList = (tab, _visibleCrudAll, status) => {
  const visibleCrud = _visibleCrudAll && status.toLowerCase() != 'quote';
  const visibleCrudActivities =
    visibleCrud && status.toLowerCase() != 'opportunity';
  return (
    {
      activities: schemaActivities(visibleCrudActivities),
      attachments: schemaAttachments(visibleCrud),
      notes: schemaNotes(visibleCrud),
      product: schemaProducts(_visibleCrudAll),
      contact: schemaContact(false),
      quote: schemaQuote,
    }[tab] || []
  );
};

export const normalizeList = (data, tab, actions) => {
  return (
    {
      activities: normalizeActivities(data, actions),
      attachments: normalizeAttachments(data, actions),
      notes: normalizeNotes(data, actions),
      product: normalizeProduct(data, actions),
      contact: normalizeContact(data, actions),
      quote: normalizeQuote(data),
    }[tab] || data
  );
};
