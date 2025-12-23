import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StageInformation from '../StageInformation';
import { useRouter } from 'next/router';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { cleanup } from '@testing-library/react-hooks';
import useQueryParams from '@utils/hooks/useQueryParams';

configure({ adapter: new Adapter() });
jest.mock('next/router');
jest.mock('@utils/hooks/useQueryParams');

const props = {
  loading: false,
};

describe('src/pages/LeadManagementSystem/Dashboard/Detail/elements/StageInformation', () => {
  afterEach(cleanup);
  beforeAll(() => {
    useRouter.mockReturnValue({
      query: { id: 'id', params: 'params', replace: jest.fn() },
    });
    useQueryParams.mockReturnValue({
      queryParams: '',
      setQueryParams: jest.fn(),
    });
  });
  test('run properly', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<StageInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('handle change', () => {
    const tree = shallow(<StageInformation {...props} />);
    tree.props().children[0].props.onChange();
    expect(tree).toMatchSnapshot();
  });
});
