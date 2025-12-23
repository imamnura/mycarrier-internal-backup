import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Table from '../component';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import Checkbox from '../../Checkbox';
import { JSDOM } from 'jsdom';
const dom = new JSDOM();

global.document ??= Object.create(dom.window.document);

configure({ adapter: new Adapter() });

describe('src/components/elements/Table', () => {
  const props = {
    bodyContent: [{ name: 'Name' }],
    headCells: [],
  };

  test('render when loading', () => {
    const customProps = {
      ...props,
      isLoading: true,
      isLoadingRow: true,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render', () => {
    const customProps = {
      ...props,
      headCells: [{ id: 'name', label: 'Name' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with sort', () => {
    const customProps = {
      ...props,
      headCells: [{ id: 'name', label: 'Name', sort: true }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Table {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('onClick', () => {
    const customProps = {
      ...props,
      onSelectedRow: jest.fn(),
      headCells: [{ id: 'name', label: 'Name', sort: true }],
      sort: {
        handler: jest.fn(),
      },
      checkbox: {
        selected: [],
        setSelected: jest.fn(),
      },
    };
    const tree = shallow(<Table {...customProps} />);
    tree.find({ active: false }).props().onClick();
    tree.find({ tabIndex: -1 }).childAt(1).props().onClick();
    expect(customProps.sort.handler).toHaveBeenCalled();
    expect(customProps.onSelectedRow).toHaveBeenCalled();
    tree
      .find(Checkbox)
      .at(0)
      .props()
      .onChange({ target: { checked: true } });
    tree.find(Checkbox).at(1).props().onClick();
  });
});
