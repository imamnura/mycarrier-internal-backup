import React from 'react';
import PropTypes from 'prop-types';
import Detail from '@fragments/Detail';
import useAction from './hooks/useAction';
import { route } from '@configs';
import { rupiahFormat } from '@utils/parser';
import ListOfDocument from './elements/ListOfDocument';
import SendInvoiceEmail from './elements/SendInvoiceEmail';
import UpdatePeriod from './elements/UpdatePeriod';
import RemindingOption from './elements/RemindingOption/RemindingOption';
import { Box, Flex, Text } from '@legion-ui/core';
import Information from '@components/Information';
import useDetailStyles from './Detail.styles';
import color from '@styles/color';
import useResponsive from '@utils/hooks/useResponsive';
import PICProfileRefactor from './elements/PICProfileRefactor';
import Image from './lib/Image/image';
import PopupCreateReconciliation from './elements/PopupCreateReconciliation';
import Button from '@components/Button';
import Download from '@assets/icon-v2/Download';
import DownloadOsBalance from './elements/DownloadOsBalance';
import { LOCATOR } from './test-locator';

const testLocator = LOCATOR;

const DetailBillsAndPaymentManagement = (props) => {
  const smClient = useResponsive('sm');
  const classes = useDetailStyles({ smClient });
  const {
    bpNumber,
    data,
    feature,
    loading,
    sendInvoiceEmail,
    setSendInvoiceEmail,
    setUpdatePeriod,
    updatePeriod,
    updatePicProfile,
    remindingOption,
    setRemindingOption,
    onSubmitRemindingOption,
    handleAddIcon,
    fileIcon,
    openCreateReconciliation,
    setOpenCreateReconciliation,
    popupDownloadOsBalance,
    setPopupDownloadOsBalance,
  } = useAction(props);

  const breadcrumb = [
    { label: 'Bills & Payment Management', url: route.billsAndPayment('list') },
    { label: bpNumber || '-' },
  ];

  const detailSchema = [
    {
      gridProps: { xs: 12, md: 12 },
      content: [
        {
          type: 'custom',
          title: 'Customer Information',
          id: testLocator.sections.customerInformation.id,
          render: (
            <Box className={classes.gridContainer}>
              <Box>
                <Flex
                  alignX="space-between"
                  alignY="center"
                  pr="32px"
                  style={{
                    width: '100%',
                    padding: '0',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box pt="16px">
                    <Image
                      alt={'Logo Customer'}
                      getUpdateItem={handleAddIcon}
                      isValidateByPixel={true}
                      value={fileIcon}
                      key={Date.now()}
                      maxSize={2048000} //2Mb = 2000x1024
                      ratioPixel={[200, 200]}
                      sectionName="Logo Customer"
                      bpNumber={bpNumber}
                      wordingImage="Upload Cust logo .png .jpg"
                      wordingVariant="caption"
                      id={testLocator.sections.customerInformation.customerLogo}
                    />
                  </Box>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      width: '80%',
                    }}
                  >
                    <Box pt="16px" style={{ width: '50%' }}>
                      <Information label="Customer" value={data?.companyName} />
                    </Box>
                    <Box pt="16px" style={{ width: '50%' }}>
                      <Information label="BP Number" value={data?.bpNumber} />
                    </Box>
                    <Box pt="16px" style={{ width: '100%' }}>
                      <Information
                        label="Address"
                        value={data?.companyAddress}
                      />
                    </Box>
                  </div>
                </Flex>
              </Box>
              <Box
                className={classes.osBalanceBg}
                id={testLocator.sections.customerInformation.osBalance.id}
              >
                <Box style={{ flexDirection: 'column', display: 'flex' }}>
                  <Text color="secondary500" weight="700" size="14px">
                    O/S Balance
                  </Text>
                  <Text size={'30px'} weight="700" color={color.primary.main}>
                    {rupiahFormat(data?.currentBill)}
                  </Text>
                </Box>
                <Box>
                  <Button
                    onClick={() => setPopupDownloadOsBalance(true)}
                    variant="ghost"
                    leftIcon={Download}
                    style={{ background: 'transparent' }}
                    center
                    id={
                      testLocator.sections.customerInformation.osBalance
                        .download.action
                    }
                  />
                </Box>
              </Box>
            </Box>
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 4 },
      style: { height: '100%' },
      content: [
        {
          id: testLocator.sections.pic.am.id,
          style: { height: '100%' },
          type: 'custom',
          render: (
            <PICProfileRefactor
              data={data?.amPic}
              feature={['']}
              type="am"
              testLocator={testLocator.sections.pic.am}
            />
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 4 },
      style: { height: '100%' },
      content: [
        {
          id: testLocator.sections.pic.customer.id,
          type: 'custom',
          style: { height: '100%' },
          render: (
            <>
              <PICProfileRefactor
                data={data?.pic}
                feature={feature}
                type="customer"
                updatePicProfile={updatePicProfile}
                companyName={data?.companyName}
                testLocator={testLocator.sections.pic.customer}
              />
            </>
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12, md: 4 },
      style: { height: '100%' },
      content: [
        {
          id: testLocator.sections.pic.cdm.id,
          type: 'custom',
          style: { height: '100%' },
          render: (
            <>
              <PICProfileRefactor
                data={data?.cdmPic}
                feature={feature}
                type="cdm"
                updatePicProfile={updatePicProfile}
                testLocator={testLocator.sections.pic.cdm}
              />
            </>
          ),
        },
      ],
    },
    {
      gridProps: { xs: 12 },
      content: [
        {
          type: 'custom',
          render: (
            <ListOfDocument
              feature={feature}
              setRemindingOption={setRemindingOption}
              setSendInvoiceEmail={setSendInvoiceEmail}
              setUpdatePeriod={setUpdatePeriod}
              setOpenCreateReconciliation={setOpenCreateReconciliation}
            />
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Detail
        // action={action}
        breadcrumb={breadcrumb}
        loading={loading}
        notFound={!data}
        schema={detailSchema}
      />
      {/* <HistorySendLog
        data={data?.historyLog}
        onClose={setOpenHistoryLog(false)}
        open={openHistoryLog}
      /> */}
      <RemindingOption
        onClose={setRemindingOption({ open: false, value: '' })}
        onSubmit={onSubmitRemindingOption}
        open={remindingOption.open}
        value={remindingOption.value}
      />
      <SendInvoiceEmail
        onClose={setSendInvoiceEmail('')}
        onPrevious={setRemindingOption({
          open: open,
          value: remindingOption.value,
        })}
        type={sendInvoiceEmail}
      />
      <UpdatePeriod onClose={setUpdatePeriod(false)} open={updatePeriod} />
      <PopupCreateReconciliation
        onClose={setOpenCreateReconciliation(false)}
        open={openCreateReconciliation}
      />
      <DownloadOsBalance
        onClose={() => setPopupDownloadOsBalance(false)}
        open={popupDownloadOsBalance}
      />
    </>
  );
};

DetailBillsAndPaymentManagement.defaultProps = {
  feature: [],
};

DetailBillsAndPaymentManagement.propTypes = {
  feature: PropTypes.array,
};

export default DetailBillsAndPaymentManagement;
