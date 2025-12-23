import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@legion-ui/core';
import { useSnackbar } from 'notistack';
import { textLimit } from '@utils/text';
import { submitArticle } from '@containers/ContentManagement/Article/_repositories/repositories';
import { isHaveAccess } from '@utils/common';
import usePopupAlert from '@utils/hooks/usePopupAlert';
import { Switch } from '@legion-ui/core';

const ShowIcon = (props) => {
  const { id, displayArticle, feature, initialShowArticle, title, locatorId } =
    props;

  const { enqueueSnackbar } = useSnackbar();
  const { setFailedAlert } = usePopupAlert();

  const [isShowArticle, setIsShowArticle] = useState(initialShowArticle);

  useEffect(() => {
    setIsShowArticle(displayArticle);
  }, []);

  const onShowHideArticle = (id, value) => async () => {
    if (isHaveAccess(feature, 'update_showhide')) {
      try {
        await submitArticle({
          id,
          method: 'PUT',
          data: { articleId: id, isDisplay: !value },
        });
        setIsShowArticle(!value);

        enqueueSnackbar(
          `"${textLimit(title, 20)}" is successfully ${
            value ? 'hidden' : 'published'
          }`,
          { variant: 'success' },
        );
      } catch (error) {
        enqueueSnackbar(
          `"${textLimit(title, 20)}" is unsuccessfully ${
            value ? 'hidden' : 'published'
          }`,
          { variant: 'error' },
        );
      }
    } else {
      setFailedAlert({
        message: `You don't have permission to show/hide article.`,
      });
    }
  };

  return (
    <Box id={locatorId} onClick={(e) => e.stopPropagation()}>
      <Switch
        onChange={onShowHideArticle(id, isShowArticle)}
        checked={isShowArticle}
      />
    </Box>
  );
};

ShowIcon.defaultProps = {
  feature: [''],
  initialShowArticle: false,
};

ShowIcon.propTypes = {
  displayArticle: PropTypes.bool.isRequired,
  feature: PropTypes.array,
  id: PropTypes.number.isRequired,
  initialShowArticle: PropTypes.bool,
};

export default ShowIcon;
