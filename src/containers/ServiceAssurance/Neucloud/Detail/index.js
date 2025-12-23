import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import * as actions from './action';
import styles from './styles';

export function mapStateToProps(state) {
  const { detailServiceAssuranceNeucloud } =
    state.serviceAssuranceDetailNeucloud;
  const { isLoading } = state.loading;

  return {
    detailServiceAssuranceNeucloud,
    isLoading,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
