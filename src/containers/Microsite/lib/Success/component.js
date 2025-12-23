import React from 'react';
import PropTypes from 'prop-types';
import images from '../../../../__old/configs/images';
import Text from '../../../../__old/components/elements/Text';
import Button from '../../../../__old/components/elements/Button';
import { setPreviousLocation } from '@utils/common';

export default function Component(props) {
  const { classes, label, url, image, buttonLabel, noButton } = props;

  const goTo = () => {
    setPreviousLocation(url);
    location.href = url;
  };

  return (
    <div className={classes.wrapper}>
      <img src={image} alt="illustration-response" />
      <br />
      <Text variant="subtitle2">{label}</Text>
      <br />
      {!noButton && <Button onClick={goTo}>{buttonLabel}</Button>}
    </div>
  );
}

Component.defaultProps = {
  buttonLabel: 'View Order',
  data: {},
  image: images.APPROVAL_SUCCESS,
  label: '',
  noButton: false,
  url: '',
};

Component.propTypes = {
  buttonLabel: PropTypes.string,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  image: PropTypes.string,
  label: PropTypes.string,
  noButton: PropTypes.bool,
  url: PropTypes.string,
};
