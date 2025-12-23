import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Remove } from '@material-ui/icons';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import { dateFormatConverter } from '@utils/converter';
import useAction from './hooks/useActions';
import ReturnForm from './lib/forms/ReturnForm';
import ApproveIssueForm from './lib/forms/ApproveIssueForm';
import ChooseCategoryForm from './lib/forms/ChooseCategoryForm';
import useStyles from './styles';
import {
  getGameqooStepper,
  getGameqooWorklog,
  getGameqooSteps,
  pickStatus,
  pickUrgency,
  pickHardComplaint,
  priviledge,
} from './utils';

const DetailGameqoo = (props) => {
  const { feature } = props;
  const { canReject, canValidate } = priviledge(feature);
  const {
    referenceId,
    fetchDetail,
    data,
    loading,
    modalReturn,
    setModalReturn,
    modalApproveIssue,
    setModalApproveIssue,
    modalChooseCategory,
    setModalChooseCategory,
    onClickModalReturn,
    onClickValidation,
    onPreviewWorklog,
  } = useAction(props);

  const classes = useStyles();

  const breadcrumb = [
    { label: 'GameQoo', url: route.gameqoo('list') },
    { label: referenceId || '-' },
  ];

  const action = () => {
    const actions = [];

    if (data && ['Checking'].includes(data.status)) {
      if (canReject) {
        actions.push({
          variant: 'ghost',
          children: 'REJECT',
          onClick: onClickModalReturn(),
        });
      }
      if (canValidate) {
        actions.push({
          children: 'APPROVE',
          onClick: onClickValidation(),
        });
      }
    }

    return actions;
  };

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 6 },
      content: [
        {
          type: 'information',
          title: 'Ticket Detail',
          properties: {
            data: data || {},
            schema: [
              { name: 'referenceId', label: 'Reference ID', grid: 12 },
              { name: 'ticketId', label: 'Ticket Number' },
              { name: 'productName', label: 'Product Name' },
              {
                label: 'Created Date',
                name: 'createdAt',
                converter: dateFormatConverter({
                  type: 'date-time',
                  empty: '-',
                }),
                grid: 12,
              },
            ],
          },
        },
        {
          type: 'information',
          title: 'Report Description',
          properties: {
            data: data || {},
            schema: [
              { name: 'voucherCode', label: 'VOUCHER CODE', grid: 12 },
              { name: 'troubleType', label: 'TROUBLE TYPE', grid: 12 },
              { name: 'troubleDesc', label: 'TROUBLE DESCRIPTION', grid: 12 },
            ],
          },
        },
        {
          type: 'information',
          title: 'Salesforce Data',
          hidden: !['nonNetwork'].includes(data?.networkType),
          properties: {
            data: data || {},
            schema: [
              { name: 'sfCategory', label: 'SALESFORCE CATEGORY' },
              { name: 'sfSubCategory', label: 'SALESFORCE SUBCATEGORY' },
            ],
          },
        },
        {
          type: 'information',
          title: 'Service Information',
          hidden: !['network'].includes(data?.networkType),
          properties: {
            data: data || {},
            schema: [
              { name: 'referenceId', label: 'Reference ID', grid: 12 },
              { name: 'serviceId', label: 'Service ID' },
              { name: 'ticketId', label: 'Ticket Number' },
              { name: 'firstCall', label: 'First Call Resolution' },
              { name: 'productName', label: 'Product' },
              { name: 'serviceLocation', label: 'Address', grid: 12 },
            ],
          },
        },
        {
          type: 'information',
          title: 'PIC Customer',
          properties: {
            data: data || {},
            schema: [
              { name: 'picName', label: 'PIC Name' },
              { name: 'picPhoneNumber', label: 'PIC Contact' },
              { name: 'picAddress', label: 'PIC Address', grid: 12 },
            ],
          },
        },
        {
          type: 'information',
          title: 'Fault Information',
          hidden: !['network'].includes(data?.networkType),
          properties: {
            data: data || {},
            schema: [
              {
                name: 'urgency',
                label: 'Urgency',
                converter: (values) => pickUrgency[values] || '-',
              },
              {
                name: 'hardComplaint',
                label: 'Hard Complain',
                converter: (values) => pickHardComplaint[values] || '-',
              },
              {
                name: 'symptompName',
                label: 'Symptoms',
                grid: 12,
                converter: (values) =>
                  values?.length ? (
                    <List className={classes.root}>
                      {values.map((item, index) => (
                        <ListItem
                          key={index}
                          style={{
                            paddingLeft: index * 32,
                          }}
                        >
                          <ListItemIcon
                            style={{ minWidth: '0px', marginRight: 18 }}
                          >
                            <Remove />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    values
                  ),
              },
              { name: 'descValidation', label: 'Description', grid: 12 },
              { name: 'occNoteValidation', label: `OCC's Note`, grid: 12 },
            ],
          },
        },
        {
          type: 'information',
          title: 'PIC Internal',
          hidden: !['network'].includes(data?.networkType),
          properties: {
            data: data || {},
            schema: [
              { name: 'picName2', label: 'PIC Name' },
              { name: 'picNumber2', label: 'PIC Contact' },
            ],
          },
        },
        {
          type: 'attachment',
          title: 'Evidence',
          hidden: !data?.evidenceFiles,
          properties: {
            data: data || [],
            schema: [{ name: 'evidenceFiles', label: '' }],
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
          title: 'Fault Handling Step',
          properties: {
            ...getGameqooStepper(data?.status, data?.networkType),
            steps: getGameqooSteps(data?.networkType),
          },
        },
        {
          type: 'worklog',
          title: 'History Work Log',
          properties: {
            data: getGameqooWorklog(
              data?.worklog,
              onPreviewWorklog,
              data?.networkType,
            ),
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
        status={pickStatus[data?.networkType || 'network'][data?.status]}
      />
      <ReturnForm
        fetchDetail={fetchDetail}
        modalReturn={modalReturn}
        referenceId={data?.referenceId}
        setModalReturn={setModalReturn}
      />
      <ApproveIssueForm
        modalApproveIssue={modalApproveIssue}
        referenceId={data?.referenceId}
        setModalApproveIssue={setModalApproveIssue}
        setModalChooseCategory={setModalChooseCategory}
      />
      <ChooseCategoryForm
        fetchDetail={fetchDetail}
        modalChooseCategory={modalChooseCategory}
        referenceId={data?.referenceId}
        setModalChooseCategory={setModalChooseCategory}
      />
    </>
  );
};

DetailGameqoo.defaultProps = {
  feature: [],
};

DetailGameqoo.propTypes = {
  feature: PropTypes.array,
};

export default DetailGameqoo;
