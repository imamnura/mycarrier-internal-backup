import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useAction from './hooks/useAction';
import useRootProductStyles from './RootProduct.style';
import DraggableIcon from '@assets/icon-v2/Draggable';
import { Text, Box } from '@legion-ui/core';
import { IconButton } from '@material-ui/core';
import color from '@styles/color';
import Trash from '@assets/icon-v2/Trash';
import EditIcon from '@assets/Svg/Pencil';
import AddIcon from '@assets/icon-v2/Add';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import ModalRootProducuct from '../ModalRootProduct';

const RootProduct = (props) => {
  const { productFlow, useForm } = props;

  const {
    open,
    setOpen,
    handleDrag,
    handleDelete,
    fields,
    append,
    update,
    onClickButtonRootProduct,
    handleSubmit,
    formState,
    formRootProduct,
    onSubmit,
  } = useAction(props);

  const classes = useRootProductStyles();

  return (
    <>
      <DragDropContext onDragEnd={handleDrag}>
        <ul className={classes.ulRoot}>
          <Droppable droppableId="root-product-items">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields.map((item, index) => {
                  return (
                    <Draggable
                      key={`item-key-[${index}]`}
                      draggableId={`item-${index}`}
                      index={index}
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
                              <div className={classes.itemPrefixColumn}>
                                <Text size="14px" weight="600" color="#2F424A">
                                  {item?.productNameExternal}
                                  {` (${item?.productIdExternal})`}
                                </Text>
                                <Box
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                  }}
                                >
                                  <Text
                                    size="12px"
                                    weight="400"
                                    color="#61737C"
                                  >
                                    {item?.ncxPriceListName}
                                  </Text>
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
                                    {item?.ncxCatalogName}
                                  </Text>
                                </Box>
                              </div>
                            </div>
                            <div className={classes.itemPrefix}>
                              <IconButton
                                onClick={onClickButtonRootProduct({
                                  open: true,
                                  mode: 'edit',
                                  index: index,
                                  defaultValues: item,
                                })}
                                size="small"
                                style={{
                                  color: color.yellow.main,
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                onClick={handleDelete(index)}
                                size="small"
                                style={{
                                  color: color.primary.main,
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
        children="Add ROOT PRODUCT"
        onClick={onClickButtonRootProduct({ open: true, mode: 'add' })}
        variant="secondary"
        leftIcon={AddIcon}
        block
        center
        style={{ backgroundColor: '#F8F9FA' }}
      />
      <div>
        <ModalRootProducuct
          open={open}
          onClose={onClickButtonRootProduct({ open: false })}
          setOpen={setOpen}
          append={append}
          update={update}
          productFlow={productFlow}
          control={useForm.control}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          formState={formState}
          formRootProduct={formRootProduct}
        />
      </div>
    </>
  );
};

RootProduct.defaultProps = {
  control: {},
};

RootProduct.propTypes = {
  control: PropTypes.object,
};

export default RootProduct;
