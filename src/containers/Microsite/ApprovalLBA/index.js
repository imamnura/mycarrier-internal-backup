import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import styles from './styles';
import { withRouter } from 'next/router';

function mapStateToProps(state) {
  const { detailApprovalLBA } = state.lbaApproval;
  const { isLoading } = state.loading;
  return {
    detailApprovalLBA,
    isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Styled));
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Styled);
