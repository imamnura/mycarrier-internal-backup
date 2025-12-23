import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SectionMark from '../../SectionMark';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography';
import Button from '@components/Button';
import useStyles from './styles';
// import { dummyText, dummyTextEng } from '../../../constant';
import { useRouter } from 'next/router';
import { ASSETS_URL } from '@constants/env';

const TalkToUs = (props) => {
  const router = useRouter();
  const { query } = router;
  const {
    tab,
    // level,
    useform: { watch },
    formType,
    previewMode,
  } = props;

  const [nameProduct, setNameProduct] = useState('');

  const watchLevel = () => {
    switch (formType) {
      case 'full':
        return 'l2ProductName';
      case 'half':
        return 'l1ProductName';
      case 'single':
        return 'l0ProductName';
      case 'create':
        if (query.isSingleProduct === 'true') {
          return 'l1ProductName';
        }
        return 'l2ProductName';
      case 'edit':
        if (query.level === 'l0') return 'l0ProductName';
        if (query.level === 'l1') return 'l1ProductName';
        if (query.level === 'l2') return 'l2ProductName';
      default:
        return 'l2ProductName';
    }
  };

  useEffect(() => {
    // if (formType === 'edit') {
    //   setNameProduct(_getValues('l2ProductName'));
    // } else {
    //   setNameProduct(watch((watchLevel())));
    // }
    setNameProduct(watch(watchLevel()));
  }, []);

  const classes = useStyles();

  const captionId = `Tertarik dengan ${nameProduct}`;
  const captionEn = `Interested in ${nameProduct}`;
  const descId = 'Kami siap membantu Anda.';
  const descEn = 'We are ready to help you.';

  return (
    <div
      style={{
        borderTop: 'none',
        border: previewMode ? 'none' : '2px dashed #E4E7E9',
        position: 'relative',
      }}
    >
      {!previewMode && <SectionMark title="Talk To Us" />}

      <Grid className={classes.swapperSection} container>
        <Grid className={classes.wrapperSectionTalk} item sm={12} xs={12}>
          <div
            style={{
              background: 'center center rgb(59, 82, 92)',
              position: 'absolute',
              top: 0,
              borderRadius: '14px',
              left: 0,
              right: 0,
              bottom: 0,
              inset: '0px',
              mixBlendMode: 'multiply',
            }}
          />
          <Grid item md={7} sm={7} xs={12}>
            <div style={{ marginBottom: '10px' }}>
              <Typography
                children={tab === 'id' ? captionId : captionEn}
                color="white"
                style={{
                  marginBottom: 4,
                  fontWeight: 'bold',
                  position: 'relative',
                  display: 'block',
                }}
                variant="h4"
              />
              <Typography
                children={tab === 'id' ? descId : descEn}
                color="white"
                style={{
                  position: 'relative',
                  display: 'block',
                  marginTop: '10px',
                }}
              />
            </div>
          </Grid>
          <Grid
            item
            md={5}
            sm={5}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '2',
            }}
            xs={12}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                children="REQUEST A CALL BACK"
                style={{ marginRight: '10px' }}
              />
              <Button
                className={classes.btnTalk}
                style={{
                  marginRight: '10px',
                  border: '1px solid white',
                  background: 'transparent',
                }}
              >
                <span style={{ marginRight: '10px' }}>
                  <img
                    alt="Whatsapp"
                    area-hidden="true"
                    focusable="false"
                    src={`${ASSETS_URL}/ewz-mytens-pub-dev/catalogpublic/v2/icon-whatsapp.svg`}
                    style={{ width: '16px', height: '16px' }}
                  />
                </span>
                <span>TALK TO US</span>
              </Button>
            </div>
          </Grid>
          <div
            style={{
              position: 'absolute',
              top: '0',
              right: '20%',
              width: '170px',
              height: '100%',
            }}
          >
            <img
              alt="phone"
              area-hidden="true"
              focusable="false"
              src={`${ASSETS_URL}/ewz-mytens-pub-dev/catalogpublic/v2/phone-call.png`}
              style={{ height: '100%' }}
            />
          </div>
        </Grid>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          <Typography
            children={
              tab === 'id'
                ? 'Temukan solusi bisnis Anda.'
                : 'Find your business solution.'
            }
            style={{ marginRight: '10px' }}
            variant="subtitle2"
            weight="light"
          />
          <Typography
            children={tab === 'id' ? `MARI BERDISKUSI` : `LET'S DISCUSSION`}
            color="primary-main"
            style={{ fontSize: '16px', fontWeight: '700' }}
          />
        </div>
      </Grid>
    </div>
  );
};

TalkToUs.defaultProps = {
  level: '',
  previewMode: false,
  productName: '',
  tab: 'id',
  useform: {},
};

TalkToUs.propTypes = {
  formType: PropTypes.string.isRequired,
  level: PropTypes.string,
  previewMode: PropTypes.bool,
  productName: PropTypes.string,
  tab: PropTypes.string,
  useform: PropTypes.object,
};

export default TalkToUs;
