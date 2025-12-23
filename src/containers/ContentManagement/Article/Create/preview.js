import React from 'react';
import PropTypes from 'prop-types';
import { Box, CardMedia, Grid } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Typography from '@components/Typography';
import Skeleton from '@components/Skeleton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { dateFormat } from '@utils/parser';
import { dummyTextId, dummyTextEn } from './constant';
import Card from '@components/Card';

const FroalaEditorView = dynamic(
  async () => {
    const values = await Promise.all([
      import('react-froala-wysiwyg/FroalaEditorView'),
    ]);
    return values[0];
  },
  {
    loading: () => <p>LOADING!!!</p>,
    ssr: false,
  },
);

const Component = (props) => {
  const {
    imgPreview,
    // caption,
    story,
    // relatedProduct,
    title,
    tab,
    classes,
    updatedAt,
  } = props;
  const dateNow = updatedAt
    ? dateFormat({ date: updatedAt, type: 'full-string-date' })
    : dateFormat({ date: new Date(), type: 'full-string-date' });

  return (
    <>
      <Card title="Thumbnail Preview" style={{ marginBottom: '24px' }}>
        <Grid container direction="row" justifyContent="center" spacing={1}>
          <Grid item md={6} sm={6} xs={12}>
            <div>
              {imgPreview ? (
                <CardMedia
                  alt="image"
                  component="img"
                  // image={imgPreview}
                  className={classes.imagePreview}
                  image={imgPreview?.data?.mediaPath}
                />
              ) : (
                <Skeleton height="160px" />
              )}

              <Box>
                <Box
                  className={{
                    display: 'flex',
                  }}
                >
                  <Typography
                    children={dateNow}
                    color="general-mid"
                    variant="caption"
                    mb={12}
                    style={{
                      display: 'block',
                      marginBottom: '9px',
                    }}
                  />
                </Box>

                <Box mb={1}>
                  {title ? (
                    <Typography
                      children={title}
                      className={classes.textTitleThumbnail}
                      color="general-main"
                      variant="subtitle1"
                      weight="medium"
                    />
                  ) : (
                    <Skeleton />
                  )}
                </Box>
              </Box>
            </div>
          </Grid>
        </Grid>
      </Card>

      <Card title="Detail Preview" style={{ marginBottom: '24px' }}>
        <Box>
          {/* <Box mb={1} sx={{
          display: 'block',
          textAlign: 'left',
          wordWrap: 'break-word',
        }}>
          {
            relatedProduct.length > 0 ?
              relatedProduct.map((item, index )=> {
                return (
                  <span
                    className={classes.contentKeyword}
                    key={index}
                  >{item?.label}</span>
                );
              })
              : <Skeleton />
          }
        </Box> */}
          <div style={{ boxShadow: 'none' }}>
            {imgPreview ? (
              <CardMedia
                alt="image"
                component="img"
                height="160"
                className={classes.imagePreview}
                // image={imgPreview}
                image={imgPreview?.data?.mediaPath}
              />
            ) : (
              <Skeleton height="160px" />
            )}
            <Box
              mb={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <DateRangeIcon fontSize="small" style={{ color: '#78858B' }} />
              <Typography
                children={dateNow}
                color="general-mid"
                style={{ marginLeft: '5px' }}
              />
            </Box>
            <Box mb={1}>
              {title ? (
                <Typography
                  children={title}
                  className={classes.textTitleThumbnail}
                  color="general-main"
                  variant="h3"
                  weight="medium"
                />
              ) : (
                <Skeleton />
              )}
            </Box>
            <Box>
              {(tab === 'id' && story !== dummyTextId) ||
              (tab === 'en' && story !== dummyTextEn) ? (
                <FroalaEditorView model={story} />
              ) : (
                <>
                  <Skeleton style={{ marginBottom: '0.5rem' }} />
                  <Skeleton style={{ marginBottom: '0.5rem' }} />
                  <Skeleton style={{ marginBottom: '0.5rem' }} />
                  <Skeleton width="50%" />
                </>
              )}
            </Box>
          </div>
        </Box>
      </Card>
    </>
  );
};

Component.propTypes = {
  caption: PropTypes.string,
  classes: PropTypes.object.isRequired,
  imgPreview: PropTypes.string,
  relatedProduct: PropTypes.array,
  story: PropTypes.string,
  tab: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
};

Component.defaultProps = {
  caption: '',
  imgPreview: '',
  relatedProduct: [],
  story: '',
  tab: 'id',
  title: '',
  updatedAt: '',
};

export default Component;
