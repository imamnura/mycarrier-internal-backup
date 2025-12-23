import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as actions from '../../action';
import styles from '../styles';

import ConfirmationDialog from '@__old/components/elements/ConfirmationDialog';
import LineButton from './lineButton';

const DeleteSection = ({
  triggerAnimation,
  pageValid,
  page,
  action,
  block,
  activeTab,
}) => {
  const [confirmation, setConfirmation] = useState({
    content: '',
    secondaryContent: '',
    actions: [],
  });

  const handleDelete = (id) => {
    triggerAnimation();
    setTimeout(function () {
      action.deleteSection(page, id);
      action.deleteValidate(pageValid, id._uid);
    }, 1000);
  };

  const openConfirmation = (id) => {
    setConfirmation({
      content: 'Delete this section ?',
      secondaryContent: 'Once you confirm, it will be delete',
      actions: [
        { label: 'Cancel', action: confirmationClose },
        {
          label: 'Confirm',
          action: () => handleDelete(id),
        },
      ],
    });
  };

  const confirmationClose = () =>
    setConfirmation({
      content: '',
      secondaryContent: '',
      actions: [],
    });

  return (
    activeTab === 0 && (
      <>
        <LineButton
          handleClick={() => openConfirmation(block)}
          label="DELETE SECTION"
          variant="primary"
        />
        <ConfirmationDialog {...confirmation} onClose={confirmationClose} />
      </>
    )
  );
};

DeleteSection.defaultProps = {
  action: {},
  activeTab: 0,
  block: {},
  page: [],
  pageValid: [],
};

DeleteSection.propTypes = {
  action: PropTypes.object,
  activeTab: PropTypes.number,
  block: PropTypes.object,
  page: PropTypes.array,
  pageValid: PropTypes.array,
  triggerAnimation: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { activeTab, page, pageValid } = state.productManagement;
  return {
    activeTab,
    page,
    pageValid,
  };
}

function mapDispatchToProps(dispatch) {
  return { action: bindActionCreators(actions, dispatch) };
}

const Styled = withStyles(styles)(DeleteSection);

export default connect(mapStateToProps, mapDispatchToProps)(Styled);
