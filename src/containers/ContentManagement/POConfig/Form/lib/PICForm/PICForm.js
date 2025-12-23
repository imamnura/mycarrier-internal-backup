import React from 'react';
import { Text } from '@legion-ui/core';
import usePICFormStyles from './PICForm.styles';
import { IconButton } from '@material-ui/core';
import color from '@styles/color';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import AddIcon from '@assets/icon-v2/Add';
import useAction from './hooks/useActions';
import Button from '@components/Button';
import ModalPICForm from '../ModalPICForm';

const PICForm = (props) => {
  const { fieldProps, useForm } = props;
  const {
    open,
    setOpen,
    onClickButtonNewForm,
    handleDelete,
    fields,
    append,
    update,
  } = useAction(props);
  const classes = usePICFormStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.label}>
          <Text size="16px" weight="700" block color="secondary500">
            {fieldProps?.required && (
              <Text children="*" size="14px" color="primary500" />
            )}
            {fieldProps?.formName}
          </Text>
        </div>
        <div className={classes.content}>
          <ul className={classes.ulRoot}>
            {fields.map((item, index) => {
              return (
                <li className={classes.liRoot} key={item.id}>
                  <div className={classes.item}>
                    <div>
                      <Text size="14px" weight="600" block color="secondary700">
                        {item.name}
                      </Text>
                      <Text size="12px" weight="400" color="secondary400">
                        {item.phoneNumber} {'\u2022'} {item.email}
                      </Text>
                    </div>
                    <div className={classes.itemPrefix}>
                      <IconButton
                        onClick={onClickButtonNewForm({
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
                        <Edit fontSize="small" />
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
              );
            })}
          </ul>
          <Button
            children="Add NEW PIC"
            onClick={onClickButtonNewForm({ open: true, mode: 'add' })}
            variant="secondary"
            leftIcon={AddIcon}
            block
            center
          />
        </div>
      </div>
      <ModalPICForm
        control={useForm?.control}
        open={open}
        onClose={onClickButtonNewForm(null)}
        setOpen={setOpen}
        append={append}
        update={update}
      />
    </>
  );
};

export default PICForm;
