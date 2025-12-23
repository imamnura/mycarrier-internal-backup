import React from 'react';
import PropTypes from 'prop-types';
import useFeature from './hooks/useFeature';
import Trash from '../../../../assets/Svg/Trash';
import FunctionComp from './function';
import { AddCircle } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import useValidation from './hooks/useValidation';
import Text from '../../elements/Text';

import useFunction from './hooks/useFunction';
import useModals from './hooks/useModals';
import TextFieldCustom from './textfield';

const Feature = ({ error, data, categoryId, classes }) => {
  const { updateFeature, deleteFeature } = useFeature();
  const {
    renderConfirmation,
    clearConfirmation,
    setConfirmation,
    renderCallbackAlert,
  } = useModals();

  return (
    <div className={classes.item}>
      <TextFieldCustom
        categoryId={categoryId}
        className={classes.subItem}
        defaultValue={data.name}
        error={error}
        fullWidth={true}
        item={data}
        label="Feature Name"
        maxLength={80}
        name={data.nameAlias}
        placeholder="Example: Link"
        required={true}
        type="feature"
        update={updateFeature}
      />
      <span
        className={classes.trash}
        onClick={() =>
          setConfirmation({
            content: 'Are you sure want to delete this feature?',
            actions: [
              { label: 'No', action: clearConfirmation },
              {
                label: 'Yes',
                action: () => deleteFeature(categoryId, data._id),
              },
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

const Component = ({ category, classes }) => {
  // const { messageFeature, featureValidation } = useValidation();
  const { messageFeature } = useValidation();
  const { addFunction } = useFunction();

  // useEffect(() => {
  //   featureValidation(category.feature);
  // }, [category.feature]);

  return (
    <>
      {category.feature.map((item) => (
        <div key={item._id}>
          <Feature
            categoryId={category._id}
            classes={classes}
            data={item}
            error={messageFeature.status}
          />
          <Grid item style={{ marginLeft: 30 }}>
            <FunctionComp
              categoryId={category._id}
              classes={classes}
              data={item.function}
              featureId={item._id}
            />
            <div className={classes.insertBtn}>
              <span onClick={() => addFunction(category._id, item._id)}>
                <AddCircle />
                <Text color="green" variant="button">
                  ADD FUNCTION
                </Text>
              </span>
            </div>
          </Grid>
        </div>
      ))}
    </>
  );
};

Component.propTypes = {
  category: PropTypes.object,
  classes: PropTypes.object,
};

Component.defaultProps = {
  category: {},
  classes: {},
};

Feature.propTypes = {
  categoryId: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.object,
  error: PropTypes.boolean,
};

Feature.defaultProps = {
  categoryId: '',
  classes: {},
  data: {},
  error: false,
};

export default Component;
