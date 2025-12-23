import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DownloadForm from '../DownloadForm';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const actions = {
  control: {},
  formState: {
    isValid: false,
    isDirty: false,
  },
  handleDownload: jest.fn(),
  handleSubmit: jest.fn(),
  onClose: jest.fn(),
  loading: {
    customer: false,
  },
  options: {
    customer: [],
  },
};

const props = {
  open: true,
};

describe('src/containers/ServiceDelivery/IPPrefix/lib/DownloadForm', () => {
  test('render', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadForm {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other conditions', () => {
    useActions.mockReturnValue({
      ...actions,
      formState: {
        isValid: true,
        isDirty: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadForm {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
