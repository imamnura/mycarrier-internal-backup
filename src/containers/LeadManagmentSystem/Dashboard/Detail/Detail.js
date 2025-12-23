import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import StepperStage from './elements/StepperStage';
import { route } from '@configs/index';
import StageInformation from './elements/StageInformation';
import Alert from './elements/Alert';
import useActions from './hooks/useActions';
import ModalLog from './elements/ModalLog';
import { dateFormatConverter } from '@utils/converter';
import FormValidate from './elements/FormValidate';
import ReassignSalesTeam from './elements/ReassignSalesTeam';
import LeadManagementSystemContext from '@context/LeadManagementSystem';
import { schemaLeadStatus } from '../utils';
import InvalidForm from '@components/Form/Approval';
import RetireForm from './elements/RetireForm';
import Prerequisite from './elements/Prerequisite';
import { hideAlertHandler } from './elements/Alert/utils';
import ModalUploadAgreement from './elements/ModalUploadAgreement';

const DetailLeadManagementSystem = (props) => {
  const { feature } = props;
  const {
    data,
    fetchDetail,
    interestId,
    loading,
    onUpdateStatus,
    setData,
    setPopUp,
    isPopUpOpen,
    prerequisite,
    caNumberConverter,
  } = useActions(props);

  const breadcrumb = [
    { label: 'Dashboard', url: route.dashboadLeadManagementSystem('list') },
    { label: interestId },
  ];

  const action = () => {
    const retireButton = {
      children: 'RETIRE',
      variant: 'ghost',
      onClick: setPopUp({ type: 'retireForm', open: true }),
    };

    let actions = [];

    actions.push({
      children: 'Log',
      onClick: setPopUp({ type: 'log', open: true }),
      variant: 'ghost',
    });

    if (data?.status === 'Need Validation') {
      actions.push({
        children: 'INVALID',
        variant: 'ghost',
        onClick: setPopUp({ type: 'invalidForm', open: true }),
      });

      actions.push({
        children: 'VALIDATE',
        // hideDivider: true,
        ml: 24,
        onClick: setPopUp({ type: 'validateForm', open: true }),
      });
    }

    if (data?.status === 'Valid' && data?.validBy === 'amMapping') {
      actions.push(retireButton);
      actions.push({
        disabled: data?.isNetworkConnectivity
          ? data?.companyDetail?.statusCa
          : false,
        children: 'SET TO QUALIFY',
        // hideDivider: true,
        ml: 24,
        onClick: onUpdateStatus('qualify'),
      });
    }

    if (data?.status === 'Qualify') {
      actions.push(retireButton);
      actions.push({
        children: 'SET TO OPPORTUNITY',
        // hideDivider: true,
        ml: 24,
        onClick: onUpdateStatus('convert'),
      });
    }

    if (data?.status === 'Opportunity') {
      actions.push(retireButton);
      actions.push({
        children: 'SET TO QUOTE',
        // hideDivider: true,
        ml: 24,
        disabled: data?.isNetworkConnectivity
          ? prerequisite.isHaveError
          : false,
        onClick: onUpdateStatus('quote'),
      });
    }

    if (data?.status === 'Quote' && !data?.isNetworkConnectivity) {
      actions.push({
        children: 'SET TO AGREEMENT',
        onClick: onUpdateStatus('agreement'),
      });
    }

    if (data?.status === 'Agreement' && !data?.isNetworkConnectivity) {
      actions.push({
        children: 'SET TO ORDER',
        onClick: setPopUp({ type: 'uploadAgreement', open: true }),
      });
    }

    return actions;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12 },
      hidden: ['sendEmail', 'dispatchMyTens'].includes(data?.validBy),
      content: [
        {
          type: 'custom',
          title: '',
          render: <StepperStage />,
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      hidden: data?.isNetworkConnectivity ? !prerequisite.data.length : true,
      content: [
        {
          type: 'custom',
          title: '',
          render: <Prerequisite {...prerequisite} />,
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: '',
          hidden: hideAlertHandler(data),
          render: <Alert />,
        },
        {
          type: 'information',
          title: 'Basic Information',
          properties: {
            data: data?.basicInformation || {},
            schema: [
              {
                label: 'INTERESTED ID',
                name: 'interestId',
                grid: 6,
              },
              {
                label: 'SALES STAGE',
                name: 'salesStage',
                grid: 6,
              },
              {
                label: 'LAST CONTACTED',
                name: 'lastContacted',
                grid: 3,
                converter: dateFormatConverter({
                  type: 'full-string-date',
                  empty: '-',
                }),
              },
              {
                label: 'LAST UPDATE',
                name: 'lastUpdated',
                grid: 3,
                converter: dateFormatConverter({
                  type: 'full-string-date',
                  empty: '-',
                }),
              },
              {
                label: 'DATE SUBMIT',
                name: 'dateSubmit',
                grid: 3,
                converter: dateFormatConverter({
                  type: 'full-string-date',
                  empty: '-',
                }),
              },
              {
                label: 'DATE ASSIGNED TO AM',
                name: 'dateAssignToAm',
                grid: 3,
                converter: dateFormatConverter({
                  type: 'full-string-date',
                  empty: '-',
                }),
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Contact Detail',
          properties: {
            data: data?.contactDetail || {},
            schema: [
              {
                label: 'CONTACT PERSON NAME',
                name: 'name',
                grid: 3,
              },
              {
                label: 'OCCUPATION',
                name: 'occupation',
                grid: 3,
              },
              {
                label: 'CONTACT NUMBER',
                name: 'phone',
                grid: 3,
              },
              {
                label: 'BUSINESS MAIL',
                name: 'email',
                grid: 3,
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Company Detail',
          properties: {
            data: data?.companyDetail || {},
            schema: [
              {
                label: 'CA NUMBER',
                name: 'caNumber',
                grid: 3,
                converter: caNumberConverter,
                // converter: (value) => (!data?.companyDetail?.statusCa ? value : (
                //   <Tooltip placement="right" title="Need to contact WDM to create CA Number on Starclick" >
                //     <Box
                //       sx={{
                //         alignItems: 'center',
                //         cursor: 'default',
                //         display: 'flex',
                //         width: 'max-content'
                //       }}
                //     >
                //       <Typography
                //         children="Pre-CA Number"
                //         inline
                //         variant="subtitle1"
                //       />
                //       <Information style={{ height: 16, width: 16, marginLeft: 8 }} />
                //     </Box>
                //   </Tooltip>
                // ))
              },
              {
                label: 'COMPANY NAME',
                name: 'companyName',
                grid: 3,
              },
              {
                label: 'BUSINESS TYPE',
                name: 'businessType',
                grid: 3,
              },
              {
                label: 'COMPANY SIZE',
                name: 'companySize',
                grid: 6,
              },
              {
                label: 'LOCATION',
                name: 'location',
                grid: 6,
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Other Recipient',
          hidden:
            ['Need Validation', 'Waiting'].includes(data?.status) ||
            !data?.validBy ||
            (!['Need Validation', 'Waiting'].includes(data?.status) &&
              data?.validBy !== 'sendEmail'),
          properties: {
            data: data?.sendEmail || {},
            schema: [
              {
                label: 'FULL NAME',
                name: 'fullName',
                grid: 6,
              },
              {
                label: 'EMAIL',
                name: 'email',
                grid: 3,
              },
              {
                label: 'WHATSAPP NUMBER',
                name: 'phoneNumber',
                grid: 3,
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Assign Lead',
          hidden:
            ['Need Validation', 'Waiting'].includes(data?.status) ||
            data?.validBy !== 'dispatchMyTens',
          properties: {
            data: data?.assignLead || {},
            schema: [
              {
                label: 'note',
                name: 'note',
                grid: 12,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 12 },
      hidden:
        ['Need Validation', 'Waiting'].includes(data?.status) ||
        data?.validBy !== 'amMapping',
      content: [
        {
          type: 'numbering',
          title: 'Sales Team',
          action: ['Valid', 'Qualify', 'Opportunity'].includes(data?.status) &&
            data?.validBy === 'amMapping' && {
              children: 'Edit Sales Team',
              onClick: setPopUp({
                type: 'reassignSalesTeam',
                open: true,
              }),
              variant: 'ghost',
            },
          properties: {
            data: data?.amMapping,
            schema: [
              { name: 'fullName', label: 'NAME', grid: 3 },
              { name: 'nik', label: 'NIK', grid: 3 },
              { name: 'jobTitle', label: 'POSITION', grid: 4 },
              { name: 'segment', label: 'SEGMENT', grid: 3 },
              { name: 'role', label: 'ROLE', grid: 3 },
              { name: 'phoneNumber', label: 'CONTACT NUMBER', grid: 3 },
            ],
          },
        },
        {
          type: 'information',
          title: 'Reason of Retired',
          hidden: data?.status !== 'Retired',
          properties: {
            data: data?.worklog[data?.worklog?.length - 1] || {},
            schema: [
              {
                label: 'reason',
                name: 'reason',
                grid: 12,
              },
              {
                label: 'note',
                name: 'note',
                grid: 12,
              },
            ],
          },
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          title: '',
          render: <StageInformation loading={loading.stageInfo} />,
        },
      ],
    },
  ];

  return (
    <LeadManagementSystemContext.Provider
      value={{
        setData,
        data,
        feature,
        fetchDetail,
        prerequisite,
      }}
    >
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading.detail}
        notFound={!data}
        schema={detailSchema}
        status={{
          children: data?.status,
          variant: schemaLeadStatus[data?.status],
        }}
      />
      <ModalLog
        onClose={setPopUp({ type: 'log', open: false })}
        open={isPopUpOpen('log')}
      />
      <FormValidate
        onClose={setPopUp({ type: 'validateForm', open: false })}
        show={isPopUpOpen('validateForm')}
      />
      <ReassignSalesTeam
        onClose={setPopUp({ type: 'reassignSalesTeam', open: false })}
        show={isPopUpOpen('reassignSalesTeam')}
      />
      <InvalidForm
        caption="Once you invalid this, it will be process and data will be sent to marketing automatically."
        labelForm="Please describe the reason.."
        labelValidate="Reason"
        onClose={setPopUp({ type: 'invalidForm', open: false })}
        onSubmit={onUpdateStatus('invalid')}
        open={isPopUpOpen('invalidForm')}
        title="Please give reason of invalid"
      />
      <RetireForm
        onClose={setPopUp({ type: 'retireForm', open: false })}
        onSubmit={onUpdateStatus('retire')}
        open={isPopUpOpen('retireForm')}
      />
      <ModalUploadAgreement
        onClose={setPopUp({ type: 'uploadAgreement', open: false })}
        show={isPopUpOpen('uploadAgreement')}
      />
    </LeadManagementSystemContext.Provider>
  );
};

DetailLeadManagementSystem.defaultProps = {
  feature: [],
};

DetailLeadManagementSystem.propTypes = {
  feature: PropTypes.array,
};

export default DetailLeadManagementSystem;
