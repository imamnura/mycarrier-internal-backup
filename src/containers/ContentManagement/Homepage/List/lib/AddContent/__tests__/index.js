import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AddContent from '../AddContent';
import useStyles from '../../../List.styles';

jest.mock('../../../constant', () => ({
  contentMenuList: [
    { id: 1, label: 'Banner Hero' },
    { id: 2, label: 'Brochure Upload' },
    { id: 3, label: 'Pop Up' },
  ],
}));

jest.mock('../../../List.styles');

describe('src/containers/ContentManagement/Homepage/List/lib/AddContent', () => {
  beforeEach(() => {
    useStyles.mockReturnValue({});
  });

  const props = {
    addContent: jest.fn(),
    choosedContent: 1,
    disabled: false,
    open: true,
    onClose: jest.fn(),
    setChoosedContent: jest.fn(),
  };

  test('run properly', () => {
    AddContent.defaultProps.addContent();
    AddContent.defaultProps.onClose();
    AddContent.defaultProps.setChoosedContent();
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddContent {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1][0].props.onClick(); //btnChooseContentHomepage
    tree.props.children[2].props.children[1].props.onClick(); //btnAddContentHomepage
  });

  test('run properly on brochure', () => {
    const brochureProps = {
      ...props,
      choosedContent: 2,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddContent {...brochureProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('run properly on popup', () => {
    const popupProps = {
      ...props,
      choosedContent: 3,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<AddContent {...popupProps} />);
    expect(tree).toMatchSnapshot();
  });
});
