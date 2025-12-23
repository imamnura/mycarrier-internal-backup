import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import validate from './validate';
import { connect } from 'react-redux';

const Styled = withStyles(styles)(Component);

let ComponentTemp = reduxForm({
  form: 'cpNameForm',
  validate,
  enableReinitialize: true,
})(Styled);

ComponentTemp = connect((state) => {
  const { detailSenderID: { senderId, cpname, cpNameInfo, noteReview } = {} } =
    state.senderIDDetail || {};

  const { sid } = (cpNameInfo.length > 0 && cpNameInfo[0]) || {};

  return {
    initialValues: {
      sid,
      availableSenderId: senderId,
      cpname,
      noteReview,
    },
  };
})(ComponentTemp);

export default ComponentTemp;
