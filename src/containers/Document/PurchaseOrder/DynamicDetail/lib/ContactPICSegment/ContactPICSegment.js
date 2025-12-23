import React from 'react';
import Button from '@components/Button';
import { Box } from '@material-ui/core';
import { Text } from '@legion-ui/core';
import useStyles from './styles';

const ContactPICSegment = ({
  showOptionsPICSegment,
  setShowOptionsPICSegment,
  status,
  data,
}) => {
  const classes = useStyles();

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => {
          setShowOptionsPICSegment(!showOptionsPICSegment);
        }}
      >
        CONTACT PIC {status}
      </Button>

      {showOptionsPICSegment && (
        <Box className={classes.actionWrapper}>
          {data.map((item, index) => {
            return (
              <Box
                key={index}
                className={classes.actionOptions}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://wa.me/${item?.phoneNumber}`, '_blank');
                  setShowOptionsPICSegment(!showOptionsPICSegment);
                }}
              >
                <Text color="secondary700" weight="700" size="16px">
                  {item.name}
                </Text>
                <Text color="secondary400" weight="400" size="14px">
                  {item.role} • {item.nik}
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default ContactPICSegment;
