import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import Component from '../component';
import { uniqueMail, formatPhoneNumber, uniquePhone } from '../utils';
import { isApprovalHasValue, phoneNumberMessage } from '../validate';
import { configure, mount, shallow } from 'enzyme';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';
import legionTheme from '@styles/legionTheme';
import { ThemeProvider as LegionProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core/styles';

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

describe('src/pages/GeneralProduct/BakesCreate/elements/Step5', () => {
  it('Snapshots for index page step 5', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      bakesCreate: {
        bakesData: {},
      },
      loading: {
        isLoadingLazy: false,
      },
    };
    const store = mockStore(initialState);
    const tree = mount(
      // <Provider store={store}>
      //   <MuiThemeProvider theme={theme}>
      //     <Index {...props} />
      //   </MuiThemeProvider>
      // </Provider>,
      <LegionProvider theme={legionTheme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Index {...props} />
          </Provider>
        </ThemeProvider>
      </LegionProvider>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('component', () => {
    const customProps = {
      ...props,
      approvalType: 'manual',
      approvalHasValue: false,
    };
    const tree = shallow(<Component {...customProps} />);
    expect(tree).toMatchSnapshot();
  });

  it('utils', () => {
    expect(uniqueMail('mail', null)).toEqual(undefined);
    expect(
      uniqueMail('mail@mail.com', {
        telkomApproval: [
          { email: 'mail@mail.com' },
          { email: 'mail@mail.com' },
        ],
      }),
    ).toEqual("'Email' must be a unique email");
    expect(uniquePhone('99', null)).toEqual(undefined);
    expect(
      uniquePhone('+62812312123', {
        telkomApproval: [
          { phoneNumber: '+62812312123' },
          { phoneNumber: '+62812312123' },
        ],
      }),
    ).toEqual("'Phone Number' must be a unique phone number");
    expect(formatPhoneNumber(undefined)).toEqual('"Phone Number" is required');
    expect(formatPhoneNumber('99')).toEqual(
      '"Phone Number" must number with +62',
    );
    expect(formatPhoneNumber('+62812312123')).toEqual(undefined);
  });

  it('utils 2', () => {
    expect(isApprovalHasValue([{ position: 'x' }])).toEqual(true);
    expect(phoneNumberMessage([{ type: 'any.required' }])).toEqual({
      message: '"Phone Number" is required',
    });
    expect(phoneNumberMessage([{ type: 'string.regex.base' }])).toEqual({
      message: '"Phone Number" must number with +62',
    });
    expect(phoneNumberMessage([{ type: '' }])).toEqual({
      message: 'Phone Number is error',
    });
  });
});
