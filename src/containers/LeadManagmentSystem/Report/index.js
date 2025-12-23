import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './action';
import Component from './component';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

export function mapStateToProps(state) {
  const { search } = state.search;
  const { isLoading } = state.loading;
  const {
    listProduct,
    listSource,
    listAM,
    listSegment,
    graphInterestedProduct,
    graphInterestedStatus,
    graphInterestedAM,
    graphInterestedSegment,
  } = state.interestedListReport;
  return {
    isLoading,
    search,
    listProduct,
    listSource,
    listAM,
    listSegment,
    graphInterestedProduct,
    graphInterestedStatus,
    graphInterestedAM,
    graphInterestedSegment,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(actions, dispatch),
    dispatch,
  };
}

const Styled = withStyles(styles)(Component);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
