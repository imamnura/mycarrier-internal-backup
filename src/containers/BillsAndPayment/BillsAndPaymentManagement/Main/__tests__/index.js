import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Index from '../index';
import useAction from '../hooks/useAction';
import { useRouter } from 'next/router';
import { cleanup } from '@testing-library/react-hooks';
import { route } from '@configs';

jest.mock('../hooks/useAction');
jest.mock('next/router');

describe('src/pages/BillsAndPayment/BillsAndPaymentManagement/Main/index', () => {
  afterEach(cleanup);

  beforeAll(() => {
    useRouter.mockReturnValue({
      asPath: route.billsAndPayment('dashboard'),
      query: { tab: 'dashboard' },
    });
  });

  test('render tab dashboard', () => {
    useAction.mockReturnValueOnce({
      setTab: jest.fn(),
      tab: 'dashboard',
      onRefresh: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Index feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab company-list', () => {
    useAction.mockReturnValueOnce({
      setTab: jest.fn(),
      tab: 'company-list',
      onRefresh: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Index feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
