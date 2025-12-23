import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useOrderFormStyles from './OrderForm.styles';
import DraggableIcon from '@assets/icon-v2/Draggable';
import AddIcon from '@assets/icon-v2/Add';
import { Text } from '@legion-ui/core';
import { IconButton } from '@material-ui/core';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import Button from '@components/Button';
import ModalNewForm from '../ModalNewForm';
import useAction from './hooks/useActions';
import color from '@styles/color';
import StarOutline from '@assets/icon-v2/StarOff';
import StarFilled from '@assets/icon-v2/StarFilled';
import Tooltip from '@components/Tooltip';
import { normalizeNewForm } from '../ModalNewForm/utils';

const ConfigForm = (props) => {
  const { control } = props;
  const {
    open,
    setOpen,
    onClickButtonNewForm,
    handleDelete,
    handleDrag,
    fields,
    append,
    update,
    isCustom,
  } = useAction(props);

  const classes = useOrderFormStyles();

  return (
    <>
      <div>
        <DragDropContext onDragEnd={handleDrag}>
          <ul className={classes.ulRoot}>
            <Droppable droppableId="test-items">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((item, index) => {
                    return (
                      <Draggable
                        key={`test[${index}]`}
                        draggableId={`item-${index}`}
                        index={index}
                        isDragDisabled={!isCustom}
                      >
                        {(provided) => (
                          <li
                            className={classes.liRoot}
                            key={item.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div
                              className={classes.item}
                              {...provided.dragHandleProps}
                            >
                              <div className={classes.itemPrefix}>
                                <DraggableIcon fontSize="small" />
                                <Text size="14px" weight="600" color="#233137">
                                  {!!item.required && (
                                    <Text
                                      size="14px"
                                      weight="600"
                                      color="#DE1B1B"
                                      children="*"
                                    />
                                  )}
                                  {item.formName}
                                </Text>
                                <Text size="12px" weight="400" color="#D2D8DA">
                                  {'\u2022'}
                                </Text>
                                <Text size="12px" weight="400" color="#61737C">
                                  {item.formtype}
                                </Text>
                                {item?.isNotEditableOnReturn && (
                                  <>
                                    <Text
                                      size="12px"
                                      weight="400"
                                      color="#D2D8DA"
                                    >
                                      {'\u2022'}
                                    </Text>
                                    <Text
                                      size="12px"
                                      weight="400"
                                      color="#61737C"
                                    >
                                      Non Editable
                                    </Text>
                                  </>
                                )}
                              </div>
                              <div className={classes.itemPrefix}>
                                <Tooltip title="Special Required Field">
                                  <IconButton
                                    onClick={() =>
                                      update(
                                        index,
                                        normalizeNewForm({
                                          ...item,
                                          isSpecialRequireField:
                                            !item?.isSpecialRequireField,
                                        }),
                                      )
                                    }
                                    size="small"
                                    disabled={!isCustom}
                                    style={{
                                      color: !!isCustom && color.orange.main,
                                    }}
                                  >
                                    {item?.isSpecialRequireField ? (
                                      <StarFilled fontSize="small" />
                                    ) : (
                                      <StarOutline fontSize="small" />
                                    )}
                                  </IconButton>
                                </Tooltip>
                                <IconButton
                                  onClick={onClickButtonNewForm({
                                    open: true,
                                    mode: 'edit',
                                    index: index,
                                    defaultValues: item,
                                  })}
                                  size="small"
                                  disabled={!isCustom}
                                  style={{
                                    color: !!isCustom && color.yellow.main,
                                  }}
                                >
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton
                                  onClick={handleDelete(index)}
                                  size="small"
                                  disabled={!isCustom}
                                  style={{
                                    color: !!isCustom && color.primary.main,
                                  }}
                                >
                                  <Trash fontSize="small" />
                                </IconButton>
                              </div>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </ul>
        </DragDropContext>
        <Button
          children="Add NEW FORM"
          onClick={onClickButtonNewForm({ open: true, mode: 'add' })}
          variant="secondary"
          leftIcon={AddIcon}
          block
          center
          disabled={!isCustom}
        />
      </div>
      <div>
        <ModalNewForm
          control={control}
          open={open}
          onClose={onClickButtonNewForm(null)}
          setOpen={setOpen}
          append={append}
          update={update}
        />
      </div>
    </>
  );
};

ConfigForm.defaultProps = {
  control: {},
};

ConfigForm.propTypes = {
  control: PropTypes.object,
};

export default ConfigForm;
