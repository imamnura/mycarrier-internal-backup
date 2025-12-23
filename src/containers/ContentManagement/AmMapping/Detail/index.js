import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Component from './component';

function mapStateToProps(state) {
  const { search } = state.search;
  const { amProfile, listCustomer } = state.amMapping;
  const { isLoading, isLoadingLazy } = state.loading;
  return { isLoading, isLoadingLazy, amProfile, listCustomer, search };
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
