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

const props = {
  classes: {},
  data: {},
  handleSubmit: jest.fn(),
  disableButton: jest.fn(),
  loadingButton: jest.fn(),
  invalid: true,
  submitting: false,
};

describe('src/pages/GeneralProduct/BakesCreate/elements/Step4', () => {
  it('Snapshots for index page step 4', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: {
          billingMethod: [],
        },
      },
      loading: {
        isLoadingLazy: false,
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

  it('Snapshots for empty index page step 4', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: null,
      },
      loading: {
        isLoadingLazy: false,
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
