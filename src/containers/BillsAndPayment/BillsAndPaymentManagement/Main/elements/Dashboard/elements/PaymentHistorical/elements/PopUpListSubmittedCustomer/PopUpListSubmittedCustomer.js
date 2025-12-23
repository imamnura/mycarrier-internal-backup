/* eslint-disable react/prop-types */
import Trash from '@assets/icon-v2/Trash';
import Button from '@components/Button/Button';
import ButtonMinimal from '@components/ButtonMinimal';
import Dropdown from '@components/Dropdown';
import Table from '@components/Table';
import Typography from '@components/Typography';
import { Box, Dialog, IconButton } from '@material-ui/core';
import { dateFormat } from '@utils/parser';
import useAction from './hooks/useAction';
import useStyles from './styles';

const PopUpListSubmittedCustomer = (props) => {
  const { type, open, onClose, date, failed = [] } = props;

  const classes = useStyles();

  const {
    companyName,
    companyNameAsyncProps,
    data,
    onAddNewData,
    onDeleteData,
    setCompanyName,
    newData,
    onSubmitNewData,
    onCancelNewData,
    onSend,
  } = useAction(props);

  const tableData = data.map((d, i) => ({
    ...d,
    action: (
      <IconButton onClick={onDeleteData(i)}>
        <Trash className={classes.deleteIcon} />
      </IconButton>
    ),
  }));

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      keepMounted={false}
      maxWidth="lg"
      open={open}
      scroll="body"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          List of customers to be notified on{' '}
          {dateFormat({ date, type: 'full-string-date' })} - {type}
        </Typography>
        <Box mt={1}>
          <Typography color="general-mid">
            Customers will receive a payment notification after it has been sent
          </Typography>
        </Box>
      </Box>
      <Box className={classes.tableContainer}>
        <Table
          data={tableData}
          maxHeight={400}
          meta={{
            totalData: data.length,
            totalPage: 1,
            size: data.length,
            page: 1,
          }}
          schema={[
            {
              name: 'companyName',
              label: 'COMPANY NAME',
              cellStyle: {
                maxWidth: 140,
              },
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
              name: 'action',
            },
          ]}
        />
      </Box>

      {!newData ? (
        <Box>
          <ButtonMinimal
            label="ADD ANOTHER CUSTOMER"
            onClick={onAddNewData}
            variant="add"
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Dropdown
            asyncProps={companyNameAsyncProps}
            isSearchable
            label="Company Name"
            maxWidth="100%"
            menuPosition="fixed"
            menuWidth={320}
            minWidth={240}
            onChange={setCompanyName}
            placeholder="Choose Company Name"
            rawValue
            value={companyName}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button onClick={onCancelNewData} variant="ghost">
              X
            </Button>
            <Button disabled={!companyName} onClick={onSubmitNewData}>
              ADD
            </Button>
          </Box>
        </Box>
      )}
      {!!failed.length && (
        <Box className={classes.failedContainer}>
          <Typography color="general-dark" inline variant="h5" weight="medium">
            {failed.length} customers failed to be included
          </Typography>
          <Typography color="general-mid" variant="caption">
            These customers will not get a payment notification when you press
            the &quot;Send&quot; button
          </Typography>
          <Table
            data={failed}
            maxHeight={400}
            meta={{
              totalData: failed.length,
              totalPage: 1,
              size: failed.length,
              page: 1,
            }}
            schema={[
              {
                name: 'rowNumber',
                label: 'Row Number',
              },
              {
                name: 'description',
                label: 'Description',
              },
            ]}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', gap: 16, justifyContent: 'center', mt: 4 }}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button onClick={onSend}>SEND</Button>
      </Box>
    </Dialog>
  );
};

export default PopUpListSubmittedCustomer;
