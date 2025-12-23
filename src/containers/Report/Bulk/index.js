import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import * as customFetch from '@__old/utils/getData';
import styles from './styles';

function mapStateToProps(state) {
  const { graphSender } = state.senderIDReport;
  const { listActivateCustomer } = state.getData;
  const { isLoading } = state.loading;

  return {
    isLoading,
    listActivateCustomer,
    graphSender,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...customFetch }, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
