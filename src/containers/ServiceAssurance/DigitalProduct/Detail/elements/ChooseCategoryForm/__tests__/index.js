import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ChooseCategoryForm from '../ChooseCategoryForm';
import useActions from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/ServiceAssurance/DigitalProduct/Detail/elements/ChooseCategoryForm', () => {
  const returnValueData = {
    control: {},
    formState: {
      isValid: false,
      isDirty: true,
    },
    handleUpdateStatus: jest.fn(),
    handleSubmit: jest.fn(),
    onClose: jest.fn(),
    categoryOptions: [],
    subcategoryOptions: [],
    loading: {
      category: false,
      subcategory: false,
    },
    category: '',
  };

  test('render', () => {
    useActions.mockReturnValueOnce(returnValueData);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <ChooseCategoryForm modalChooseCategory={null} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render other condition', () => {
    useActions.mockReturnValueOnce({
      ...returnValueData,
      formState: {
        isValid: true,
        isDirty: false,
      },
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <ChooseCategoryForm
        modalChooseCategory={{
          title: 'title',
          textInfo: 'info',
          caption: 'caption',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
