import React from 'react';
import PropType from 'prop-types';
import { Box, Flex } from '@legion-ui/core';
import { Dialog, DialogContent, DialogTitle, Divider } from '@material-ui/core';

import Button from '@components/Button';
import Typography from '@components/Typography';
import List from '@fragments/List';

import useAction from './hooks/useAction';

import useStyles from './styles';
import { captions } from './utils';
import { LOCATOR } from '@containers/BillsAndPayment/BillsAndPaymentManagement/Detail/test-locator';

const testLocator = LOCATOR.sections.list.actionButton;

const SendInvoiceEmail = (props) => {
  const { onClose, type } = props;

  const { dialogRoot } = useStyles();

  const {
    filter,
    onScrollList,
    search,
    selectedRow,
    table,
    onPrevious,
    onClickPreview,
  } = useAction(props);

  return (
    !!type && (
      <Dialog classes={{ paper: dialogRoot }} maxWidth="lg" open={!!type}>
        <DialogTitle>
          <Box pt="16px" mb="-16px" alignX="center">
            <Typography
              color="general-dark"
              inline
              variant="h5"
              weight="medium"
            >
              Select invoice that you want to send
            </Typography>
            <Typography color="general-mid" variant="caption">
              {captions[type]}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent onScroll={onScrollList} style={{ paddingBottom: 0 }}>
          <Box pl="2px" pr="2px">
            <List
              noMargin
              noPadding
              filter={filter}
              search={search}
              table={table}
              withTopDivider={false}
            />
          </Box>
        </DialogContent>
        <Flex alignX="center" alignY="center" pb="20px" pt="4px">
          <Button
            onClick={onClose}
            variant="ghost"
            mr={20}
            id={
              type === 'billingReminder'
                ? testLocator.sendBillingReminder.popup.cancel
                : testLocator.sendThanksLetter.popup.cancel
            }
          >
            Cancel
          </Button>
          {type === 'billingReminder' && (
            <>
              <Box height={'24px'} mr="20px">
                <Divider orientation="vertical" />
              </Box>
              <Button
                onClick={onPrevious}
                variant="ghost"
                mr={20}
                id={
                  type === 'billingReminder' &&
                  testLocator.sendBillingReminder.popup.previous
                }
              >
                Previous
              </Button>
            </>
          )}
          {/* <Button disabled={!selectedRow.length} onClick={onSubmit}> */}
          <Button
            disabled={!selectedRow.length}
            onClick={onClickPreview}
            id={
              type === 'billingReminder'
                ? testLocator.sendBillingReminder.popup.preview
                : testLocator.sendThanksLetter.popup.preview
            }
          >
            Preview
          </Button>
        </Flex>
      </Dialog>
    )
  );
};

SendInvoiceEmail.defaultProps = {
  type: 'billingReminder',
};

SendInvoiceEmail.propTypes = {
  onClose: PropType.func.isRequired,
  onPrevious: PropType.func.isRequired,
  type: PropType.oneOf(['billingReminder', 'thanksLetter', '']),
  updateSendLog: PropType.func.isRequired,
};

export default SendInvoiceEmail;
