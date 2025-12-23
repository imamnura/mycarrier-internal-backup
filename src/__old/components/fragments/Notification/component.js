import React, { useState, useEffect } from 'react';
import { Paper, Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import NavIcon from '../../elements/NavIcon';
import dateTime from '../../../utils/datetime';
import { ROUTES } from '../../../configs';
import Link from '../../elements/Link';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import clsx from 'clsx';

export default function Component(props) {
  const { classes, listNotification, onClose, actions, isLoading } = props;

  useEffect(() => {
    actions.clickNotification();
  }, []);

  const [page, setPage] = useState(2);

  const fetchData = () => {
    if (!isLoading) {
      actions.getNotification({
        oldData: listNotification.data,
        page: page,
        callback: ({ page }) => setPage(page),
      });
    }
  };

  const handleScroll = (e) => {
    const scroll = e.target;
    const { hasMore } = listNotification;
    if (
      scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight - 3 &&
      hasMore
    ) {
      fetchData();
    }
  };

  const item = (data) => (
    <Link to={data.link}>
      <Grid
        className={clsx(classes.body, {
          [classes.bodyUnread]: !data.isRead,
        })}
        container
        onClick={() => {
          onClose();
          actions.readNotification({ id: data.id, data: listNotification });
        }}
      >
        <Grid item xs={2}>
          <div className={classes.icon}>
            <NavIcon
              type={
                data.type === 'approval-user' ? 'userManagement' : data.type
              }
            />
          </div>
        </Grid>
        <Grid item xs={10}>
          <div style={{ display: 'flex' }}>
            <Text color="mainDark" variant="captionBold">
              {data.title}
            </Text>
            &nbsp;&nbsp;
            <Text color="softGrey" variant="caption">
              {data.date}
            </Text>
          </div>
          <Text className={classes.content} color="grey" variant="body2">
            {data.description}
          </Text>
        </Grid>
      </Grid>
    </Link>
  );

  const loading = [1, 2].map((item) => (
    <Grid className={classes.body} container key={item * 6.3} spacing={1}>
      <Grid item xs={2}>
        <Skeleton height={40} />
      </Grid>
      <Grid item xs={10}>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Grid>
    </Grid>
  ));

  return (
    <Paper className={classes.wrapper}>
      <Grid container>
        <Grid className={classes.header} item xs={12}>
          <Text variant="h5">Notification</Text>
        </Grid>
        <Grid
          className={classes.listWrapper}
          item
          onScroll={handleScroll}
          xs={12}
        >
          <div style={{ height: 16 }} />
          {listNotification.data.map(
            ({ date, type, message, data, isRead, notificationId }) => {
              let property = {
                title: '',
                type: '',
                link: '',
                description: message,
                date: dateTime(date, 'date-time'),
                isRead,
                id: notificationId,
              };

              if (type === 'ticket-assurance-internal') {
                property.title = 'Assurance Ticket';
                property.type = 'ticket';
                property.link = ROUTES.FAULT_HANDLING_DETAIL(data.ticketId);
                property.description = (
                  <>
                    <span style={{ color: '#DE1B1B', fontWeight: 'bold' }}>
                      {' '}
                      [{data.ticketId}]
                    </span>{' '}
                    {message}
                  </>
                );
              } else if (type === 'link-internal') {
                property.title = 'Link';
                property.type = 'link';
                property.link = ROUTES.LINK_ACTIVATION_DETAIL(data.orderNumber);
              } else if (type === 'lba-internal') {
                property.title = 'LBA';
                property.type = 'lba';
                property.link = ROUTES.LBA_DETAIL(data.orderNumber);
              } else if (type === 'sender-id-internal') {
                property.title = 'Sender ID';
                property.type = 'sender';
                property.link = ROUTES.SENDER_ID_DETAIL(data.orderNumber);
              } else if (type.includes('purchase-order')) {
                property.title = 'Purchase Order';
                property.type = 'purchaseOrder';
                property.description = (
                  <span>
                    You receive a <strong>Purchase Order</strong> (PO) from{' '}
                    <strong>{data.custAccntNum}</strong> with order number{' '}
                    <strong>{data.orderNumber}</strong>. Please check it.
                  </span>
                );
                property.link = ROUTES.PURCHASE_ORDER_DETAIL(data.orderNumber);
              } else if (type === 'activation-letter-internal') {
                property.title = 'BASO';
                property.type = 'baso';
                property.description = (
                  <span>
                    <strong>{data.custAccntName}</strong> has assigned Berita
                    Acara for
                    <strong> {data.productName}</strong> with
                    <strong> {data.orderNumber}</strong> - Berita Acara
                    <strong>
                      {' '}
                      {data.status === 'BA COMPLETE'
                        ? 'Completed'
                        : 'Not Completed'}
                    </strong>
                    . Please check it.
                  </span>
                );
                property.link = ROUTES.BASO_DETAIL(data.orderNumber);
              } else if (type === 'approval-user') {
                property.title = 'User Management';
                property.type = 'approval-user';
                property.description = (
                  <span>
                    {message} <strong> {data?.email} .</strong> Please check it.
                  </span>
                );
                property.link = ROUTES.USER_MANAGEMENT_DETAIL(data?.userId);
              }

              return item(property);
            },
          )}
          {isLoading && loading}
        </Grid>
      </Grid>
    </Paper>
  );
}

Component.defaultProps = {
  actions: {},
  classes: {},
  isLoading: false,
  listNotification: {},
};

Component.propTypes = {
  actions: PropTypes.object,
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  listNotification: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
