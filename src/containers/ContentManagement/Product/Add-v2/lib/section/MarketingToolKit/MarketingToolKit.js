import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SectionMark from '../../SectionMark';
import Typography from '@components/Typography';
import TextField from '@components/TextField';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import FileAttachment from '../../FileAttachment';
import UploadFile from '../../UploadFile';
import useStyles from './styles';
import useActions from './hooks/useActions';
import { ASSETS_URL } from '@constants/env';

const MarketingToolKit = (props) => {
  const { tab } = props;
  const {
    l2Documents,
    handleAddFile,
    handleDelete,
    previewMode,
    nameProduct,
    isDisplayProductMarketingToolkit,
    setIsDisplayProductMarketingToolkit,
  } = useActions(props);
  const classes = useStyles();

  const checkTopSectionBorder = () => {
    if (previewMode) {
      return 'none';
    }

    if (tab === 'id' || l2Documents.length !== 0) {
      return '2px dashed #E4E7E9';
    }

    return 'none';
  };

  if (isDisplayProductMarketingToolkit || !previewMode) {
    return (
      <div
        className={classes.root}
        style={{
          borderTop: 'none',
          border: previewMode ? 'none' : '2px dashed #E4E7E9',
          position: 'relative',
        }}
      >
        <div className={classes.backgroundTop}>
          {!previewMode && (
            <SectionMark
              isDisplay={isDisplayProductMarketingToolkit}
              nonmandatory
              onChange={() =>
                setIsDisplayProductMarketingToolkit(
                  !isDisplayProductMarketingToolkit,
                )
              }
              title="Marketing Tool Kit"
            />
          )}

          <Grid
            className={classes.topSection}
            container
            style={{
              borderBottom: checkTopSectionBorder(),
              padding: previewMode ? '2.5rem 1rem' : '3rem 4rem',
              width: '100%',
              maxWidth: '1280px',
              marginInline: 'auto',
            }}
          >
            <Grid item md={11} style={{ zIndex: 1 }} xs={12}>
              <div>
                <Typography color="general-main" variant="h4" weight="medium">
                  Download {nameProduct} Brosur
                </Typography>
              </div>
              <div>
                <Typography
                  children={
                    tab === 'id'
                      ? 'Untuk mendapatkan brosur silahkan isi data diri anda dibawah ini'
                      : 'To get a brochure, please fill in your personal data below'
                  }
                  color="general-main"
                  variant="caption"
                />
              </div>

              <Grid container spacing={1}>
                <Grid item md={3} xs={12}>
                  <TextField disabled label="Nama" required />
                </Grid>
                <Grid item md={5} xs={12}>
                  <TextField disabled label="Email" required />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Button variant="filled">Download brochure</Button>
                </Grid>
              </Grid>

              <div>
                <Checkbox disabled />{' '}
                <Typography color="general-mid" variant="caption">
                  Agree, Data cannot be changed after submitting
                </Typography>
              </div>
            </Grid>

            <img
              alt="brochure ilustration"
              className={classes.brochureIcon}
              src={`${ASSETS_URL}/ewz-mycarrier-pub-dev/public/brochure/brochure-illustration.png`}
            />
          </Grid>
        </div>

        {!previewMode && (
          <div
            style={{
              boxSizing: 'border-box',
              padding: tab === 'id' || l2Documents.length !== 0 ? '4rem' : 0,
            }}
          >
            {tab === 'id' && (
              <UploadFile
                accept={['.pdf', '.jpg', '.png']}
                onChange={handleAddFile}
              />
            )}

            {l2Documents.length !== 0 && (
              <div>
                <div
                  style={{
                    marginBottom: '12px',
                    marginTop:
                      tab === 'id' && !l2Documents.length != 0 ? 40 : 0,
                  }}
                >
                  <Typography color="general-main" variant="h4" weight="medium">
                    Uploaded Document
                  </Typography>
                </div>

                <Grid container>
                  <Grid item style={{ paddingBottom: 10 }} xs={12}>
                    {l2Documents.map((document, i) => (
                      <FileAttachment
                        fileName={document.name}
                        key={`l2Document-${i}`}
                        onDelete={() => handleDelete(i, document.id)}
                        tab={tab}
                        type={document.fileType}
                        url={document.path}
                      />
                    ))}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        )}

        <div
          className={
            !isDisplayProductMarketingToolkit && classes.disabledSection
          }
        />
      </div>
    );
  }

  return <></>;
};

MarketingToolKit.propTypes = {
  tab: PropTypes.string,
};

MarketingToolKit.defaultProps = {
  tab: 'id',
};

export default MarketingToolKit;
