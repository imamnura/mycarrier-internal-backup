import React from 'react';
import Table from '../table';
import { unwrap } from '@material-ui/core/test-utils';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

describe('Component amMappingDetail-component-table', () => {
  let props = {
    classes: {
      emptyData: {},
      emptyContainer: {},
    },
    headCells: [
      {
        label: '',
        id: '',
      },
    ],
  };

  const Component = unwrap(Table);

  test('render with bodyContent', () => {
    const customProps = {
      ...props,
      bodyContent: [{}],
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with no bodyContent', () => {
    const customProps = {
      ...props,
      bodyContent: [],
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
  test('render with bodyContent isLoading true', () => {
    const customProps = {
      ...props,
      bodyContent: [{}],
      isLoading: true,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
