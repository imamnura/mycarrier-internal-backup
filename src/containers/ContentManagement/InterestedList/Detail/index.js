import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import styles from './styles';
import Component from './component';
import { withStyles } from '@material-ui/core/styles';

export function mapStateToProps(state) {
  const { interestedListDetail } = state.interestedList;
  const { isLoading } = state.loading;
  return { interestedListDetail, isLoading };
}

export function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
