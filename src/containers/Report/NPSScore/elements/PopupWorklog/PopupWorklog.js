import React from 'react';
import { Modal, Text } from '@legion-ui/core';
import Worklog from '@components/Worklog';
import NoData from '@assets/ilustration-v2/NoData';
import usePopupWorklog from './PopupWorklog.hook';
import useFollowupPopup from './PopupWorklog.styles';
const PopupWorklog = (props) => {
  const { data, show, onClose } = props;
  const { normalizedData } = usePopupWorklog(data);
  const classes = useFollowupPopup();

  return (
    <Modal show={show} title="Work Log" onClose={onClose}>
      {data.length > 0 ? (
        <Worklog data={normalizedData} />
      ) : (
        <div className={classes.noData}>
          <NoData className={classes.noDataContent} />
          <br />
          <Text variant="h5">There is no worklog yet</Text>
        </div>
      )}
    </Modal>
  );
};

export default PopupWorklog;
