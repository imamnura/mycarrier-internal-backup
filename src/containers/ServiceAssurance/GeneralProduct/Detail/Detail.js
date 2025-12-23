import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Remove } from '@material-ui/icons';
import Typography from '@components/Typography';
import { route } from '@configs';
import Detail from '@fragments/Detail';
import { dateFormatConverter } from '@utils/converter';
import { pickStatus, getGPStepper, getGPWorklog } from './utils';
import Evidence from './lib/Evidence';
import Return from './lib/forms/ReturnForm';
import LiveTracking from './lib/LiveTracking';
import useAction from './hooks/useActions';
import useStyles from './styles';
import UpdateActivity from './lib/UpdateActivity';
import Info from '@assets/Svg/Info';
import parseHtml from '@utils/htmlString';

const DetailGeneralProduct = (props) => {
  const classes = useStyles();
  const {
    data,
    fetchDetail,
    loading,
    modalLiveTracking,
    modalReturn,
    onClickModalReturn,
    onClickValidation,
    openModalLiveTracking,
    setPopUp,
    isPopUpOpen,
    referenceId,
    setModalLiveTracking,
    setModalReturn,
    visibilityUpdateActivity,
    setVisibilityUpdateActivity,
    onPreviewWorklog,
  } = useAction(props);

  const breadcrumb = [
    { label: 'General Product', url: route.generalProduct('list') },
    { label: referenceId || '-' },
  ];

  const action = () => {
    const actions = [];

    if (data && ['report checking'].includes(data.statusTicket)) {
      actions.push({
        variant: 'ghost',
        children: 'REJECT',
        onClick: onClickModalReturn(),
      });
      actions.push({
        children: 'VALIDATE',
        onClick: onClickValidation(referenceId),
      });
    }
    if (data && ['fault handling'].includes(data.statusTicket)) {
      actions.push({
        children: 'LIVE TRACKING ENGINEER',
        onClick: openModalLiveTracking(),
        variant: 'ghost',
      });
    }

    if (
      data &&
      [
        'fault analysis',
        'fault handling',
        'fault completion',
        'report completed',
      ].includes(data.statusTicket)
    ) {
      if (visibilityUpdateActivity.visible) {
        actions.push({
          children: 'UPDATE ACTIVITY',
          onClick: setPopUp({ type: 'updateActivity', open: true }),
          disabled:
            data.statusTicket == 'report completed' &&
            visibilityUpdateActivity.disable,
          // disabled: visibilityUpdateActivity.disable
        });
      }
    }

    return actions;
  };

  const detailSchema = (data, other) => {
    if (!data) {
      return [];
    }

    const schema = [
      {
        gridProps: { xs: 12, md: 6 },
        content: [
          {
            type: 'information',
            title: 'Service Information',
            properties: {
              data: data || {},
              schema: [
                { name: 'referenceId', label: 'Reference ID', grid: 12 },
                { name: 'serviceId', label: 'Service ID' },
                { name: 'ticketNumber', label: 'Ticket Number' },
                {
                  label: 'Approval Date',
                  name: 'approvalDate',
                  converter: dateFormatConverter({
                    type: 'date-time',
                    empty: '-',
                  }),
                },
                {
                  label: 'Completion Date',
                  name: 'completionDate',
                  converter: dateFormatConverter({
                    type: 'date-time',
                    empty: '-',
                  }),
                },
                { name: 'firstCall', label: 'First Call Resolution' },
                { name: 'productName', label: 'Product' },
                { name: 'address', label: 'Address' },
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
                { name: 'picNumber', label: 'PIC Contact' },
              ],
            },
          },
          {
            type: 'information',
            title: 'Detail Customer Report',
            properties: {
              data: data || {},
              schema: [
                { name: 'descriptionCustomer', label: 'Description', grid: 12 },
              ],
            },
          },
          {
            type: 'information',
            title: 'Fault Information',
            properties: {
              data: data || {},
              schema: [
                { name: 'urgency', label: 'Urgency' },
                { name: 'complaint', label: 'Hard Complain' },
                {
                  name: 'symptomName',
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
                { name: 'description', label: 'Description', grid: 12 },
                { name: 'occNote', label: `OCC's Note`, grid: 12 },
                { name: 'cause', label: `Root Cause`, grid: 12 },
                { name: 'resolution', label: `Action`, grid: 12 },
              ],
            },
          },
          {
            type: 'information',
            title: 'PIC Internal',
            properties: {
              data: data || {},
              schema: [
                { name: 'picName2', label: 'PIC Name' },
                { name: 'picNumber2', label: 'PIC Contact' },
              ],
            },
          },
          ...(data?.fileEvidence &&
          ['report rejected'].includes(data?.statusTicket)
            ? [
                {
                  type: 'numbering',
                  title: 'Evidence',
                  properties: {
                    data: [
                      {
                        rejectReason: data?.rejectReason,
                        fileEvidence: data?.fileEvidence,
                      },
                    ].map((item, i) => <Evidence data={item} key={i} />),
                    schema: true,
                  },
                },
              ]
            : []),
        ],
      },
      {
        gridProps: { xs: 12, md: 6 },
        stickRight: true,
        content: [
          ...(data?.estimatedTime
            ? [
                {
                  type: 'custom',
                  render: (
                    <div className={classes.boxEstimateTime}>
                      <Info color="#3071d9" />
                      <div>{parseHtml(data?.estimatedTime || '')}</div>
                    </div>
                  ),
                },
              ]
            : []),
          ...(data?.nps && ['report completed'].includes(data?.statusTicket)
            ? [
                {
                  type: 'information',
                  title: 'Net Promoter Score',
                  properties: {
                    data: data?.nps,
                    schema: [
                      {
                        name: 'rate',
                        label: 'Score',
                        grid: 'auto',
                        converter: (value) => (
                          <div
                            className={clsx(classes.boxNPS, {
                              [classes.boxNPSRed]: value < 8,
                              [classes.boxNPSYellow]: value === 8,
                              [classes.boxNPSYellow2]: value === 9,
                              [classes.boxNPSGreen]: value === 10,
                            })}
                          >
                            <Typography color="white" variant="h3">
                              {value}
                              <Typography color="white" variant="h5">
                                /10
                              </Typography>
                            </Typography>
                          </div>
                        ),
                      },
                      {
                        name: 'comment',
                        label: 'Impressions',
                        grid: 'auto',
                        converter: (value) => `"${value}"`,
                      },
                    ],
                  },
                },
              ]
            : []),
          {
            type: 'stepper',
            title: 'General Product Step',
            properties: {
              ...getGPStepper(data?.statusTicket),
              steps: [
                'Report Checking',
                'Report Issued',
                'Fault Analysis',
                'Fault Handling',
                'Fault Completion',
                'Report Completed',
              ],
            },
          },
          {
            type: 'worklog',
            title: 'History Work Log',
            properties: {
              data: getGPWorklog(data?.historyWorklog, other?.onPreviewWorklog),
            },
          },
        ],
      },
    ];

    return schema;
  };

  return (
    <>
      <Detail
        action={action()}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={Boolean(!data?.statusTicket)}
        schema={detailSchema(data, { onPreviewWorklog })}
        status={pickStatus[data?.statusTicket]}
      />
      <Return
        fetchDetail={fetchDetail}
        idOGD={data?.idOGD}
        modalReturn={modalReturn}
        refId={data?.referenceId}
        setModalReturn={setModalReturn}
      />
      <LiveTracking
        id={data?.ticketNumber}
        modalLiveTracking={modalLiveTracking}
        setModalLiveTracking={setModalLiveTracking}
      />
      <UpdateActivity
        detail={data}
        fetchDetail={fetchDetail}
        onClose={setPopUp({ type: 'updateActivity', open: false })}
        open={isPopUpOpen('updateActivity')}
        referenceId={referenceId}
        setVisibilityUpdateActivity={setVisibilityUpdateActivity}
      />
    </>
  );
};

DetailGeneralProduct.defaultProps = {
  feature: [],
};

DetailGeneralProduct.propTypes = {
  feature: PropTypes.array,
};

export default DetailGeneralProduct;
