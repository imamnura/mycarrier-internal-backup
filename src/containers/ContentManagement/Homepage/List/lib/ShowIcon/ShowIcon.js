import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { isHaveAccess } from '@utils/common';
import { Box } from '@material-ui/core';
import { updateShowHide } from '@containers/ContentManagement/Homepage/_repositories/repositories';
import { textLimit } from '@utils/text';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import Switch from '@components/Switch';

const ShowIcon = (props) => {
  const { id, displayBanner, feature, initDisplayBanner } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { setFailedAlert } = usePopupAlert();

  const [isShowBanner, setIsShowBanner] = useState(initDisplayBanner);

  useEffect(() => {
    setIsShowBanner(displayBanner);
  }, []);

  const onShowHideBanner = (id, value) => async () => {
    if (isHaveAccess(feature, 'update_showhide')) {
      const payload = {
        type: 'banner',
        isDisplay: !value,
      };
      try {
        const result = await updateShowHide({ id, data: payload });
        const { data } = result;
        setIsShowBanner(data.isDisplay);

        data.isDisplay
          ? enqueueSnackbar(
              `"${textLimit(
                data.localizations[0]?.title,
                20,
              )}" Successfully unhide`,
            )
          : enqueueSnackbar(
              `"${textLimit(
                data.localizations[0]?.title,
                20,
              )}" Successfully hide`,
            );
      } catch (error) {
        enqueueSnackbar('Unsuccessfully hide/unhide');
      }
    } else {
      setFailedAlert({
        message: `You don't have permission to show/hide banner.`,
      });
    }
  };

  return (
    <Box id="btnShowHideBanner" onClick={(e) => e.stopPropagation()}>
      <Switch
        onChange={onShowHideBanner(id, isShowBanner)}
        value={isShowBanner}
      />
    </Box>
  );
};

ShowIcon.defaultProps = {
  feature: [],
  initDisplayBanner: false,
};

ShowIcon.propTypes = {
  displayBanner: PropTypes.bool.isRequired,
  feature: PropTypes.array,
  id: PropTypes.number.isRequired,
  initDisplayBanner: PropTypes.bool,
};

export default ShowIcon;
