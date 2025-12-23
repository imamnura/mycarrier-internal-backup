import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Card from '../Card';
import useStyles from '../styles';

jest.mock('../styles');

describe('src/containers/Neucentrix/AvailabilityRack/lib/Card', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = {
    icon: jest.fn(),
    title: 'test',
    content: 'test',
    labelUp: 'test',
    labelDown: 'test',
    loading: false,
    percentageDown: 10,
    percentageUp: 10,
    valueDown: 10,
    valueUp: 10,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Card {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render loading', () => {
    const customProps = { ...props, loading: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Card {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
