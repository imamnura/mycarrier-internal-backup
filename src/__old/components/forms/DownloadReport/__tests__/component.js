import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import DownloadReport from '../component';

describe('src/components/forms/DownloadReport', () => {
  const props = {
    handleSubmit: jest.fn(),
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadReport {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render smsc', () => {
    const customProps = {
      ...props,
      report: 'smsc',
      invalid: false,
      submitting: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadReport {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render lba', () => {
    const customProps = {
      ...props,
      report: 'lba',
      invalid: false,
      isLoading: true,
      submitting: false,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DownloadReport {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
