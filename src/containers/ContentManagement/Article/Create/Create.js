import React from 'react';
import { Grid } from '@material-ui/core';
import { Box } from '@legion-ui/core';
import {
  AutoComplete,
  FileUpload,
  Select,
  TextField,
} from '@components/FormField';
import { route } from '@configs';
import ArrowDown from '@assets/Svg/ArrowDown';
import Card from '@components/Card';
import Chip from '@components/Chip';
import Create from '@fragments/Create';
import Preview from './preview';
import Wysiwyg from '@components/Wysiwyg';
import Tabs from '@components/Tabs';
import Typography from '@components/Typography';
import { dummyTextId, dummyTextEn, imageCaption } from './constant';
import { getUrlMedia } from '@containers/ContentManagement/Article/_repositories/repositories';
import useActions from './hooks/useActions';
import useStyles from './styles';

const Add = (props) => {
  const classes = useStyles();

  const {
    chipKeyword,
    chipRelatedProduct,
    control,
    detail,
    confirmAdd,
    handleCancel,
    handleSubmit,
    handleSwap,
    handleEditStory,
    image,
    id,
    isLoading,
    languages,
    loadingProduct,
    loadingCategory,
    onDeleteChipKeyword,
    onDeleteChipRelatedProduct,
    onKeyDownKeyword,
    optionsProduct,
    optionsCategory,
    tab,
    setTab,
    storyIdValue,
    storyEnValue,
    validateForm,
    watchTranslate,
  } = useActions(props);

  const tabsProps = {
    onChange: setTab,
    options: languages,
    value: tab,
    onSwap: handleSwap,
  };

  const helperErrorStory = (
    <Typography
      children={`Story (${tab}) is a required field`}
      color="primary-main"
      variant="caption"
    />
  );

  return (
    <Create
      action={[
        {
          children: 'Cancel',
          id: 'btnCancelArticle',
          onClick: handleCancel,
          variant: 'ghost',
        },
        {
          children: 'Save',
          disabled: validateForm,
          id: 'btnSaveArticle',
          loading: isLoading,
          onClick: handleSubmit(confirmAdd),
          // hideDivider: true,
          // ml: 16,
        },
      ]}
      breadcrumb={[
        { label: 'Article Management', url: route.article('list') },
        { label: `${id ? 'Edit' : 'Add'} Article` },
      ]}
      loading={isLoading}
    >
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card title="Article Attributes" style={{ marginBottom: '24px' }}>
            <Box>
              <Tabs {...tabsProps} />
            </Box>
            <Box>
              <AutoComplete
                control={control}
                label="Choose Article Category"
                loading={loadingCategory}
                name="categoryArticle"
                options={optionsCategory}
                required
                rightAdornment={ArrowDown}
              />
            </Box>
            <Box>
              <TextField
                control={control}
                label={`Article Name (${tab})`}
                maxLength={140}
                name={`name${tab}`}
                required
              />
            </Box>
            <Box>
              <TextField
                control={control}
                label={`Caption (${tab})`}
                maxLength={255}
                minRows={4}
                multiline
                name={`caption${tab}`}
                required
              />
            </Box>
            <Box>
              <FileUpload
                accept={['.png']}
                control={control}
                fetcher={getUrlMedia()}
                helperText={imageCaption}
                label="Add Image File"
                maxSize={1048576} // 1Mb
                name="imageFile"
                placeholder="Example: satellite.png"
                ratioPixel={[600, 400]}
                required
                shouldUnregister
                withCropper
              />
            </Box>
            <Box mb="8px" mt="16px">
              <Box mb="8px">
                <Typography
                  children="*"
                  color="primary-main"
                  variant="subtitle2"
                />
                <Typography
                  children={`Story (${tab})`}
                  color="general-mid"
                  variant="caption"
                />
              </Box>
              <Wysiwyg
                helperText={
                  tab === 'id' && storyIdValue === dummyTextId
                    ? helperErrorStory
                    : tab === 'en' &&
                      storyEnValue === dummyTextEn &&
                      helperErrorStory
                }
                // onChange={(data) => handleEditStory(data)}
                onChange={handleEditStory}
                value={tab === 'id' ? storyIdValue : storyEnValue}
                variant="article"
              />
            </Box>
          </Card>
          <Card title="Related Product" style={{ marginBottom: '24px' }}>
            <Box>
              <Select
                control={control}
                isSearchable
                isLoading={loadingProduct}
                name="relatedProduct"
                options={optionsProduct}
                placeholder="Choose Related Product"
                staticWidth="100%"
              />
              {chipRelatedProduct.length > 0 &&
                chipRelatedProduct.map((data, index) => {
                  return (
                    <span key={data + index}>
                      <Chip
                        background="white"
                        color="general-mid"
                        colorIcon="red"
                        label={data?.label}
                        // onDelete={() => onDeleteChipRelatedProduct(data)}
                        onDelete={onDeleteChipRelatedProduct(data)}
                        variant="outlined"
                        weight="normal"
                      />
                    </span>
                  );
                })}
            </Box>
          </Card>
          <Card title="Focus Keyword">
            <Box>
              <TextField
                control={control}
                disabled={chipKeyword.length >= 4}
                label="Type Keyword"
                maxLength={40}
                name="keyword"
                // onKeyDown={(e) => onKeyDownKeyword(e)}
                onKeyDown={onKeyDownKeyword}
                placeholder="Press enter to add keyword, max 4 keyword"
                required
              />
              {chipKeyword.length > 0 &&
                chipKeyword.map((data, index) => {
                  return (
                    <span key={data + index}>
                      <Chip
                        background="white"
                        color="general-mid"
                        colorIcon="red"
                        label={data}
                        // onDelete={() => onDeleteChipKeyword(data)}
                        onDelete={onDeleteChipKeyword(data)}
                        variant="outlined"
                        weight="normal"
                      />
                    </span>
                  );
                })}
            </Box>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Preview
            caption={tab === 'id' ? watchTranslate[1] : watchTranslate[3]}
            classes={classes}
            imgPreview={image}
            relatedProduct={chipRelatedProduct}
            story={tab === 'id' ? storyIdValue : storyEnValue}
            tab={tab}
            title={tab === 'id' ? watchTranslate[0] : watchTranslate[2]}
            updatedAt={detail?.updatedAt}
          />
        </Grid>
      </Grid>
    </Create>
  );
};

Add.defaultProps = {};

Add.propTypes = {};

export default Add;
