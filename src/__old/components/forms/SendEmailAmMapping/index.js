import { reduxForm } from 'redux-form';
import Component from './component';
// import styles from '../../../pages/ContentManagement/InterestedList/Detail/styles';
import { connect } from 'react-redux';
import validate from './validate';
import { bindActionCreators } from 'redux';
// import * as actions from '../../../pages/ContentManagement/InterestedList/Detail/action';

let ComponentTemp = reduxForm({
  form: 'sendEmailForm',
  enableReinitialize: true,
  validate,
})(Component);

export function mapStateToProps() {
  return {
    initialValues: {
      email: '',
    },
  };
}

export function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators({}, dispatch) };
}

ComponentTemp = connect(mapStateToProps, mapDispatchToProps)(ComponentTemp);

export default ComponentTemp;

// const Styled = withStyles(styles)(ComponentTemp);

// export default Styled;
