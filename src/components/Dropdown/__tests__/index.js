import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Dropdown, {
  ClearIndicator,
  DropdownIndicator,
  NoOptionsMessage,
  Option,
  ValueContainer,
  MenuList,
  ListChild,
} from '../Dropdown';
import useOption from '../hooks/useOption';

jest.mock('../hooks/useOption');

describe('src/components/Dropdown', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Dropdown options={[{ value: 'test1', label: 'Test 1' }]} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('render/required', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Dropdown
        asyncProps={{
          loadOptions: jest.fn(),
        }}
        options={[{ value: 'test1', label: 'Test 1' }]}
        placeholder="ssss"
        required
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('comp/DropdownIndicator', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<DropdownIndicator />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ClearIndicator', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ClearIndicator />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/NoOptionsMessage', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<NoOptionsMessage />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/Option', () => {
    useOption.mockReturnValueOnce({
      isLabelTruncate: false,
      labelRef: null,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Option data={{ label: 'test' }} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/Option/custom-star', () => {
    useOption.mockReturnValueOnce({
      isLabelTruncate: false,
      labelRef: null,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Option data={{ label: 'test', customOption: { type: 'star' } }} />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('comp/Option/custom-switch', () => {
    useOption.mockReturnValueOnce({
      isLabelTruncate: false,
      labelRef: null,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Option
        data={{
          label: 'test',
          customOption: { type: 'switch', value: false, onChange: jest.fn() },
        }}
      />,
    );
    tree.props.children.props.onClick({ stopPropagation: jest.fn() });
    expect(tree).toMatchSnapshot();
  });

  test('comp/Option/custom-status', () => {
    useOption.mockReturnValueOnce({
      isLabelTruncate: true,
      labelRef: null,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Option
        data={{
          customOption: {
            children: 'statusName',
            subLabel: 'sub',
            type: 'status',
            variant: 'warning',
          },
          label: 'test',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  test('comp/Option/custom-status/truncate false', () => {
    useOption.mockReturnValueOnce({
      isLabelTruncate: false,
      labelRef: null,
    });
    const shallow = new ShallowRenderer();
    const tree = shallow.render(
      <Option
        data={{
          customOption: {
            children: 'statusName',
            subLabel: 'sub',
            type: 'status',
            variant: 'warning',
          },
          label: 'test',
        }}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  const valueContainerProps = {
    children: ['', ''],
    isMulti: false,
    hasValue: false,
    getValue: () => [''],
    selectProps: {
      inputValue: '',
    },
  };

  test('comp/ValueContainer', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValueContainer {...valueContainerProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ValueContainer/Multi/SingleValue', () => {
    const customProps = {
      ...valueContainerProps,
      isMulti: true,
      hasValue: true,
      getValue: () => [{ label: 'Test' }],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValueContainer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ValueContainer/Multi/MultiValue', () => {
    const customProps = {
      ...valueContainerProps,
      isMulti: true,
      hasValue: true,
      getValue: () => [{ label: 'Test' }, { label: 'Test' }],
      selectProps: {
        inputValue: '12',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValueContainer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ValueContainer/Status', () => {
    const customProps = {
      ...valueContainerProps,
      children: ['1', <div key={2}>ss</div>],
      isMulti: false,
      hasValue: true,
      getValue: () => [
        {
          label: 'Testss',
          customOption: {
            type: 'status',
            children: 'sssss',
            variant: 'warning',
          },
        },
      ],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValueContainer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ValueContainer/Status/displayLabel-false', () => {
    const customProps = {
      ...valueContainerProps,
      children: ['1', <div key={2}>ss</div>],
      isMulti: false,
      hasValue: true,
      getValue: () => [
        {
          label: 'Testss',
          customOption: {
            type: 'status',
            children: 'sssss',
            variant: 'warning',
          },
        },
      ],
      selectProps: {
        inputValue: 'test',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ValueContainer {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/MenuList', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MenuList options={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/MenuList large data', () => {
    const menuListProps = {
      options: new Array(101)
        .fill()
        .map((_, i) => ({ label: i, value: i.toString() })),
      isMulti: false,
      children: new Array(101).fill().map((_, i) => <div key={i}>i</div>),
      getValue: () => ['2'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MenuList {...menuListProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/MenuList large data sublabel', () => {
    const menuListProps = {
      options: new Array(101).fill().map((_, i) => ({
        label: i,
        value: i.toString(),
        customOption: { subLabel: 'xxx' },
      })),
      isMulti: false,
      children: new Array(101).fill().map((_, i) => <div key={i}>i</div>),
      getValue: () => ['2'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<MenuList {...menuListProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('comp/ListChild', () => {
    const shallow = new ShallowRenderer();
    const ListChildComp = ListChild(['']);
    const tree = shallow.render(<ListChildComp index={0} style={{}} />);
    expect(tree).toMatchSnapshot();
  });
});
