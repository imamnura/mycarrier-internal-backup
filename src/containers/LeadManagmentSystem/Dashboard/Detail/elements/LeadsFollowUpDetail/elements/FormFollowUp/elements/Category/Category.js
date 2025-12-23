/* eslint-disable react/prop-types */
import AmMapping from '@assets/icon-v2/AmMapping';
import DocumentUpload from '@assets/icon-v2/DocumentUpload';
import File from '@assets/icon-v2/File';
import ProductList from '@assets/icon-v2/ProductList';
import Quote from '@assets/icon-v2/Quote';
import Button from '@components/Button';
import OptionList from '@components/OptionList';
import Typography from '@components/Typography';

import { Box, Dialog } from '@material-ui/core';
import { isHaveAccess } from '@utils/common';
import React from 'react';
import useAction from './hooks/useAction';
import useStyles from '../../styles';

const Category = (props) => {
  const { onClose, variant } = props;

  const { data, feature, onSubmit, category, setCategory, open } =
    useAction(props);

  const classes = useStyles();

  const categoryOption = () => {
    let category = [];

    if (data?.status.toLowerCase() == 'quote' && variant === 'opportunity') {
      if (isHaveAccess(feature, 'create_follow_up_product_lead')) {
        category.push({
          label: 'Product',
          value: 'product',
          Icon: ProductList,
        });
      }
      if (isHaveAccess(feature, 'create_follow_up_contact_lead')) {
        category.push({ label: 'Contact', value: 'contact', Icon: AmMapping });
      }
      return category;
    }

    if (isHaveAccess(feature, 'create_follow_up_activity_lead')) {
      if (!data?.isNetworkConnectivity || variant === 'qualify') {
        category.push({ label: 'Activities', value: 'activities', Icon: File });
      }
    }

    if (isHaveAccess(feature, 'create_follow_up_note_lead')) {
      category.push({ label: 'Note', value: 'notes', Icon: Quote });
    }

    if (isHaveAccess(feature, 'create_follow_up_attachment_lead')) {
      category.push({
        label: 'Attachments',
        value: 'attachments',
        Icon: DocumentUpload,
      });
    }

    if (variant === 'opportunity') {
      if (isHaveAccess(feature, 'create_follow_up_product_lead')) {
        category.push({
          label: 'Product',
          value: 'product',
          Icon: ProductList,
        });
      }

      if (isHaveAccess(feature, 'create_follow_up_contact_lead')) {
        category.push({ label: 'Contact', value: 'contact', Icon: AmMapping });
      }
    }
    return category;
  };

  return (
    <Dialog
      classes={{ paper: classes.dialogRoot }}
      maxWidth="lg"
      open={open}
      scroll="body"
    >
      <Box sx={{ textAlign: 'center' }}>
        <Typography color="general-dark" inline variant="h5" weight="medium">
          Choose follow up category
        </Typography>
        <br />
        {categoryOption().length < 1 && (
          <Typography
            color="general-mid"
            inline
            variant="subtitle2"
            // weight="medium"
          >
            You don&lsquo;t have permission to view this feature.
          </Typography>
        )}
      </Box>
      <Box mt={4}>
        <OptionList
          onChange={setCategory}
          options={categoryOption()}
          value={category}
        />
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button onClick={onClose} variant="ghost">
          Cancel
        </Button>
        <Button ml={16} onClick={onSubmit}>
          go ahead
        </Button>
      </Box>
    </Dialog>
  );
};

export default Category;
