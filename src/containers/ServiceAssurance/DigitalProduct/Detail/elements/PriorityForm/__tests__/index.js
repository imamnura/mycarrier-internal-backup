import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PriorityForm from '../PriorityForm';
import useActions from '../hooks/useActions';
import useStyles from '../styles';

jest.mock('../styles');
jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/PriorityForm', () => {
  const returnValueData = {
    modalPriorityForm: {},
    onClose: jest.fn(),
    handleSubmit: jest.fn(),
    onSubmit: jest.fn(),
    control: {},
    formState: { isValid: false, isDirty: false },
    loadingOptions: false,
    levelOptions: [],
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PriorityForm modalPriorityForm={null} />);
    expect(tree).toMatchSnapshot();
  });

  test('render isDirty', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      formState: { isValid: true, isDirty: false },
    });
    useStyles.mockReturnValueOnce({});
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PriorityForm modalPriorityForm={null} />);
    expect(tree).toMatchSnapshot();
  });
});
