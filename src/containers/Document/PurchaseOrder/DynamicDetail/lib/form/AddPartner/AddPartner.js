import React from 'react';
import { Box, Text } from '@legion-ui/core';
import color from '@styles/color';
import Button from '@components/Button';
import Dialog from '@__old/components/elements/Dialog';
import AddIcon from '@assets/icon-v2/Add';
import useResponsive from '@utils/hooks/useResponsive';
import CheckboxGroup from './CheckboxGroup';
import useActions from './hooks/useActions';
import AddPic from '../AddPic';
import useStyles from './styles';

const AddPartner = (props) => {
  const { data, open, setModalPartner, modalPartner } = props;
  const mobileClient = useResponsive('xs');
  const classes = useStyles(mobileClient);
  const {
    onSubmit,
    onClickDelete,
    onClose,
    onChangeChecked,
    onClickEdit,
    fieldsArray,
    form,
    picModal,
    setPicModal,
  } = useActions(props);

  return (
    <>
      <Dialog
        className={classes.modal}
        open={open}
        onClose={onClose}
        customWidth={classes.root}
        maxWidth="sm"
      >
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={classes.titleWrapper}>
            <Text size="20px" weight="600" children="Approve" />
            <Text
              size="12px"
              weight="500"
              children="Select which PICs from the list you want to display to the customer"
              color={color.general.main}
            />
          </div>
          <Box mt="24px">
            <Text
              size="14px"
              weight="600"
              children="Partner Name"
              block
              color="secondary600"
            />
            <Text
              size="18px"
              weight="400"
              children={data?.partnerName}
              color="secondary600"
            />
          </Box>
          <Box mt="24px">
            <Text
              size="14px"
              weight="600"
              children="PIC Contact"
              color="secondary600"
            />
            <div className={classes.content}>
              <CheckboxGroup
                control={form.control}
                values={form.watch('picContact')}
                onClickDelete={onClickDelete}
                onChangeChecked={onChangeChecked}
                onClickEdit={onClickEdit}
                option={form.watch('picContact')}
              />
              <Button
                children="Add NEW PIC"
                onClick={() => {
                  setPicModal({ open: true });
                  setModalPartner({
                    ...modalPartner,
                    initialOpen: false,
                    open: false,
                  });
                }}
                variant="secondary"
                leftIcon={AddIcon}
                block
                center
              />
            </div>
          </Box>
          <div className={classes.action}>
            <Button onClick={onClose} variant="ghost">
              CANCEL
            </Button>
            <Button type="submit">SUBMIT</Button>
          </div>
        </form>
      </Dialog>
      <AddPic
        onClose={() => {
          setPicModal({ open: false });
          setModalPartner({ ...modalPartner, open: true });
        }}
        {...fieldsArray}
        {...picModal}
      />
    </>
  );
};

export default AddPartner;
