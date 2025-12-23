import React from 'react';
import PropTypes from 'prop-types';
import Trash from '../../../../assets/Svg/Trash';

//hooks
import useCategory from './hooks/useCategory';
import useModals from './hooks/useModals';
import TextFieldCustom from './textfield';

const Component = ({ error, data, classes }) => {
  const { updateCategory, deleteCategory } = useCategory();
  const {
    renderConfirmation,
    clearConfirmation,
    setConfirmation,
    renderCallbackAlert,
  } = useModals();

  return (
    <div className={classes.item}>
      <TextFieldCustom
        className={classes.subItem}
        defaultValue={data.title}
        error={error}
        fullWidth={true}
        item={data}
        label="Category Name"
        maxLength={80}
        name={data.titleAlias}
        placeholder="Example: SMS A2P"
        required={true}
        type="category"
        update={updateCategory}
      />
      <span
        className={classes.trash}
        onClick={() =>
          setConfirmation({
            content: 'Are you sure want to delete this category?',
            actions: [
              { label: 'No', action: clearConfirmation },
              { label: 'Yes', action: () => deleteCategory(data._id) },
            ],
          })
        }
      >
        <Trash />
      </span>
      {renderConfirmation()}
      {renderCallbackAlert()}
    </div>
  );
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  error: PropTypes.boolean,
};

Component.defaultProps = {
  classes: {},
  data: {},
  error: false,
};

export default Component;
