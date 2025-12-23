import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Component from '../component';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

const useActionReturn = {
  chip: [{ companyName: 'test' }],
  control: {},
  company: ['test1', 'test2'],
  formState: {
    isValid: false,
    isDirty: false,
  },
  handleDelete: jest.fn(),
  handleSubmit: jest.fn(),
};

describe('src/pages/Document/ReportNeucentrix/Detail/forms/AddCompanyName', () => {
  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Component />);
    expect(tree).toMatchSnapshot();
  });
});
