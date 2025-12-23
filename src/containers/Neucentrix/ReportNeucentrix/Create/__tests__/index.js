import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Create from '../Create';
import useAction from '../hooks/useActions';

jest.mock('../hooks/useActions');

describe('src/containers/Neucentrix/ReportNeucentrix/Create', () => {
  const useActionReturn = {
    file: [{ name: 'test' }],
    formState: {
      isValid: false,
      isDirty: false,
    },
    chip: [{ companyName: 'PT High' }],
    companyInfo: true,
    companyList: [{ custAccntName: 'Anda' }, { custAccntName: 'Andi' }],
    control: {},
    handleDelete: jest.fn(),
    handleRemove: jest.fn(),
    onChangeToggle: jest.fn(),
    setFile: jest.fn(),
  };

  test('render', () => {
    useAction.mockReturnValue(useActionReturn);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Create />);
    expect(tree).toMatchSnapshot();

    //Company Chip OnDelete
    // tree.props.children[2].props.children[1][0].props.children.props.onDelete();
    //Upload File OnChange
    // tree.props.children[2].props.children[3].props.children.props.onChange();
    //File Remove
    // tree.props.children[2].props.children[4].props.children[0].props.children[1].props.onClick();
  });
});
