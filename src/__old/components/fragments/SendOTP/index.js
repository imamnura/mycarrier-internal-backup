import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import styles from './styles';

function mapStateToProps(state) {
  const { otpCounter } = state.otp;
  const { isLoadingLazy } = state.loading;

  return {
    otpCounter,
    isSendLoading: isLoadingLazy,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
