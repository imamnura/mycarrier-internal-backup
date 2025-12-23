import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Component from './component';
import styles from './styles';
import { connect } from 'react-redux';
import moment from 'moment';

const Styled = withStyles(styles)(Component);

let ComponentTemp = reduxForm({
  form: 'faultConfirmation',
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(Styled);
ComponentTemp = connect((state) => {
  const {
    troubleOccurs,
    symtompsName: troubleCategory = '-',
    senderTypeName: senderID = '-',
  } = state.serviceAssuranceDetail.detailServiceAssurance;

  const {
    dateTime = '',
    bNumber = '-',
    logRequest = '-',
    respond = '-',
  } = (troubleOccurs && troubleOccurs[0]) || {};

  return {
    initialValues: {
      troubleCategory,
      senderID,
      bNumber,
      logRequest,
      respond,
      date: dateTime ? moment(dateTime).format('DD/MM/YYYY HH:mm') : '-',
    },
  };
})(ComponentTemp);

export default ComponentTemp;
