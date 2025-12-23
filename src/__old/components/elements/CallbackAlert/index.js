import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';

export function mapStateToProps(state) {
  const { isLoadingSubmit } = state.loading;
  return {
    isLoading: isLoadingSubmit,
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps)(Styled);
