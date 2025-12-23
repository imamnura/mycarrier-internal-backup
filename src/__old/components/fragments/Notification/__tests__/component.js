import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Notification from '../component';

describe('src/components/fragments/Notification', () => {
  const props = {
    onClose: jest.fn(),
    actions: {
      clickNotification: jest.fn(),
      getNotification: jest.fn(),
      readNotification: jest.fn(),
    },
    listNotification: {
      data: [
        {
          type: 'ticket-assurance-internal',
          data: { ticketId: 'ticket id' },
        },
        {
          type: 'link-internal',
          data: { orderNumber: 'order number' },
        },
        {
          type: 'lba-internal',
          data: { orderNumber: 'order number' },
        },
        {
          type: 'sender-id-internal',
          data: { orderNumber: 'order number' },
        },
        {
          type: 'purchase-order-internal',
          data: { orderId: 'order id' },
        },
        {
          type: 'activation-letter-internal',
          data: { orderNumber: 'order number' },
        },
        {
          type: 'approval-user',
          data: { userId: 'user id' },
        },
      ],
    },
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Notification {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render isLoading true', () => {
    const customProps = {
      ...props,
      isLoading: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Notification {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
