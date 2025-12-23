import React, { useState, useEffect } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import InformationForm from '../index';
import useStyles from '../../../hooks/useStyles';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';
import { useRouter } from 'next/router';

jest.mock('../../../hooks/useStyles');
jest.mock('lottie-react');
jest.mock('next/router');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));

const props = {
  level: 'l0',
  useform: {
    control: {},
    formState: {},
    setValue: jest.fn(),
    getValues: jest.fn(),
    clearErrors: jest.fn(),
  },
  handleDeleteKeyword: jest.fn(),
  handleKeyDown: jest.fn(),
  handleUploadIcon: jest.fn(),
  iconState: { iconFile: {}, setIconFile: jest.fn() },
  keywordChip: ['satu', 'dua', 'tiga'],
  l2CategoryChip: [],
  formType: '',
  l2MappingOptions: [],
  query: {},
  dataInformation: {},
};

describe('src/containers/ContentManagement/Product/Add-v2/lib/section/InformationForm/index', () => {
  afterEach(() => {
    cleanup();
  });

  const setState = jest.fn();

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useStyles.mockReturnValue({ classes: {} });
    useLottie.mockReturnValue({});
    useEffect.mockImplementation((func) => func());
    useState.mockImplementation((init) => [init, setState]);
    useRouter.mockReturnValue({
      query: { isSingleProduct: 'false' },
      push: jest.fn(),
    });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.children[1].props.handleDelete();
    tree.props.children[1].props.children.props.children[1].props.onChange();
  });

  test('render iconFile null', () => {
    const customProps = {
      ...props,
      iconState: { iconFile: null, setIconFile: jest.fn() },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l1', () => {
    const customProps = { ...props, formType: 'edit', level: 'l1' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.children.props.children[1].props.children[0].props.onKeyDown();
  });

  test('render formType edit level l1 2', () => {
    const customProps = {
      ...props,
      level: 'l1',
      l2CategoryChip: ['satu', 'dua', 'tiga'],
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l1 isSingleProduct true', () => {
    useRouter.mockReturnValue({
      query: { isSingleProduct: 'true' },
      push: jest.fn(),
    });

    const customProps = {
      ...props,
      level: 'l1',
      dataInformation: { isSingleProduct: true },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l2 formType create', () => {
    const customProps = { ...props, level: 'l2', formType: 'create' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l2 formType edit', () => {
    const customProps = { ...props, level: 'l2', formType: 'edit' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l0 formType half', () => {
    const customProps = { ...props, formType: 'half' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[1].props.children.props.children[1].props.handleDelete(); //handleDelete half
    tree.props.children[1].props.children.props.children[1].props.onChange(); //handleUploadIcon half
  });

  test('render null', () => {
    const customProps = { ...props, level: 'l3' };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  test('render formType edit level l0 formType half icon null', () => {
    const customProps = {
      ...props,
      formType: 'half',
      iconState: { iconFile: null, setIconFile: jest.fn() },
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<InformationForm {...customProps} />);
    expect(tree).toMatchSnapshot();
  });
});
