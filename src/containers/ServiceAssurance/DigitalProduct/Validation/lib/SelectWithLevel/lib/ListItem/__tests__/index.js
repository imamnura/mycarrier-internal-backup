import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ListItem from '../ListItem';
import { cleanup } from '@testing-library/react-hooks/server';
import useStyles from '../../../styles';

jest.mock('../../../styles');

const actions = {
  fetchDataItems: jest.fn(),
  toggleItem: jest.fn(),
  handleCombineValue: jest.fn(),
  handleSymptompPath: jest.fn(),
  visible: { C_CONN_TSEL_002: false, C_CONN_TSEL_001: true },
  dataItems: {},
  data: [
    {
      children: true,
      content: 'C_CONN_TSEL_002',
      symptompDesc: 'Non Teknikal',
    },
    { children: true, content: 'C_CONN_TSEL_001', symptompDesc: 'Teknikal' },
  ],
  handleValue: () => jest.fn(),
  level: 1,
};

describe('src/containers/ServiceAssurance/DigitalProduct/Validation/lib/SelectWithLevel/lib/ListItem', () => {
  afterEach(() => {
    cleanup();
  });

  beforeAll(() => {
    useStyles.mockReturnValue({ classes: {} });
  });

  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...actions} />);
    expect(tree).toMatchSnapshot();
  });

  test('render level 1', () => {
    const customActions = {
      ...actions,
      // data: [
      //   { children: true, content: 'C_CONN_TSEL_002', symptompDesc:'Non Teknikal' },
      //   { children: true, content: 'C_CONN_TSEL_001', symptompDesc:'Teknikal' }
      // ],
      // handleValue: () => jest.fn(),
      // level: 1
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...customActions} />);
    expect(tree).toMatchSnapshot();
  });

  test('render level another 1', () => {
    const customActions = {
      ...actions,
      data: [
        {
          children: true,
          content: 'C_CONN_TSEL_002',
          symptompDesc: 'Non Teknikal',
        },
        {
          children: true,
          content: 'C_CONN_TSEL_001',
          symptompDesc: 'Teknikal',
        },
      ],
      handleValue: () => jest.fn(),
      level: 2,
    };
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ListItem {...customActions} />);
    expect(tree).toMatchSnapshot();
  });
});
