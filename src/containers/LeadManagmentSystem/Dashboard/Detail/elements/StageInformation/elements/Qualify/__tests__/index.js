import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Qualify from '../Qualify';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Qualify', () => {
  beforeAll(() => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Qualify',
        timeline: [{ status: 'qualify' }, { status: 'Qualify', active: true }],
      },
    });
  });

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Qualify />);
    expect(tree).toMatchSnapshot();
  });

  test('run no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Qualify initialState={true} />);
    expect(tree).toMatchSnapshot();
  });
});
