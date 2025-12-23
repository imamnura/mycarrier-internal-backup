import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Component from './component';

export function mapStateToProps(state) {
  const { listAmMappingCustomer, amProfile } = state.amMapping;
  const { isLoading } = state.loading;

  return {
    isLoading,
    listAmMappingCustomer,
    amProfile,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
