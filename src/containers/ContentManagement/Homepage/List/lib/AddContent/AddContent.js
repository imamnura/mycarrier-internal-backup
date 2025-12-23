import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Box, Dialog } from '@material-ui/core';
import Button from '@components/Button';
import BannerIcon from '@assets/Svg/Banner';
import PopUp from '@assets/Svg/PopUp';
import Brochure from '@assets/Svg/Brochure';
import Typography from '@components/Typography';
import useListStyles from '../../List.styles';
import { contentMenuList as content } from '../../constant';

const AddContent = (props) => {
  const {
    addContent,
    choosedContent,
    disabled,
    open,
    onClose,
    setChoosedContent,
  } = props;

  const classes = useListStyles();

  return (
    <Dialog classes={{ paper: classes.dialogRoot }} maxWidth="lg" open={open}>
      <Box sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
        <Typography
          children="Choose Content Menu"
          color="general-dark"
          inline
          variant="h5"
          weight="medium"
        />
      </Box>
      {content.map((item, index) => (
        <Box
          className={
            choosedContent === item.id
              ? classes.sectionItemActive
              : classes.sectionItem
          }
          id="btnChooseContentHomepage"
          key={index}
          onClick={() => setChoosedContent(item.id)}
        >
          {item.id === 1 && (
            <BannerIcon
              className={clsx({
                [classes.icon]: true,
                [classes.iconActive]: choosedContent === item.id ? true : false,
              })}
            />
          )}
          {item.id === 2 && (
            <Brochure
              className={clsx({
                [classes.icon]: true,
                [classes.iconActive]: choosedContent === item.id ? true : false,
              })}
            />
          )}
          {item.id === 3 && (
            <PopUp
              className={clsx({
                [classes.icon]: true,
                [classes.iconActive]: choosedContent === item.id ? true : false,
              })}
            />
          )}
          <p style={{ marginLeft: '2em' }}>{item.label}</p>
        </Box>
      ))}
      <Box className={classes.buttonContainer}>
        <Button
          children="CANCEL"
          id="btnCancelChooseContent"
          onClick={onClose}
          variant="ghost"
        />
        <Button
          children="GO AHEAD"
          disabled={disabled}
          id="btnAddContentHomepage"
          onClick={() => addContent(choosedContent)}
        />
      </Box>
    </Dialog>
  );
};

AddContent.propTypes = {
  addContent: PropTypes.func,
  choosedContent: PropTypes.number,
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setChoosedContent: PropTypes.func,
};

AddContent.defaultProps = {
  addContent: () => {},
  choosedContent: 1,
  disabled: false,
  open: false,
  onClose: () => {},
  setChoosedContent: () => {},
};

export default AddContent;
