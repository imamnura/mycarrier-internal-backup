import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import { configure, mount } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

describe('src/components/fragments/SendOTP/index', () => {
  const props = {
    endpoint: {
      send: '',
    },
    id: 'id',
    otpCounter: {
      id: 'id',
    },
  };

  it('Snapshots for index page with otpCounter', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      otp: {
        otpCounter: {
          id: 'id',
        },
      },
      loading: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);
    const tree = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Index {...props} />
        </MuiThemeProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('Snapshots for index page without otpCounter', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      otp: {
        otpCounter: {},
      },
      loading: {
        isLoading: false,
      },
    };
    const store = mockStore(initialState);
    const tree = mount(
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Index {...props} />
        </MuiThemeProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
