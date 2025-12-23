import React from 'react';
import PropTypes from 'prop-types';
import ProductModal from '@assets/Svg/ProductModal';
import Dialog from '@__old/components/elements/Dialog';
import Typography from '@components/Typography';
import Button from '@components/Button';
import clsx from 'clsx';
import useStyles from './styles';

export default function ModalChooseProduct(props) {
  const { data, onClose, open, onSubmit, choosedContent, setChoosedContent } =
    props;
  const classes = useStyles();

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open}>
      <div className={classes.title}>
        <Typography
          children="Choose Content Menu"
          variant="h4"
          weight="medium"
        />
      </div>
      {data.map((item, index) => (
        <div
          className={
            choosedContent === item.id
              ? classes.sectionItemActive
              : classes.sectionItem
          }
          id="btnListMenuContent"
          key={index}
          onClick={() => setChoosedContent(item.id)}
        >
          <ProductModal
            className={clsx({
              [classes.icon]: true,
              [classes.iconActive]: choosedContent === item.id ? true : false,
            })}
          />
          <div>
            <Typography children={item.label} variant="body2" weight="bold" />
            <div>
              <Typography children={item.desc} variant="caption" />
            </div>
          </div>
        </div>
      ))}
      <div className={classes.action}>
        <Button
          children="CANCEL"
          id="cancelAddContentHomepage"
          mr={12}
          onClick={onClose}
          variant="ghost"
        />
        <Button
          children="GO AHEAD"
          disabled={!choosedContent}
          id="addContentHomepage"
          onClick={onSubmit}
        />
      </div>
    </Dialog>
  );
}

ModalChooseProduct.defaultProps = {
  choosedContent: 0,
  data: [],
  onClose: () => {},
  onSubmit: () => {},
  open: false,
};

ModalChooseProduct.propTypes = {
  choosedContent: PropTypes.number,
  data: PropTypes.array,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  setChoosedContent: PropTypes.func.isRequired,
};
