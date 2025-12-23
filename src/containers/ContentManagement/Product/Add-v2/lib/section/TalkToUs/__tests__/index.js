import React, { useEffect, useState } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import TalkToUs from '../index';
import useStyles from '../styles';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';
import { useRouter } from 'next/router';

jest.mock('../styles');
jest.mock('lottie-react');
jest.mock('next/router');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const props = {
  tab: 'id',
  level: '',
  useform: { watch: jest.fn(), _getValues: jest.fn() },
  formType: '',
  previewMode: false,
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/TalkToUs/index', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeAll(() => {
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);

    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useStyles.mockReturnValue({ classes: {} });
    useLottie.mockReturnValue({});
    useEffect.mockImplementation((func) => func());

    useRouter.mockReturnValue({
      query: { isSingleProduct: 'false', level: 'l0' },
      push: jest.fn(),
    });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...props} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab id previewMode true', () => {
    const customProps = { ...props, tab: 'en', previewMode: true };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render tab en', () => {
    const customProps = { ...props, tab: 'en' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType full', () => {
    const customProps = { ...props, formType: 'full' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType half', () => {
    const customProps = { ...props, formType: 'half' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType single', () => {
    const customProps = { ...props, formType: 'single' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType create', () => {
    const customProps = { ...props, formType: 'create' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType create isSingleProduct true', () => {
    useRouter.mockReturnValue({ query: { isSingleProduct: 'true' } });

    const customProps = { ...props, formType: 'create' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit', () => {
    const customProps = { ...props, formType: 'edit' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit isSingleProduct level l0', () => {
    useRouter.mockReturnValue({
      query: { isSingleProduct: 'false', level: 'l0' },
    });

    const customProps = { ...props, formType: 'edit' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l1', () => {
    useRouter.mockReturnValue({
      query: { isSingleProduct: 'false', level: 'l1' },
    });

    const customProps = { ...props, formType: 'edit' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l2', () => {
    useRouter.mockReturnValue({
      query: { isSingleProduct: 'false', level: 'l2' },
    });

    const customProps = { ...props, formType: 'edit' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<TalkToUs {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
