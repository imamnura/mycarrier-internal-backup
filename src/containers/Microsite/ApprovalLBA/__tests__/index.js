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

describe('src/pages/Microsite/ApprovalLBA/index', () => {
  it('Snapshots for index page', () => {
    const mockStore = configureStore([thunk]);
    const initialState = {
      lbaApproval: {
        detailApprovalLBA: {
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
          <Index feature={['']} router={{ query: { id: '' } }} />
        </MuiThemeProvider>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
