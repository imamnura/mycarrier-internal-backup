import React from 'react';
import { Box, Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import { dateFormat } from '@utils/parser';
import _ from 'lodash';
import { dateFormatConverter } from '@utils/converter';
import KeyData from './lib/KeyData';
import OrderItem from './lib/OrderItem';
import PartnerInformation from './lib/PartnerInformation';
import CustomNoData from '@assets/ilustration-v2/CustomNoData';
import { Text } from '@legion-ui/core';
import Dropdown from '@components/Dropdown';
import Button from '@components/Button';
import Download from '@assets/icon-v2/Download';
import PICInformation from './lib/PICInformation';
import { Alert } from '@material-ui/lab';
import InformationIcon from '@assets/icon-v2/Information';

export const keyDataSchema = (hasSecretKey) => {
  const schema = [{ name: 'apiKey', label: 'API Key' }];
  if (hasSecretKey) schema.push({ name: 'secretKey', label: 'Secret Key' });

  return schema;
};

export const statusLabel = {
  'am approval': 'am approval',
  'am approved': 'approved',
  'am returned': 'returned',
  approved: 'completed',
  actived: 'completed',
  'baso signed': 'baso signed',
  checking: 'checking',
  completed: 'completed',
  'order created': 'order created',
  confirmation: 'confirmation',
  'customer agreement': 'customer agreement',
  'customer returned': 'returned',
  'delay order': 'delay order',
  'creating order in NCX': 'creating order in NCX',
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
  failed: 'failed',
};

export const statusVariant = {
  'am approval': 'primary',
  approved: 'success',
  'baso signed': 'warning',
  checking: 'primary',
  completed: 'success',
  'order created': 'success',
  confirmation: 'warning',
  'customer agreement': 'warning',
  'delay order': 'warning',
  'creating order in NCX': 'warning',
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
  'billing verified': 'primary',
  'partially paid': 'success',
  'fully paid': 'success',
  unpaid: 'warning',
  failed: 'danger',
};

export const getPurchaseOrderSteper = (data, steps = [], activeSteps = 0) => {
  let errors = undefined;
  let errorsLabel = undefined;

  if (data?.status?.includes('returned')) {
    errors = 'returned';
  } else if (data?.status?.includes('rejected')) {
    errors = 'rejected';
  } else if (data?.status?.includes('failed')) {
    errors = 'rejected';
    errorsLabel = 'Failed';
  }

  return {
    steps,
    active: activeSteps,
    errorsLabel,
    errors,
  };
};

export const generateWorklogNote = (
  { note, noteProgress, file },
  onPreviewWorklog,
) => {
  if (noteProgress && file?.length > 0) {
    return (
      <>
        {note && (
          <Typography children={note} color="general-mid" variant="caption" />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}

        {file?.fileUrl ||
          (file[0]?.fileUrl && (
            <Box display="block">
              <Typography color="general-mid" variant="caption">
                See&nbsp;
              </Typography>
              <Typography
                color="blue-main"
                onClick={onPreviewWorklog(file?.fileUrl ? file : file[0])}
                style={{ cursor: 'pointer' }}
                variant="caption"
              >
                attachment here.
              </Typography>
            </Box>
          ))}
      </>
    );
  } else if (noteProgress) {
    return (
      <>
        {note && (
          <Typography children={note} color="general-mid" variant="caption" />
        )}
        {noteProgress && (
          <Box display="block">
            <Typography color="general-mid" variant="caption">
              Note: &ldquo;{noteProgress}&rdquo;
            </Typography>
          </Box>
        )}
      </>
    );
  } else if (note) {
    return note;
  } else {
    return '';
  }
};

export const getPurchaseOrderWorklog = (worklog, onPreviewWorklog) => {
  return worklog
    ?.map(({ status, dateTime, note, noteProgress }) => {
      const statusLabel =
        {
          //rewording worklog FABD
          checking: 'AM-DWS-RWS | CHECKING',
          rejected: 'AM-DWS-RWS | REJECTED',
          submitted: 'CUSTOMER | SUBMITTED',
          completed: 'PO COMPLETED',
          'order created': 'ORDER CREATED',
          'customer returned': 'AM-DWS-RWS | RETURNED',
          'baso signed': 'DIG-DELIVERY-OR-AM | BASO SIGNED',
          'segment approval': 'MGR-SEGMENT-SUPPORT | APPROVED',
          'segment returned': 'MGR-SEGMENT-SUPPORT | RETURNED',
          'am approval': 'AM-DWS-RWS | APPROVED',
          'am returned': 'AM-DWS-RWS | RETURNED',
          'am rejected': 'AM-DWS-RWS | REJECTED',
          'delivery approval': 'DIGITAL-DELIVERY | APPROVED',
          'delivery returned': 'DIGITAL-DELIVERY | RETURNED',
          'provisioning confirmation': 'PARTNER | PROVISIONING CONFIRMATION',
          'FAB completed': 'PRODUCT-OWNER | PROVCOMP FABD',
          'FAB installed': 'PRODUCT-OWNER | PROVISIONING INSTALLATION FABD',
          'FAB checked': 'PRODUCT-OWNER | PROVISIONING FABD',
          'bakes created': 'AM-DWS-RWS | BAKES CREATED',
          confirmation: 'CONFIRMATION | NEED CUSTOMER CONFIRMATION',

          //msight
          'operator checking': 'TELKOMREG-DELIVERY | APPROVED',
          'operator approval': 'CUSTOMER | AGREEMENT',
          'operator returned': 'OPERATOR | RETURNED',
          'customer agreement': 'OPERATOR | CHECKED',

          //modify - disconnect - ncx - others
          provisioning: 'TELKOMREG-DELIVERY | APPROVED',
          'provisioning started': 'PROVISIONING | STARTED',
          'provisioning completed': 'PROVISIONING | COMPLETED',
          'delay order': 'DELAY ORDER | ORDER DELAYED',
          'creating order in NCX': 'CREATING ORDER IN NCX',
          'baso signed customer': 'BASO SIGNED | NEED CUSTOMER SIGNED',
          'baso completed': 'BASO SIGNED | BASO COMPLETED',
          'admin approval': 'TELKOMREG-ADMIN | APPROVED',
          'admin returned': 'TELKOMREG-ADMIN | RETURNED',
          'wds approval': 'TELKOMREG-AM | APPROVED',
          'wds returned': 'TELKOMREG-WDS | RETURNED',
          'wds approved': 'TELKOMREG-WDS | APPROVED',
          failed: 'NCX | FAILED',
        }[status] || '';

      return {
        date: dateFormat({ date: dateTime, type: 'date-time-full' }),
        note: generateWorklogNote({ note, noteProgress }, onPreviewWorklog),
        status: statusLabel,
      };
    })
    .reverse();
};

const normalizeSchemaInformation = (data, worklog) =>
  _.map(data, (innerValue, innerKey) => {
    let converter;
    let keyName = innerKey;
    let hidden = _.isPlainObject(innerValue);
    let grid = String(innerValue)?.length > 28 ? 12 : 6;

    if (['masterAgreementNumber'].includes(innerKey)) {
      keyName = 'masterAgreementNumber.agreeNumber';
      hidden = false;
    }

    if (
      ['mrc', 'otc', 'monthlyRecurringCharge', 'oneTimeCharge'].includes(
        innerKey,
      )
    ) {
      grid = 6;
      converter = (v) => (
        <Box mb={1}>
          <Typography children={v || '-'} variant="h4" weight="medium" />
        </Box>
      );
    }

    if (['ncxOrderNumber'].includes(innerKey)) {
      grid = 12;
      hidden = !innerValue;
      converter = (v) => (
        <Typography children={v || '-'} variant="h4" weight="medium" />
      );
    }

    if (
      innerKey.toLowerCase().includes('date') ||
      ['couponCodeExpiredAt', 'trialExpiredAt'].includes(innerKey)
    ) {
      converter = dateFormatConverter({ type: 'date-time', empty: '-' });
    }

    if (['bandwidth'].includes(innerKey)) {
      converter = (v) => `${v} Mbps`;
    }

    if (['listPic'].includes(innerKey)) {
      grid = 12;
      hidden = !worklog.some((v) => v.status === 'delivery approval');
      converter = (v) => <PartnerInformation data={v} />;
    }

    return {
      name: keyName,
      label: _.startCase(innerKey),
      grid: grid,
      converter: converter,
      hidden: hidden,
    };
  });

export const normalizeObjectToSchema = (data, router) => {
  let schemaDetail = [];
  const productFlow = data?.productFlow?.toLowerCase();

  const orderId = data?.orderInformation?.orderId;

  if (!(typeof data !== 'object' || Array.isArray(data))) {
    const excludeData = ['drafted', 'product', 'totalPrice'];
    let filteredData = _.pickBy(
      data,
      (value, key) => _.isPlainObject(value) && !excludeData.includes(key),
    );

    schemaDetail = _.map(filteredData, (value, key) => {
      let content;
      let type = 'information';
      let hidden;

      content = {
        properties: {
          data: value,
          schema: normalizeSchemaInformation(value, data?.worklog),
        },
      };

      if (key.includes('accountManager')) {
        if (Array.isArray(value?.list)) {
          type = 'numbering';
          hidden = !value?.list?.length;
          content = {
            properties: {
              data: value?.list,
              schema: normalizeSchemaInformation(_.omit(value?.list[0], 'id')),
            },
          };
        } else {
          hidden = !value?.list;
          content = {
            properties: {
              data: value?.list,
              schema: normalizeSchemaInformation(value.list),
            },
          };
        }
      }

      if (['documentAttachment'].includes(key)) {
        type = 'attachment';
        hidden = _.every(value, _.isEmpty);
      }

      if (['keyData'].includes(key)) {
        type = 'custom';
        content = {
          render: (
            <KeyData data={data} schema={keyDataSchema(!!value?.secretKey)} />
          ),
        };
      }

      if (['orderItem'].includes(key)) {
        type = 'custom';
        content = {
          render: <OrderItem data={value} productFlow={productFlow} />,
        };
      }

      if (['picInformation', 'pic'].includes(key)) {
        type = 'custom';
        hidden = !(
          value?.accountManager?.list?.length > 0 ||
          value?.segment?.list?.length > 0 ||
          value?.delivery?.list?.length > 0
        );
        content = {
          render: <PICInformation data={value} />,
        };
      }

      return {
        title: _.startCase(
          ['picInformation', 'pic'].includes(key) ? 'PIC Information' : key,
        ),
        type: type,
        hidden: hidden,
        ...content,
      };
    });
  }

  // Cari item dengan title === "Order Information" dan type === "information" dan orderType: Change Ownership
  schemaDetail = schemaDetail.map((item) => {
    if (
      item.title === 'Order Information' &&
      item.type === 'information' &&
      item.properties?.schema &&
      item.properties?.data?.orderType === 'Change Ownership'
    ) {
      // Show alert history
      return {
        ...item,
        properties: {
          ...item.properties,
          schema: [
            ...item.properties.schema,
            {
              converter: () => (
                <Box>
                  <Alert
                    style={{
                      background: '#F5F7FF',
                      minHeight: 48,
                      borderRadius: 8,
                      borderColor: '#3366FF',
                      padding: '8px',
                      display: 'block',
                    }}
                    icon={false}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <InformationIcon
                          style={{ height: 24, width: 24, color: '#3366FF' }}
                        />
                        <Typography
                          variant="subtitle2"
                          style={{ color: '#3366FF' }}
                        >
                          This order has undergone changes. You can view the
                          details and history here.
                        </Typography>
                      </Box>

                      <Button
                        variant={'outline'} //solid
                        onClick={() => {
                          router.push(
                            `/dashboard/purchase-order/change-ownership/history/${orderId}`,
                          );
                        }}
                        disabled={false}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: 700 }}>
                          View Details
                        </span>
                      </Button>
                    </Box>
                  </Alert>
                </Box>
              ),
              grid: 12,
              hidden: false,
              label: '',
              name: 'test',
            },
          ],
        },
      };
    }
    return item;
  });

  return schemaDetail;
};

export const optionsDuration = (duration, type) => {
  const options = [];

  for (let i = 1; i <= duration; i++) {
    options.push({
      label: `${i} ${type}${i > 1 ? 's' : ''}`,
      value: `${i}`,
    });
  }

  return options;
};

export const optionsFilterStatus = [
  { label: 'All Status', value: '' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Billing Verified', value: 'billingVerified' },
  { label: 'Partially Paid', value: 'partiallyPaid' },
  { label: 'Fully Paid', value: 'fullyPaid' },
];

export const emptyMessageTableBillingInformation = (
  <Box
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '100%',
      justifyContent: 'center',
      width: '100%',
      left: 0,
      margin: '216px 0',
    }}
  >
    <CustomNoData />
    <Typography weight="bold" color="general-main" variant="h5">
      There is no billing information yet
    </Typography>
    <Typography color="general-main" variant="paragraph">
      Billing info is currently unavailable. Please check back later
    </Typography>
  </Box>
);

export const headerAndFilterBillingInformation = (listProps, list, action) => {
  return (
    <>
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        style={{ marginBottom: '10px' }}
      >
        <Text color="secondary500" as="h6" mb="16px">
          Billing Information
        </Text>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          {listProps.filter.map((filterItem, i) => {
            return (
              <Grid item key={`filterItem-${i}`} sm="auto" xs={6}>
                <Dropdown staticWidth={160} {...filterItem} />
              </Grid>
            );
          })}
          <Button
            variant={list?.data?.length > 0 ? 'outline' : 'solid'}
            onClick={action}
            disabled={list?.data?.length <= 0}
          >
            <Download />
            Download
          </Button>
        </div>
      </Grid>
    </>
  );
};

export const convertSeconds = (counter) => {
  const minutes = Math.floor((counter % 3600) / 60);
  const seconds = Math.floor(counter % 60);
  const hours = Math.floor(counter / 3600);

  return ` ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
};
