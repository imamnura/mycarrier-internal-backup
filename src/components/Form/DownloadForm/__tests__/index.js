import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DownloadForm from '../DownloadForm';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const actions = {
  open: true,
  onClose: jest.fn(),
};

describe('src/components/Form/DownloadForm', () => {
  beforeEach(() => {
    useAction.mockImplementation(() => actions);
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadForm />);
    expect(tree).toMatchSnapshot();
  });
});
