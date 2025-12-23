import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/pages/ContentManagement/InterestedList/List/FormDownload', () => {
  const useActionReturn = {
    control: {},
    formState: { isValid: false, isDirty: false },
    handleDownload: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  const props = { feature: [''], modalDownload: false };

  test('run properly 1', () => {
    useActions.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('run properly 2', () => {
    useActions.mockReturnValue({
      ...useActionReturn,
      formState: { isValid: true, isDirty: false },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
