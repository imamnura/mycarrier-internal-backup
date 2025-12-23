import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Rundown from '../Rundown';
import useActions from '../hooks/useActions';
import { cleanup } from '@testing-library/react-hooks/server';
import { useLottie } from 'lottie-react';
import useStyles from '../styles';

jest.mock('../hooks/useActions');
jest.mock('../styles');
jest.mock('lottie-react');

const actions = {
  starDateRange: [],
  onChangeRundownId: jest.fn(),
  onChangeRundownEn: jest.fn(),
  watchRundownid: jest.fn(),
  watchRundownen: jest.fn(),
  handleRange: jest.fn(),
};

const props = {
  tab: 'id',
  display: { isDisplayRundown: false, setIsDisplayRundown: jest.fn() },
  previewMode: false,
  useForm: {
    _control: {},
    _getValues: jest.fn(),
    _setValue: jest.fn(),
    _watch: jest.fn(),
  },
  isLoading: false,
  isLoadingDetail: false,
  isClickPreview: false,
};

describe('src/containers/ContentManagement/Events/Add-v2/lib/sections/Rundown/index.js', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('10 October 2022 08:08:08 UTC'));
    useLottie.mockReturnValue({});
    useStyles.mockReturnValue({ clasess: {} });
  });

  test('render l0', () => {
    useActions.mockReturnValue(actions);
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Rundown {...props} />);
    expect(tree).toMatchSnapshot();

    tree.props.children[0].props.onChange(); //setIsDisplayRundown
    tree.props.children[2].props.children.props.children.props.onChangeDataEn(
      'test',
    );
    tree.props.children[2].props.children.props.children.props.onChangeDataId(
      'test',
    );
    tree.props.children[2].props.children.props.children.props.setRange('test');
  });
});
