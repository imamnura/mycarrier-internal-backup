import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import Component from '../component';
import { configure, mount, shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import Dropdown from '@__old/components/elements/Dropdown';
import Adapter from 'enzyme-adapter-react-17-updated';

configure({ adapter: new Adapter() });

const props = {
  change: jest.fn(),
  company: {
    name: 'x',
  },
  getCompanyList: jest.fn(),
  getTelkomPIC: jest.fn(),
  handleSubmit: jest.fn(),
  disableButton: jest.fn(),
  loadingButton: jest.fn(),
  invalid: false,
  isCompanyValid: false,
  submitting: false,
  telkomPic: null,
};

describe('src/pages/GeneralProduct/BakesCreate/elements/Step1', () => {
  it('Snapshots for index page step 1', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: {
          company: {
            name: 'x',
            contactName: 'c',
            contactPosition: 'x',
            alias: 'x',
          },
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

  it('Snapshots for exmpty index page step 1', () => {
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

  it('onChange dropdown', () => {
    const customProps = { ...props };
    const tree = shallow(<Component {...customProps} />);
    tree.find(Dropdown).props().onChange({ value: 'x', custAccntNum: 'x' });
    tree.find(Dropdown).props().onChange({ value: 'Others', custAccntNum: '' });
  });
});
