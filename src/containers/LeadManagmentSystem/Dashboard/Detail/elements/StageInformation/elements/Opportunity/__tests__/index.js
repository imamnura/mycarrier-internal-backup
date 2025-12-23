import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Opportunity from '../Opportunity';
import { useDetailData } from '@containers/LeadManagmentSystem/Dashboard/Detail/utils';

jest.mock('@containers/LeadManagmentSystem/Dashboard/Detail/utils');

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation/elements/Opportunity', () => {
  beforeAll(() => {
    useDetailData.mockReturnValue({
      data: {
        status: 'Opportunity',
        timeline: [
          { status: 'qualify' },
          { status: 'opportunity', active: true },
        ],
      },
    });
  });

  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Opportunity />);
    expect(tree).toMatchSnapshot();
  });

  test('run no data', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Opportunity initialState={true} />);
    expect(tree).toMatchSnapshot();
  });
});
