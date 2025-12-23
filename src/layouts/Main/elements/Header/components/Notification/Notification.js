import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Popover } from '@material-ui/core';
import clsx from 'clsx';
import Baso from '@assets/icon-v2/Baso';
import Lba from '@assets/icon-v2/Lba';
import Link from '@assets/icon-v2/Link';
import NotificationOff from '@assets/icon-v2/NotificationOff';
import NotificationOn from '@assets/icon-v2/NotificationOn';
import Phone from '@assets/icon-v2/Phone';
import PurchaseOrder from '@assets/icon-v2/PurchaseOrder';
import SenderId from '@assets/icon-v2/SenderId';
import ServiceAssurance from '@assets/icon-v2/ServiceAssurance';
import UserManagement from '@assets/icon-v2/UserManagement';
import Skeleton from '@components/Skeleton/Skeleton';
import Typography from '@components/Typography';
import { ROUTES } from '@__old/configs';
import datetime from '@__old/utils/datetime';
import useResponsive from '@utils/hooks/useResponsive';
import useActions from './hooks/useActions';
import useStyles from './styles';
import { useRouter } from 'next/router';

const Notification = (props) => {
  const history = useRouter();
  const smClient = useResponsive('sm');

  const [open, _setOpen] = useState(props.open);
  const setOpen = (val) => (e) => {
    if (val) {
      _setOpen(e.currentTarget);
    } else {
      _setOpen(null);
    }
  };

  const { list, loading, onScrollContainer, onRead } = useActions({ open });

  const classes = useStyles({ smClient, open });

  const data = list.data?.map(
    ({ date, type, message, data, isRead, notificationId }) => {
      let property = {
        isRead,
        id: notificationId,
        redirect: '/',
        icon: Phone,
        title: 'title',
        date: datetime(date, 'date-time', '-'),
        content: message,
      };

      if (type === 'ticket-assurance-internal') {
        property.title = 'Assurance Ticket';
        property.icon = ServiceAssurance;
        property.redirect = ROUTES.FAULT_HANDLING_DETAIL(data?.ticketId);
        property.content = (
          <>
            <span style={{ color: '#DE1B1B', fontWeight: 'bold' }}>
              [{data?.ticketId}]
            </span>
            {message}
          </>
        );
      } else if (type === 'link-internal') {
        property.title = 'Link';
        property.icon = Link;
        property.redirect = ROUTES.LINK_ACTIVATION_DETAIL(data?.orderNumber);
      } else if (type === 'lba-internal') {
        property.title = 'LBA';
        property.icon = Lba;
        property.redirect = ROUTES.LBA_DETAIL(data?.orderNumber);
      } else if (type === 'sender-id-internal') {
        property.title = 'Sender ID';
        property.icon = SenderId;
        property.redirect = ROUTES.SENDER_ID_DETAIL(data?.orderNumber);
      } else if (type.includes('purchase-order')) {
        property.title = 'Purchase Order';
        property.icon = PurchaseOrder;
        property.content = (
          <span>
            You receive a <strong>Purchase Order</strong> (PO) from{' '}
            <strong>{data?.custAccntNum} </strong>
            with order number <strong>{data?.orderNumber}</strong>. Please check
            it.
          </span>
        );
        property.redirect = ROUTES.PURCHASE_ORDER_DETAIL(data?.orderNumber);
      } else if (type === 'activation-letter-internal') {
        property.title = 'BASO';
        property.icon = Baso;
        property.content = (
          <span>
            <strong>{data?.custAccntName}</strong> has assigned Berita Acara for
            <strong> {data?.productName}</strong> with
            <strong> {data?.orderNumber}</strong> - Berita Acara
            <strong>
              {' '}
              {data?.status === 'BA COMPLETE' ? 'Completed' : 'Not Completed'}
            </strong>
            . Please check it.
          </span>
        );
        property.redirect = ROUTES.BASO_DETAIL(data?.orderNumber);
      } else if (type === 'approval-user') {
        property.title = 'User Management';
        property.icon = UserManagement;
        property.content = (
          <span>
            {message} <strong> {data?.email} .</strong> Please check it.
          </span>
        );
        property.redirect = ROUTES.USER_MANAGEMENT_DETAIL(data?.userId);
      }

      return property;
    },
  );

  const renderData = !loading.root && (
    <>
      {data?.map(({ icon, title, date, content, redirect, isRead, id }) => {
        const Icon = icon;

        const onClickItem = () => {
          history.push(redirect);
          setOpen(false)();
          onRead(id);
        };

        return (
          <div
            className={clsx({
              [classes.item]: true,
              [classes.itemUnread]: !isRead,
            })}
            key={id}
            onClick={onClickItem}
          >
            <div className={classes.itemIcon}>
              <Icon className="icon" />
            </div>
            <div>
              <div className={classes.itemHeader}>
                <Typography children={title} variant="caption" weight="bold" />
                <div />
                <Typography
                  children={date}
                  color="general-light"
                  variant="caption"
                />
              </div>
              <Typography
                children={content}
                className={classes.itemContent}
                color="general-mid"
              />
            </div>
          </div>
        );
      })}
    </>
  );

  const generateLoading = (s) =>
    s && (
      <>
        {new Array(s).fill(null).map((l, k) => (
          <div className={classes.itemContainer} key={k}>
            <div className={classes.item}>
              <Box mr={2}>
                <Skeleton height={40} variant="circle" width={40} />
              </Box>
              <div>
                <div className={classes.itemHeader}>
                  <Skeleton height={14} width={60} />
                  <div />
                  <Skeleton height={14} width={120} />
                </div>
                <Skeleton height={14} />
                <Box paddingY={1}>
                  <Skeleton height={14} />
                </Box>
                <Skeleton height={14} />
              </div>
            </div>
          </div>
        ))}
      </>
    );

  const renderLoadingRoot = generateLoading(loading.root ? 10 : null);
  const renderLoadingRow = generateLoading(
    loading.row && !loading.root ? 2 : null,
  );

  return (
    <>
      <div className={classes.clickableIcon} onClick={setOpen(true)}>
        {list?.meta?.unclickNotif ? (
          <NotificationOn className="icon" />
        ) : (
          <NotificationOff className="icon" />
        )}
      </div>
      <Popover
        anchorEl={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.root }}
        onClose={setOpen(false)}
        open={!!open}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.header}>
          <Typography variant="h5" weight="medium">
            Notification
          </Typography>
        </div>
        <div className={classes.itemContainer} onScroll={onScrollContainer}>
          {renderLoadingRoot}
          {renderData}
          {renderLoadingRow}
        </div>
      </Popover>
    </>
  );
};

Notification.defaultProps = {
  open: null,
};

Notification.propTypes = {
  open: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Notification;
