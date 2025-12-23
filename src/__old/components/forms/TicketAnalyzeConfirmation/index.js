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
  const detailServiceAssurance =
    state.serviceAssuranceDetail.detailServiceAssurance;

  const {
    troubleOccurs,
    senderTypeName: senderID = '-',
    troubleOccursLink,
    createdAt,
    category,
  } = detailServiceAssurance;

  const { ipCustomer, logPingTrace } = troubleOccursLink || {};

  const timestamp =
    category === 'LBA' || category === 'LBA Targeted'
      ? moment(troubleOccurs[0].dateTime).format('DD/MM/YYYY HH:mm')
      : '';

  return {
    initialValues: {
      category,
      senderID,

      ipCustomer,
      logPingTrace,
      date: createdAt ? moment(createdAt).format('DD/MM/YYYY HH:mm') : '-',
      timestamp,
    },
    detailServiceAssurance,
  };
})(ComponentTemp);

export default ComponentTemp;
