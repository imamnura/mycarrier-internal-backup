import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import RegistrationLink from '../RegistrationLink';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  previewMode: false,
  useform: { control: {} },
  tab: 'id',
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/RegistrationLink', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RegistrationLink {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<RegistrationLink {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
