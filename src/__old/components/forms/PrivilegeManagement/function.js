import React from 'react';
import PropTypes from 'prop-types';
import Trash from '../../../../assets/Svg/Trash';

import useFunction from './hooks/useFunction';
import useValidation from './hooks/useValidation';
import useModals from './hooks/useModals';

import TextFieldCustom from './textfield';

const Component = ({ data, categoryId, featureId, classes }) => {
  const { deleteFunction, updateFunction } = useFunction();
  const {
    messageFunctionTitle,
    messageFunctionAlias,
    messageFunctionDesc,
    // functionValidation,
  } = useValidation();

  const {
    renderConfirmation,
    clearConfirmation,
    setConfirmation,
    renderCallbackAlert,
  } = useModals();

  // useEffect(() => {
  //   functionValidation(data);
  // }, [data]);

  return (
    <>
      {data?.map((item) => (
        <div className={classes.subItemFunc} key={item._id}>
          <div style={{ width: '100%' }}>
            <TextFieldCustom
              categoryId={categoryId}
              className={classes.subItem}
              defaultValue={item.title}
              error={messageFunctionTitle.status}
              featureId={featureId}
              fullWidth={true}
              item={item}
              label="Function Name"
              maxLength={80}
              maxRows={2}
              multiline={true}
              name="function_name"
              placeholder="Example: List Link Request"
              type="title"
              update={updateFunction}
            />
            <TextFieldCustom
              categoryId={categoryId}
              className={classes.subItem}
              defaultValue={item.alias}
              error={messageFunctionAlias.status}
              featureId={featureId}
              fullWidth={true}
              item={item}
              label="Function Alias Name"
              maxLength={240}
              maxRows={2}
              multiline={true}
              name="function_alias"
              placeholder="Example: read_list_request"
              type="alias"
              update={updateFunction}
            />

            <TextFieldCustom
              categoryId={categoryId}
              className={classes.subItem}
              defaultValue={item.description}
              error={messageFunctionDesc.status}
              featureId={featureId}
              fullWidth={true}
              item={item}
              label="Description Name"
              maxLength={240}
              maxRows={2}
              multiline={true}
              name="description"
              placeholder="Example: Menampilkan daftar request link"
              type="description"
              update={updateFunction}
            />
          </div>
          <span
            className={classes.trash}
            onClick={() =>
              setConfirmation({
                content: 'Are you sure want to delete this function?',
                actions: [
                  { label: 'No', action: clearConfirmation },
                  {
                    label: 'Yes',
                    action: async () => {
                      await clearConfirmation();
                      deleteFunction(categoryId, featureId, item._id);
                    },
                  },
                ],
              })
            }
          >
            <Trash />
          </span>
        </div>
      ))}
      {renderConfirmation()}
      {renderCallbackAlert()}
    </>
  );
};

Component.propTypes = {
  categoryId: PropTypes.string,
  classes: PropTypes.object,
  data: PropTypes.array,
  featureId: PropTypes.string,
};

Component.defaultProps = {
  categoryId: '',
  classes: {},
  data: [],
  featureId: '',
};

export default Component;
