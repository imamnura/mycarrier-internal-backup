import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import styles from './styles';

function mapStateToProps(state) {
  const { listNotification } = state.notification;
  const { isLoadingNotification } = state.loading;
  return {
    listNotification,
    isLoading: isLoadingNotification,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
