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

describe('src/pages/LBAReport/index', () => {
  test('Snapshoot for index page', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      lbaReport: {
        graphLBA: { data: [], params: {} },
      },
      getData: {
        listActivateCustomer: [],
      },
      loading: {
        isLoading: false,
      },
    };
    const props = {
      actions: {},
      feature: [],
      classes: {},
    };
    const store = mockStore(initialState);
    const tree = mount(
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
});
