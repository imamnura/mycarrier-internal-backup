import Button from '@components/Button';
import Tabs from '@components/Tabs';
import List from '@fragments/List';
import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useClaim from './hooks/useClaim';
import useInvoice from './hooks/useInvoice';
import usePayment from './hooks/usePayment';
import useReconciliation from './hooks/useReconciliation';
import useDunning from './hooks/useDunning';
import { isHaveAccess } from '@utils/common';
import { Box, Flex, Text } from '@legion-ui/core';
import { BillsAndPaymentDetailContext } from '@context/BillsAndPayment';
import { useRouter } from 'next/router';
import { LOCATOR } from '../../test-locator';

const testLocator = LOCATOR.sections.list;

// eslint-disable-next-line react/prop-types
export const ListContent = ({ useList, feature }) => {
  const { filter, search, table } = useList(feature);

  const listProps = {
    filter,
    search,
    table,
  };

  return <List noMargin noPadding {...listProps} withTopDivider={false} />;
};

const ListOfDocument = (props) => {
  const { tab, setTab } = useContext(BillsAndPaymentDetailContext);

  const router = useRouter();
  const { type } = router.query;

  let listContent = null;

  if (tab === 'invoice') {
    listContent = <ListContent key="invoice" useList={useInvoice} {...props} />;
  } else if (tab === 'payment') {
    listContent = <ListContent key="payment" useList={usePayment} {...props} />;
  } else if (tab === 'claim') {
    listContent = <ListContent key="claim" useList={useClaim} {...props} />;
  } else if (
    tab === 'reconciliation' &&
    isHaveAccess(props.feature, 'read_list_reconciliation')
  ) {
    listContent = (
      <ListContent
        key="reconciliation"
        useList={useReconciliation}
        {...props}
      />
    );
  } else if (
    tab === 'dunning' &&
    isHaveAccess(props.feature, 'read_list_dunning')
  ) {
    listContent = <ListContent key="dunning" useList={useDunning} {...props} />;
  }

  const {
    setSendInvoiceEmail,
    feature,
    setUpdatePeriod,
    setRemindingOption,
    setOpenCreateReconciliation,
  } = props;

  const listTab = [
    { label: 'Invoice', value: 'invoice', id: testLocator.invoice.tab },
    { label: 'Payment', value: 'payment', id: testLocator.payment.tab },
    { label: 'Claim', value: 'claim', id: testLocator.claim.tab },
    isHaveAccess(props.feature, 'read_list_dunning') && {
      label: 'Dunning',
      value: 'dunning',
      id: testLocator.dunning.tab,
    },
    isHaveAccess(props.feature, 'read_list_reconciliation') && {
      label: 'Reconciliation',
      value: 'reconciliation',
      id: testLocator.reconciliation.tab,
    },
  ].filter(Boolean);

  useEffect(() => {
    if (!type) {
      if (tab) {
        setTab(tab);
      } else {
        setTab('invoice');
      }
    } else {
      setTab(type);
    }
  }, [type]);

  return (
    <>
      <Flex alignX="space-between">
        <Text color="secondary500" weight="700" size="20px">
          List of Document
        </Text>
        <Flex alignY="center">
          {isHaveAccess(feature, 'update_periode_bill_and_payment') && (
            <Button onClick={setUpdatePeriod(true)} variant="ghost" mr={12}>
              update period
            </Button>
          )}
          {isHaveAccess(feature, 'update_thanks_letter') && (
            <Grid item sm="auto" xs={6}>
              <Button
                onClick={setSendInvoiceEmail('thanksLetter')}
                color="success"
                mr={12}
              >
                send thanks letter
              </Button>
            </Grid>
          )}
          {isHaveAccess(feature, 'create_document_reconciliation') && (
            <Grid item sm="auto" xs={6}>
              <Button
                onClick={setOpenCreateReconciliation(true)}
                mr={12}
                color="tertiary"
              >
                create reconciliation
              </Button>
            </Grid>
          )}
          {isHaveAccess(feature, 'update_send_billing_reminder') && (
            <Button
              onClick={setRemindingOption({ open: true, value: '' })}
              mr={12}
            >
              send billing reminder
            </Button>
          )}
        </Flex>
      </Flex>
      <Box mt="24px" mb="24px">
        <Tabs onChange={(v) => setTab(v)} options={listTab} value={tab} />
      </Box>
      {listContent}
    </>
  );
};

ListOfDocument.propTypes = {
  feature: PropTypes.array.isRequired,
  setRemindingOption: PropTypes.func.isRequired,
  setSendInvoiceEmail: PropTypes.func.isRequired,
  setUpdatePeriod: PropTypes.func.isRequired,
};

export default ListOfDocument;
