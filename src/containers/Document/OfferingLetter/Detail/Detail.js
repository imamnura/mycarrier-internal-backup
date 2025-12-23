import React from 'react';
import PropTypes from 'prop-types';
import { dateFormatConverter } from '@utils/converter';
import Detail from '@fragments/Detail';
// import Otp from '@components/Form/Otp';
import useActions from './hooks/useActions';
import { route } from '@configs';
import {
  getOfferingLetterStatus,
  getOfferingLetterStepper,
  getOfferingLetterWorklog,
} from './utils';
import { isHaveAccess } from '@utils/common';

const DetailOfferingLetter = (props) => {
  const {
    data,
    feature,
    loading,
    // openOtp,
    // closeOtp,
    // onEdit,
    // onSubmitOtp,
    // otpForm,
    // otpRepository,
    offeringLetterId,
  } = useActions(props);

  const breadcrumb = [
    { label: 'Offering Letter', url: route.offeringLetter('list') },
    { label: offeringLetterId },
  ];

  const status = getOfferingLetterStatus(data?.status);

  // const action = () => {
  //   let actions = [];

  //   if (
  //     data?.status === 'returned' &&
  //     isHaveAccess(feature, 'update_offering_letter_returned')
  //   ) {
  //     actions.push({ children: 'EDIT OFFERING LETTER', onClick: onEdit });
  //   }
  //   if (
  //     data?.status === 'signing failed' &&
  //     isHaveAccess(feature, 'update_offering_letter_draft')
  //   ) {
  //     actions.push({ children: 'Re-Sign Offering Letter', onClick: openOtp });
  //   }

  //   return actions;
  // };

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
                label: 'OFFERING LETTER ID',
                name: 'offeringLetterId',
              },
              {
                label: 'COMPANY',
                name: 'companyName',
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
          title: 'Recipient',
          properties: {
            data: data?.contact,
            nameKey: 'name',
          },
        },
        {
          type: 'numbering',
          title: 'Service',
          properties: {
            data: data?.products,
            nameKey: 'productName',
          },
        },
        {
          type: 'attachment',
          title: 'Document Attachment',
          properties: {
            data: data || {},
            schema: [
              {
                attachmentProps: {
                  hidePreviewDownload: !isHaveAccess(
                    feature,
                    'read_download_doc_attachment_offering_letter',
                  ),
                },
                label: 'Offering Letter',
                name: 'document',
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
          title: 'Offering Letter Order Step',
          properties: {
            ...getOfferingLetterStepper(data?.status),
            steps: ['Submitted', 'Telkom Approval', 'Completed'],
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getOfferingLetterWorklog(data?.worklog),
          },
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        // action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
        status={status}
      />
      {/* <Otp
        description="You will get Peruri Digital Sign OTP code, please input for approval"
        id={offeringLetterId}
        onClose={closeOtp}
        onSubmit={onSubmitOtp}
        open={otpForm}
        repository={otpRepository}
        title="Please input your OTP code"
      /> */}
    </>
  );
};

DetailOfferingLetter.defaultProps = {
  feature: [],
};

DetailOfferingLetter.propTypes = {
  feature: PropTypes.array,
};

export default DetailOfferingLetter;
