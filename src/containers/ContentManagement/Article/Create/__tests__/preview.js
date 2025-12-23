import React from 'react';
import preloadAll from 'jest-next-dynamic';
import ShallowRenderer from 'react-test-renderer/shallow';
import Preview from '../preview';

describe('src/containers/ContentManagement/Article/Create/Preview', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2010, 10, 10)));
    preloadAll();
    jest.runAllTimers();
  });

  const props = {
    imgPreview: null,
    caption: '',
    story: '',
    relatedProduct: [],
    title: '',
    tab: 'id',
    classes: {},
    updatedAt: '',
  };

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Preview {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state', () => {
    const customProps = {
      ...props,
      imgPreview: 'test',
      caption: 'test',
      story: 'test',
      relatedProduct: [{ label: 'test' }],
      title: 'test',
      tab: 'en',
      classes: {},
      updatedAt: 'test',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Preview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state story id', () => {
    const customProps = {
      ...props,
      story: 'Ketik story konten di sini dalam Bahasa..',
      tab: 'id',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Preview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render another state story en', () => {
    const customProps = {
      ...props,
      story: 'Type content story here in English..',
      tab: 'en',
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Preview {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
