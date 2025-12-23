import React from 'react';
import { Text } from '@legion-ui/core';
import useResponsive from '@utils/hooks/useResponsive';
import useStyles from './styles';

const PartnerInformation = ({ data }) => {
  const mobileClient = useResponsive('xs');
  const classes = useStyles(mobileClient);

  return (
    <div className={classes.content}>
      {data?.map((item, index) => {
        return (
          <div className={classes.itemWrapper} key={item.fullname}>
            <div className={classes.item}>
              <Text
                size="14px"
                weight="600"
                block
                color="secondary700"
                children={`${index + 1}.`}
                style={{ width: 'auto' }}
              />
              <div>
                <Text size="14px" weight="600" block color="secondary700">
                  {item.name}
                </Text>
                <Text size="12px" weight="400" color="secondary400">
                  {item.phoneNumber} {mobileClient ? '' : '\u2022'} {item.email}
                </Text>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PartnerInformation;
