import React from 'react';
import color from '@styles/color';
import Trash from '@assets/icon-v2/Trash';
import Edit from '@assets/icon-v2/Edit';
import StateMessage from '@components/StateMessage';
import NoData from '@assets/ilustration-v2/NoData';
import { Text } from '@legion-ui/core';
import { IconButton } from '@material-ui/core';
import { Checkbox } from '@components/FormFieldLegion';
import useResponsive from '@utils/hooks/useResponsive';
import useStyles from './styles';

const CheckboxGroup = (props) => {
  const mobileClient = useResponsive('xs');
  const classes = useStyles(mobileClient);
  const { control, option, onChangeChecked, onClickDelete, onClickEdit } =
    props;

  if (!option || option.length === 0) {
    return (
      <div className={classes.noData}>
        <StateMessage
          description="PIC not found. Start by inputing a new PIC."
          ilustration={NoData}
          size="small"
        />
      </div>
    );
  }

  return (
    <>
      {option?.map((item, index) => (
        <div className={classes.item} key={item?.fullName}>
          <Checkbox
            className={classes.checkbox}
            control={control}
            checked={item?.checked}
            customValue
            onChange={onChangeChecked(item, index)}
            label={
              <div className={classes.option}>
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
                    onClick={onClickEdit(item, index)}
                    size="small"
                    style={{
                      color: color.yellow.main,
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  {!item.id && (
                    <IconButton
                      onClick={onClickDelete(index)}
                      size="small"
                      style={{
                        color: color.primary.main,
                      }}
                    >
                      <Trash fontSize="small" />
                    </IconButton>
                  )}
                </div>
              </div>
            }
            name="fileType"
            value={option}
          />
        </div>
      ))}
    </>
  );
};

export default CheckboxGroup;
