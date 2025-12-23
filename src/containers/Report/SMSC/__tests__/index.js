import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import { configure, mount } from 'enzyme';
import theme from '@styles/theme';
import Adapter from 'enzyme-adapter-react-17-updated';

import legionTheme from '@styles/legionTheme';
import { ThemeProvider as LegionProvider } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core/styles';

configure({ adapter: new Adapter() });

describe('src/pages/SMSCReport/index', () => {
  test('Snapshoot for index page', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      smscReport: {
        graphSMSC: {
          data: [],
          params: {},
        },
        listCustomerSMSC: [],
      },
      getData: {
        listOperatorType: [],
      },
      loading: {
        isLoading: false,
        isloadingLazy: false,
      },
    };
    const store = mockStore(initialState);
    const tree = mount(
      <LegionProvider theme={legionTheme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Index feature={['']} />
          </Provider>
        </ThemeProvider>
      </LegionProvider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
