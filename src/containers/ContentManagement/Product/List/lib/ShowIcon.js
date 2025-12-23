import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { isHaveAccess } from '@utils/common';
import { updateProduct } from '../../_repositories/repositories';
import { textLimit } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import Switch from '@components/Switch';
import { Box } from '@material-ui/core';

const ShowIcon = (props) => {
  const { id, displayProduct, feature, initialShowProduct } = props;

  const [isShowProduct, setIsShowProduct] = useState(initialShowProduct);
  const { enqueueSnackbar } = useSnackbar();
  const { setFailedAlert } = usePopupAlert();

  useEffect(() => {
    setIsShowProduct(displayProduct);
  }, []);

  const onShowHideProduct = (id, value) => async () => {
    if (isHaveAccess(feature, 'update_showhide')) {
      let formData = new FormData();
      formData.append('isDisplay', !value);

      try {
        const result = await updateProduct({ id, data: formData });
        const { data } = result;
        setIsShowProduct(data.isDisplay);

        data.isDisplay
          ? enqueueSnackbar(
              `"${textLimit(data.productName, 15)}" Successfully unhide`,
            )
          : enqueueSnackbar(
              `"${textLimit(data.productName, 15)}" Successfully hide`,
            );
      } catch (error) {
        enqueueSnackbar('Unsuccessfully hide/unhide');
      }
    } else {
      setFailedAlert({
        message: "You don't have permission to show/hide product",
      });
    }
  };

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Switch
        onChange={onShowHideProduct(id, isShowProduct)}
        value={isShowProduct}
      />
    </Box>
  );
};

ShowIcon.defaultProps = {
  displayProduct: false,
  feature: [''],
  initialShowProduct: false,
};

ShowIcon.propTypes = {
  displayProduct: PropTypes.bool,
  feature: PropTypes.array,
  id: PropTypes.number.isRequired, //product v1
  initialShowProduct: PropTypes.bool,
};

export default ShowIcon;
