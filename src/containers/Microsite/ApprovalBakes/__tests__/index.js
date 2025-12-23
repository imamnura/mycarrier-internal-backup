import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import { configure, mount } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';
import { useRouter } from 'next/router';

configure({ adapter: new Adapter() });
jest.mock('next/router');

describe('src/pages/Microsite/ApprovalBakes/index', () => {
  it('Snapshots for index page', () => {
    useRouter.mockReturnValue({ query: { id: '' } });
    const mockStore = configureStore([thunk]);
    const initialState = {
      otp: {
        otpCounter: {
          id: 'id',
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
          <Index feature={['']} />
        </MuiThemeProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
