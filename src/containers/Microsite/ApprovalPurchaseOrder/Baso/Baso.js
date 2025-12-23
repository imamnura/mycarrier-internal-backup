import React, { Fragment } from 'react';
import { CircularProgress } from '@material-ui/core';
import NoData from '@assets/ilustration-v2/NoData';
import StateMessage from '@components/StateMessage';
import Microsite from '@layouts/Microsite';
import Content from '../../lib/Content-v2';
import useActions from './hooks/useActions';
import Button from '@components/Button';
import { Box } from '@material-ui/core';
import { Text } from '@legion-ui/core';

const Baso = () => {
  const { data, error, isLoading, schema } = useActions();

  const renderAdditionalContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text
        color="general-main"
        weight="700"
        size="14px"
        style={{ marginBottom: '8px' }}
      >
        This document is true and recorded in MyCarrier.
      </Text>
      <Text
        color="general-main"
        weight="400"
        size="14px"
        style={{ marginBottom: '8px' }}
      >
        Click on the button below for detail.
      </Text>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={() => window.open(`${data?.link}`, '_blank')}>
          CHECK APPROVED DOCUMENT
        </Button>
      </div>
    </Box>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      );
    }

    if (!data) {
      return (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '15vh' }}>
          <StateMessage {...error} ilustration={NoData} />
        </div>
      );
    }

    return (
      <Content
        data={data}
        header={{
          title: 'MyCarrier Approval Verification',
        }}
        label={`This BASO Document has been approved in MyCarrier by:`}
        schema={schema}
        additionalContent={renderAdditionalContent()}
      />
    );
  };

  return (
    <Fragment>
      <Microsite children={renderContent()} />
    </Fragment>
  );
};

export default Baso;
