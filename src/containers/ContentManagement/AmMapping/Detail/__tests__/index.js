import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from '../index';
import renderer from 'react-test-renderer';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@styles/theme';
import { useRouter } from 'next/router';
import legionTheme from '@styles/legionTheme';
import { ThemeProvider as LegionProvider } from '@emotion/react';

jest.mock('next/router');

describe('Index', () => {
  it('Snapshot for index page', () => {
    useRouter.mockReturnValue({ query: { id: 'id' } });
    const mockStore = configureStore([thunk]);

    const initialState = {
      amMapping: {
        amProfile: { data: [], detail: [] },
        listCustomer: {
          data: [],
          meta: {},
        },
      },
      loading: {
        isLoading: false,
        isLoadingLazy: false,
      },
      search: {
        search: '',
      },
    };
    const store = mockStore(initialState);
    const tree = renderer
      .create(
        <LegionProvider theme={legionTheme}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              {/* <MuiThemeProvider theme={theme}> */}
              <Index />
              {/* </MuiThemeProvider> */}
            </Provider>
          </ThemeProvider>
        </LegionProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
