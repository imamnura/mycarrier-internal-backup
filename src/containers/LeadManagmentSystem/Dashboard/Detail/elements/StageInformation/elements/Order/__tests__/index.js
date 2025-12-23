import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Order from '../Order';
import useActions from '../hooks/useActions';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('../hooks/useActions');
jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Order', () => {
  beforeAll(() => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Order',
      },
    });
  });

  test('run properly', () => {
    useActions.mockReturnValueOnce({
      list: [],
      loadingTable: false,
      onClickRowTable: jest.fn(),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Order {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run no data', () => {
    useActions.mockReturnValueOnce({
      list: [],
      loadingTable: false,
      onClickRowTable: jest.fn(),
    });
    const customProps = {
      ...props,
      initialState: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Order {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
