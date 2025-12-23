import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatConverter } from '@utils/converter';
import Detail from '@fragments/Detail';
import useActions from './hooks/useActions';
import { route } from '@configs';
import { getBakesStatus, getBakesStepper, getBakesWorklog } from './utils';
import { isHaveAccess } from '@utils/common';
import UploadSignedBakes from './elements/UploadSignedBakes';
import EditReviewer from './elements/EditReviewer';

const DetailBakes = (props) => {
  const {
    bakesId,
    closePopUp,
    data,
    feature,
    loading,
    onSubmitUploadSignedBakes,
    setUploadSignedBakes,
    onSubmitEditReviewer,
    popUp,
    action,
  } = useActions(props);

  const breadcrumb = [
    { label: 'BAKES', url: route.bakes('list') },
    { label: bakesId },
  ];

  const status = getBakesStatus(data?.status);

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Detail Information',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'COMPANY',
                name: 'company.name',
              },
              {
                label: 'BAKES ID',
                name: 'bakesId',
              },
              {
                label: 'BAKES NUMBER',
                name: 'ndeNumber',
                grid: 12,
              },
              {
                converter: dateFormatConverter({ type: 'date', empty: '-' }),
                label: 'CREATED DATE',
                name: 'createdAt',
              },
              {
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                label: 'LAST UPDATE',
                name: 'updatedAt',
              },
            ],
          },
        },
        {
          type: 'numbering',
          title: 'Note From Telkom',
          properties: {
            data: data?.telkomApproval,
            schema: [
              { name: 'name', label: 'NAME', grid: 6 },
              { name: 'position', label: 'TITLE', grid: 6 },
              { name: 'email', label: 'EMAIL', grid: 6 },
              // { name: 'emailNotifStatus', label: 'EMAIL STATUS', grid: 6, schemaStatus: schemaStatus },
              { name: 'phoneNumber', label: 'NO. TELP', grid: 6 },
              // { name: 'phoneNotifStatus', label: 'SEND STATUS', grid: 6, schemaStatus: schemaStatus },
              { name: 'note', label: 'NOTES', grid: 12 },
            ],
          },
        },
        {
          type: 'numbering',
          title: 'Note From Customer',
          properties: {
            data: data?.customerApproval,
            schema: [
              { name: 'name', label: 'NAME', grid: 6 },
              { name: 'position', label: 'TITLE', grid: 6 },
              { name: 'email', label: 'EMAIL', grid: 6 },
              { name: 'phoneNumber', label: 'NO. TELP', grid: 6 },
              { name: 'note', label: 'NOTES', grid: 12 },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                label: 'BAKES',
                name:
                  {
                    approved: 'signedCustomer',
                    'customer approval': 'signedTelkom',
                  }[data?.status] || 'bakesDocument',
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    `read_doc_${data?.approvalType}`,
                  ),
                },
                action:
                  data?.status === 'telkom approval' &&
                  data?.telkomApprovalStatus &&
                  data?.approvalType === 'manual' &&
                  isHaveAccess(feature, 'update_doc_manual')
                    ? {
                        children: 'Upload',
                        onClick: setUploadSignedBakes,
                      }
                    : undefined,
              },
              {
                label: 'REQ SBR',
                name: 'reqSbr',
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    `read_doc_${data?.approvalType}`,
                  ),
                },
              },
              {
                label: 'SBR',
                name: 'sbr',
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    `read_doc_${data?.approvalType}`,
                  ),
                },
              },
              {
                label: 'OTHER DOC',
                name: 'otherDoc',
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    `read_doc_${data?.approvalType}`,
                  ),
                },
              },
              {
                label: 'REVIEW NOTES',
                name: 'bakesNotesDocument',
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    `read_doc_${data?.approvalType}`,
                  ),
                },
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 6 },
      stickRight: true,
      content: [
        {
          type: 'stepper',
          title: 'BAKES Approval Step',
          properties: getBakesStepper(data),
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getBakesWorklog(data?.worklog),
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={status}
      />
      <UploadSignedBakes
        onClose={closePopUp}
        onSubmit={onSubmitUploadSignedBakes}
        open={popUp.type === 'uploadSignedBakes' && popUp.open}
      />
      <EditReviewer
        data={data}
        onClose={closePopUp}
        onSubmit={onSubmitEditReviewer}
        open={popUp.type === 'editReviewer' && popUp.open}
      />
    </>
  );
};

DetailBakes.defaultProps = {
  feature: [],
};

DetailBakes.propTypes = {
  feature: PropTypes.array,
};

export default DetailBakes;
