import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Add from '../Add';
import useActions from '../hooks/useActions';
import { route } from '@configs';
import { useRouter } from 'next/router';
import { cleanup } from '@testing-library/react-hooks';

jest.mock('../hooks/useActions');
jest.mock('next/router');

describe('src/containers/ContentManagement/Events/Add-v2/index', () => {
  afterEach(cleanup);

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useRouter.mockReturnValue({
      asPath: route.events('create'),
      push: jest.fn(),
      query: { id: '' },
    });
  });

  const props = {
    id: '',
    dataEvent: {},
    router: {
      push: jest.fn(),
    },
    handleSubmit: jest.fn(),
    formState: {
      isDirty: false,
      isValid: false,
    },
    control: {},
    getValues: {},
    setValue: jest.fn(),
    watch: {},
    isLoading: false,
    isLoadingDetail: false,
    openPreview: false,
    setOpenPreview: jest.fn(),
    displaySpeakers: {},
    displayAttendees: {},
    displaySponsor: {},
    displayRelatedProduct: {},
    displayRundown: {},
    tabsProps: {
      onChange: jest.fn(),
      value: 'id',
      options: [
        {
          label: 'Bahasa Indonesia',
          value: 'id',
        },
        {
          label: 'English',
          value: 'en',
        },
      ],
    },
    handleAddEvent: jest.fn(),
    fetchEvent: jest.fn(),
    productOption: [],
    loadingProduct: false,
    filterSectionTree: [],
    isValidContent: false,
    isValidRundown: false,
    handlePreviewPage: jest.fn(),
    idPreviewPage: '',
    isClickPreview: false,
  };

  test('render', () => {
    useRouter.mockReturnValue({
      asPath: route.events('create'),
      push: jest.fn(),
      query: { id: '' },
    });

    useActions.mockReturnValue(props);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children[3].props.onClose(); //setOpenPreview
    tree.props.children.props.children[0].props.children.props.action[0].onClick(); //Preview
    tree.props.children.props.children[0].props.children.props.action[1].onClick(); //save draft
    tree.props.children.props.children[0].props.children.props.action[2].onClick(); //cancel
  });

  test('render with id', () => {
    useRouter.mockReturnValue({
      asPath: route.events('list'),
      push: jest.fn(),
      query: { id: '1' },
    });

    const customProps = {
      ...props,
      id: '1',
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();

    tree.props.children.props.children[0].props.children.props.action[1].onClick(); //cancel
  });

  test('render with id and other validation isValidContent', () => {
    useRouter.mockReturnValue({
      asPath: route.events('list'),
      push: jest.fn(),
      query: { id: '1' },
    });

    const customProps = {
      ...props,
      id: '1',
      formState: {
        isValid: true,
      },
      isValidContent: true,
      isValidRundown: true,
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render with id and other validation isValidRundown', () => {
    useRouter.mockReturnValue({
      asPath: route.events('list'),
      push: jest.fn(),
      query: { id: '1' },
    });

    const customProps = {
      ...props,
      id: '1',
      formState: {
        isValid: true,
      },
      isValidContent: false,
      isValidRundown: true,
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other validation isValid', () => {
    const customProps = {
      ...props,
      formState: {
        isDirty: true,
        isValid: false,
      },
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other validation isValidContent', () => {
    const customProps = {
      ...props,
      formState: {
        isDirty: true,
        isValid: true,
      },
      isValidContent: true,
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });

  test('render other validation isValidRundown', () => {
    const customProps = {
      ...props,
      formState: {
        isDirty: true,
        isValid: true,
      },
      isValidContent: false,
      isValidRundown: true,
    };
    useActions.mockReturnValue(customProps);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Add feature={[]} />);
    expect(tree).toMatchSnapshot();
  });
});
