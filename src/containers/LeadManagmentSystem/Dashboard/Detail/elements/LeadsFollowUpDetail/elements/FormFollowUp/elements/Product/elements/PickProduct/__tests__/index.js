import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PickProduct from '../PickProduct';
import useAction from '../hooks/useAction';

jest.mock('../hooks/useAction');

const props = {
  feature: [],
  onClose: jest.fn(),
  variant: 'qualify',
};

describe('src/containers/LeadManagementSystem/Dashboard/Detail/elements/LeadsFollowUpDetail/elements/FormFollowUp/elements/Product/element/PickProduct/index', () => {
  test('render properly', () => {
    useAction.mockReturnValueOnce({
      onSubmit: jest.fn(),
      open: true,
      optionProduct: [],
      setOpen: jest.fn().mockReturnValue(jest.fn()),
      selectedProduct: '',
      setSeletedProduct: jest.fn().mockReturnValue(jest.fn()),
      search: '',
      setSearch: jest.fn().mockReturnValue(jest.fn()),
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PickProduct {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
