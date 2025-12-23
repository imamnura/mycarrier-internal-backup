import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Box, Chip } from '@material-ui/core';
import UploadFile from '@__old/components/elements/UploadFile';
import Typography from '@components/Typography';
import { TextField, Select } from '@components/FormField';
import useStyles from '../../hooks/useStyles';

const Step1 = (props) => {
  const classes = useStyles();
  const {
    level,
    useform: { control, setValue, getValues, clearErrors },
    handleDeleteKeyword,
    handleKeyDown,
    handleUploadIcon,
    iconState: { iconFile, setIconFile },
    keywordChip,
    l2CategoryChip,
    formType,
    l2MappingOptions,
    query,
    dataInformation,
  } = props;

  const getIconL0 = getValues('iconL0');

  useEffect(() => {
    const getL0Information = JSON.parse(localStorage.getItem('l0Information'));

    setIconFile(getValues('iconL0') || getL0Information?.iconUrl);
    if (formType === 'edit' || getL0Information !== null) {
      clearErrors();
    }
  }, []);

  // set icon when icon changed
  setValue('iconL0', getIconL0 || iconFile);

  const required = (label) => {
    return (
      <>
        <Typography color="primary-main" variant="subtitle2">
          *{' '}
        </Typography>
        {label}
      </>
    );
  };

  const handleDelete = () => {
    setIconFile(null);
    setValue('iconL0', null);
  };

  const renderRightSide = () => {
    if (formType !== 'half') {
      if (level === 'l0') {
        return (
          <>
            <div className={classes.subtitle}>
              <Typography color="general-mid" variant="h4" weight="medium">
                Icon Assets
              </Typography>
            </div>

            <UploadFile
              accept={['.png', 'application/json']}
              fileName={iconFile ? iconFile.mediaName : ''}
              handleDelete={() => handleDelete()}
              isLabelInputTop={true}
              labelCustom="Example: product-icon.png"
              labelInput={required('Upload Icon Assets')}
              maxSize={5242880}
              name="iconAssets"
              onChange={(val) => handleUploadIcon(val)}
              withDelete={true}
            />
            <div style={{ marginTop: '4px' }}>
              <Typography variant="overline">
                Upload .png image, max 1 MB and size 64px x 64px
              </Typography>
            </div>
          </>
        );
      }

      if (level === 'l1') {
        if (
          query.isSingleProduct === 'true' ||
          dataInformation?.isSingleProduct
        ) {
          return '';
        }
        return (
          <Grid container>
            <Grid item sm={9} xs={12}>
              <div className={classes.subtitle}>
                <Typography color="general-mid" variant="h4" weight="medium">
                  Level Mapping
                </Typography>
              </div>
              <Box mt={3}>
                <TextField
                  control={control}
                  label="Level 2 Category"
                  maxLength={40}
                  name="l2Category"
                  onKeyDown={(e) => handleKeyDown(e, 'category')}
                  required
                />
                <div className={classes.input}>
                  <Typography color="primary-main" variant="caption">
                    Press enter to add level 2 category.
                  </Typography>
                </div>
                {l2CategoryChip.map((data, index) => {
                  return (
                    <span key={data + index}>
                      <Chip
                        className={classes.chip}
                        label={data}
                        onDelete={handleDeleteKeyword(data, 'category')}
                        variant="outlined"
                      />
                    </span>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        );
      }

      if (level === 'l2') {
        if (formType === 'create') {
          return '';
        }
        return (
          <>
            <div className={classes.subtitle}>
              <Typography color="general-mid" variant="h4" weight="medium">
                Level Mapping
              </Typography>
            </div>
            <Box mt={3}>
              <Select
                control={control}
                label="Level 2 Mapping"
                maxWidth={230}
                name="l2Mapping"
                options={l2MappingOptions}
                placeholder="Choose Level 2"
                required
              />
            </Box>
          </>
        );
      }
    } else if (formType === 'half' && level === 'l0') {
      return (
        <>
          <div className={classes.subtitle}>
            <Typography color="general-mid" variant="h4" weight="medium">
              Icon Assets
            </Typography>
          </div>

          <UploadFile
            accept={['.png', 'application/json']}
            fileName={iconFile ? iconFile.mediaName : ''}
            // handleDelete={() => setIconFile(null)}
            handleDelete={() => handleDelete()}
            isLabelInputTop={true}
            // isValidateByPixel={true}
            labelCustom="Example: product-icon.png"
            labelInput={required('Upload Icon Assets')}
            maxSize={5242880}
            name="iconAssets"
            onChange={(val) => handleUploadIcon(val)}
            // ratioPixel={[64, 64]}
            withDelete={true}
          />
          <div style={{ marginTop: '4px' }}>
            <Typography variant="overline">
              Upload .png image, max 1 MB and size 64px x 64px
            </Typography>
          </div>
        </>
      );
    }

    return '';
  };

  return (
    <Grid className={classes.wrapper} container spacing={4}>
      <Grid item sm={5} xs={12}>
        <div className={classes.subtitle}>
          <Typography color="general-mid" variant="h4" weight="medium">
            Product Information
          </Typography>
        </div>
        <Box mt={3}>
          <TextField
            control={control}
            label="Product Page Name"
            maxLength={60}
            name={`${level}ProductName`}
            required
          />
        </Box>
        <Box mt={3}>
          <TextField
            control={control}
            label="Product Slug"
            maxLength={60}
            name={`${level}ProductSlug`}
            required
          />
        </Box>
        <Box mt={3}>
          <TextField
            control={control}
            label="Meta Title"
            maxLength={40}
            name={`${level}MetaSeo.title`}
            required
          />
        </Box>
        <Box mt={3}>
          <TextField
            control={control}
            disabled={keywordChip.length >= 4}
            label="Meta Keyword"
            maxLength={40}
            name={`${level}MetaKeyword`}
            onKeyDown={handleKeyDown}
            required
          />
          <div className={classes.input}>
            <Typography color="primary-main" variant="caption">
              Press enter to add keyword, max 4 keywords.
            </Typography>
          </div>
          {keywordChip.length > 0 &&
            keywordChip.map((data, index) => {
              return (
                <span key={data + index}>
                  <Chip
                    className={classes.chip}
                    label={data}
                    onDelete={handleDeleteKeyword(data)}
                    variant="outlined"
                  />
                </span>
              );
            })}
        </Box>
        <Box mt={3}>
          <TextField
            control={control}
            label="Meta Description"
            maxLength={160}
            minRows={5}
            multiline
            name={`${level}MetaSeo.description`}
            required
          />
        </Box>
      </Grid>

      <Grid item sm={7} xs={12}>
        {renderRightSide()}
      </Grid>
    </Grid>
  );
};

Step1.defaultProps = {
  dataInformation: {},
  formType: '',
  keywordChip: [],
  l2CategoryChip: [],
  l2MappingOptions: [],
  level: 'l0',
  query: {},
  useform: {},
};

Step1.propTypes = {
  dataInformation: PropTypes.object,
  formType: PropTypes.string,
  handleDeleteKeyword: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handleUploadIcon: PropTypes.func.isRequired,
  iconState: PropTypes.object.isRequired,
  keywordChip: PropTypes.array,
  l2CategoryChip: PropTypes.array,
  l2MappingOptions: PropTypes.array,
  level: PropTypes.string,
  query: PropTypes.object,
  useform: PropTypes.object,
};

export default Step1;
