import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InfoDetail from '../component';

describe('src/components/elements/InfoDetail', () => {
  const props = {
    classes: {},
    align: 'left',
    inline: false,
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InfoDetail {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with content', () => {
    const customProps = {
      ...props,
      content: ['content1', 'content2'],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InfoDetail {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with inlline content', () => {
    const customProps = {
      ...props,
      bool: true,
      inline: true,
      date: true,
      dateTime: true,
      dateTimeSec: true,
      content: ['content1', 'content2'],
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InfoDetail {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with null content', () => {
    const customProps = {
      ...props,
      bool: true,
      content: null,
      noMargin: true,
    };

    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InfoDetail {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
