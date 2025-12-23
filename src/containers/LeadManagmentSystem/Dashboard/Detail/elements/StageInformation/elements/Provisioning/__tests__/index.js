import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Provisioning from '../Provisioning';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Provisioning', () => {
  beforeAll(() => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Provisioning',
        timeline: [
          { status: 'qualify' },
          { status: 'Provisioning', active: true },
        ],
      },
    });
  });

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Provisioning />);
    expect(tree).toMatchSnapshot();
  });

  test('run no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Provisioning initialState={true} />);
    expect(tree).toMatchSnapshot();
  });
});
