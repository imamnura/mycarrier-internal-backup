import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ChooseProduct from '../ChooseProduct';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../styles';

jest.mock('../styles');

const props = {
  data: [
    {
      id: 1,
      label: 'Full Product Category',
      desc: 'Can add all page (Level 0 page, Level 1 page, Level 2 category and Product Detail page)',
    },
    {
      id: 2,
      label: 'Half Product Category',
      desc: 'Just add Level 0 & Level 1 page',
    },
    {
      id: 3,
      label: 'Single Product Category',
      desc: 'Only add Level 0 page (this product category only have Level 0 page)',
    },
  ],
  isActive: [],
  onClose: jest.fn(),
  open: true,
  onSubmit: jest.fn(),
  setChoosedContent: jest.fn(),
  choosedContent: 1,
};

describe('src/containers/ContentManagement/Product/Fragment/ModalChooseProduct', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ChooseProduct {...props} />);
    expect(tree).toMatchSnapshot();
    tree.props.children[1][0].props.onClick(); //setChoosedContent
  });
});
