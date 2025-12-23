import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Numbering from '../Numbering';

describe('src/components/Numbering', () => {
  const props = {
    number: 1,
    data: 'Value',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Numbering {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/schema', () => {
    const customProps = {
      ...props,
      schema: [
        { name: 'test', label: 'Test' },
        { name: 'test', label: 'Test', converter: (value) => value },
        { name: 'test2', label: 'Test2', grid: 12 },
        {
          name: 'test3',
          label: 'Status',
          schemaStatus: { Success: 'success' },
        },
        { name: 'test6', label: 'Empty', hidden: true },
      ],
      data: {
        test: null,
        test2: 'test2',
        test3: 'Success',
      },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Numbering {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render/other', () => {
    const customProps = {
      ...props,
      data: <span>test</span>,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Numbering {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
