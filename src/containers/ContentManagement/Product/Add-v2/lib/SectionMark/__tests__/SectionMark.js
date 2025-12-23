import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SectionMark from '../SectionMark';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  title: 'test',
  description: 'test',
  nonmandatory: false,
  onChange: jest.fn(),
  isDisplay: true,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/SectionMark', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionMark {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render open', () => {
    const customProps = { ...props, nonmandatory: true, isDisplay: false };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<SectionMark {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
