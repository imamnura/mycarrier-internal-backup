import FileUpload from '@components/FileUpload';
import Table from '@components/Table';
import Typography from '@components/Typography';
import { Box, Flex, Text } from '@legion-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { LocalizationProvider, StaticDatePicker } from '@material-ui/pickers';
import calendarTheme from '@styles/calendarTheme';
import useResponsive from '@utils/hooks/useResponsive';
import moment from 'moment';
import React from 'react';
import CustomDateAdapter from './adapterMoment';
import PopUpListSubmittedCustomer from './elements/PopUpListSubmittedCustomer/PopUpListSubmittedCustomer';
import useAction from './hooks/useAction';
import useStyles from './styles';
import { dateFormat } from '@utils/parser';
import { LOCATOR } from '../../test-locator';

const PaymentHistorical = React.forwardRef((props, ref) => {
  const mobileClient = useResponsive('sm');

  const classes = useStyles({ mobileClient });

  const {
    containerRef,
    date,
    isNotToday,
    list,
    loading,
    onBottomPage,
    onClosePopUpListSubmit,
    onUpload,
    onUploadPayDocument,
    paymentFormula,
    popUpListSubmit,
    setDate,
  } = useAction(props, ref);

  const locatorTest = LOCATOR.sections.paymentHistory;

  return (
    <Box
      background="white"
      padding="24px 32px"
      radius="8px"
      shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
      mt="24px"
      id={locatorTest.rootId}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text size="24px" weight="700" color="secondary500">
          Customer Payment Historical
        </Text>
      </Box>
      <Flex
        mt="16px"
        padding="16px"
        border="1px solid #E4E7E9"
        radius="8px"
        alignX="space-between"
      >
        <Flex direction="column">
          <Text size="16px" weight="700" color="secondary500">
            Formulation Payment Document
          </Text>
          {paymentFormula ? (
            <Flex style={{ gap: 8, alignItems: 'center' }}>
              <Text size="14px" color="secondary300" weight="bold">
                {paymentFormula.fileName}
              </Text>
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '100%',
                  background: '#D2D8DA',
                }}
              />
              <Text size="14px" color="secondary300">
                Uploaded at{' '}
                {dateFormat({
                  date: paymentFormula.uploadDate,
                  type: 'date-time',
                })}
              </Text>
            </Flex>
          ) : (
            <Text size="14px" color="secondary300">
              No file uploaded. Upload xls, xlsx document, max 5 MB
            </Text>
          )}
        </Flex>
        <div>
          <label
            className={classes.uploadButton}
            htmlFor="payDocument"
            id={locatorTest.formula}
          >
            <Text size="14px" weight="700" color="primary500">
              UPLOAD
            </Text>
          </label>
          <input
            accept=".xls, .xlsx, .csv"
            hidden
            id="payDocument"
            onChange={onUploadPayDocument}
            onClick={(e) => (e.target.value = '')}
            type="file"
          />
        </div>
      </Flex>
      <div className={classes.container} ref={containerRef}>
        <div className={classes.calendarSection}>
          <ThemeProvider theme={calendarTheme({ isMobile: mobileClient })}>
            <LocalizationProvider
              dateAdapter={CustomDateAdapter}
              locale="en-US"
            >
              <div id={locatorTest.calendar}>
                <StaticDatePicker
                  autoOk
                  displayStaticWrapperAs="desktop"
                  id="startPick"
                  maxDate={new Date()}
                  onChange={setDate}
                  showDaysOutsideCurrentMonth
                  value={date}
                  views={['date']}
                />
              </div>
            </LocalizationProvider>
          </ThemeProvider>
          <Box p={3}>
            <Box
              style={{
                marginTop: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                padding: '24px',
                maxWidth: 400,
              }}
            >
              <Typography color="general-mid" variant="h5" weight="bold">
                Upload Payment History - {moment(date).format('DD MMM YYYY')}
              </Typography>
              <div>
                <Typography color="general-mid">Bank BNI</Typography>
                <FileUpload
                  accept={['.csv']}
                  disabled={
                    isNotToday ||
                    loading.tableRoot ||
                    !!list?.meta?.files?.BNI?.fileUrl
                  }
                  helperText="Upload .csv document, max 5 MB"
                  maxSize={5242880}
                  onChange={onUpload('BNI')}
                  placeholder="Example: payment historical.csv"
                  value={
                    list?.meta?.files?.BNI?.fileNameOrigin
                      ? {
                          fileName: list?.meta?.files?.BNI?.fileNameOrigin,
                          fileUrl: list?.meta?.files?.BNI?.fileUrl,
                        }
                      : undefined
                  }
                  withDelete={false}
                  id={locatorTest.uploadBni}
                />
              </div>
              <div>
                <Typography color="general-mid">Bank Mandiri</Typography>
                <FileUpload
                  accept={['.csv']}
                  disabled={
                    isNotToday ||
                    loading.tableRoot ||
                    !!list?.meta?.files?.Mandiri?.fileUrl
                  }
                  helperText="Upload .csv document, max 5 MB"
                  maxSize={5242880}
                  onChange={onUpload('Mandiri')}
                  placeholder="Example: payment historical.csv"
                  value={
                    list?.meta?.files?.Mandiri?.fileNameOrigin
                      ? {
                          fileName: list?.meta?.files?.Mandiri?.fileNameOrigin,
                          fileUrl: list?.meta?.files?.Mandiri?.fileUrl,
                        }
                      : undefined
                  }
                  withDelete={false}
                  id={locatorTest.uploadMandiri}
                />
              </div>
            </Box>
          </Box>
        </div>
        <Box style={{ flexGrow: 1, overflow: 'auto' }}>
          <Table
            customStyles={{
              root: {
                borderTopRightRadius: mobileClient ? 0 : 8,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: mobileClient ? 8 : 0,
                maxWidth: '100%',
                height: 640,
                marginTop: -1,
                martginRight: -1,
              },
              pageInformation: {
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: mobileClient ? 8 : 0,
              },
            }}
            data={list.data}
            emptyMessage={{
              description:
                'The data will appear when the customer payment history has been uploaded',
              maxWidth: 320,
              message: 'There is no history',
              size: 'small',
            }}
            loading={loading.tableRow}
            loadingRoot={loading.tableRoot}
            maxHeight={640}
            meta={list.meta}
            onBottomPage={onBottomPage}
            schema={[
              {
                name: 'companyName',
                label: 'COMPANY NAME',
              },
              {
                name: 'bpNumber',
                label: 'BP NUMBER',
              },
              {
                name: 'type',
                label: 'PAYMENT',
              },
              {
                name: 'status',
                label: 'STATUS',
                schemaStatus: {
                  sent: 'success',
                  failed: 'danger',
                },
              },
            ]}
          />
        </Box>
      </div>
      <PopUpListSubmittedCustomer
        onClose={onClosePopUpListSubmit}
        {...popUpListSubmit}
      />
    </Box>
  );
});

export default PaymentHistorical;
