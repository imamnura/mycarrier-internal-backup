import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Agreement from '../Agreement';
import useActions from '../hooks/useActions';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('../hooks/useActions');
jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

const props = {
  feature: [],
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Agreement', () => {
  beforeAll(() => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Agreement',
      },
    });
  });

  test('run properly', () => {
    useActions.mockReturnValueOnce({
      list: [],
      loadingTable: false,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Agreement {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run no data', () => {
    useActions.mockReturnValueOnce({
      list: [],
      loadingTable: false,
    });
    const customProps = {
      ...props,
      initialState: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Agreement {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
