import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';
import Text from '@__old/components/elements/Text';
import Skeleton from 'react-loading-skeleton';
import { dateFormat } from '@utils/parser';
import { CircularProgress, Grid } from '@material-ui/core';
import Tabs from '@components/Tabs';
import Table from '@components/Table';
import { tableHeader, optionTab, emptyMessageTabList } from '../constant';
import FileViewer from '@layouts/FileViewer';
import Button from '@components/Button';

const Component = (props) => {
  const {
    data,
    classes,
    loading,
    // isLoading,
    tab,
    tabList,
    ScIntegrationStatus,
  } = props;
  const scrollable = React.useRef(0);
  const activationStatus =
    data?.data?.isNetworkConnectivity && ScIntegrationStatus
      ? data?.data?.statusStarClick
      : data?.data?.status;
  const [openPreview, setOpenPreview] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState({
    fileUrl: '',
    fileName: '',
  });

  const infinityScroll = () => {
    const validate =
      scrollable.current.scrollHeight -
        Math.round(scrollable.current.scrollTop) <=
      scrollable.current.clientHeight;
    if (validate) tabList.onBottomPage();
  };

  const content = (value) => {
    if (Object.keys({ data }).length === 0) {
      return <Skeleton />;
    } else if (Array.isArray(value)) {
      return (
        <Text variant="subtitle1Bold">
          {value.map((item) => item).join(', ')}
        </Text>
      );
    } else {
      return <Text variant="subtitle1Bold">{!value ? '-' : value}</Text>;
    }
  };

  const handleChangeTab = (value) => {
    tab.setActiveTab(value);
  };

  const statusActivityOn = (stageType) => {
    if (stageType === 'lead') return 'Qualify';
    else if (data?.data?.ncxIdentity?.oppNumber && stageType === 'opportunity')
      return 'Opportunity';
    else if (stageType === 'quote') return 'Auto Quote';
    else return '';
  };

  const tableData = tabList.dataList.data?.map((d) => ({
    ...d,
    name:
      tab.activeTab === 2 ? (
        <Text
          children={d.name}
          color="primary"
          onClick={async (e) => {
            e.stopPropagation();
            await setAttachmentFile({
              fileUrl: d.fileUrl,
              fileName: d.name,
            });
            setOpenPreview(true);
          }}
          style={{ cursor: 'pointer' }}
          variant="subtitle2"
        />
      ) : (
        d.name
      ),
    stageType:
      tab.activeTab === 0 ? statusActivityOn(d.stageType) : d.stageType,
  }));

  const starclickDetail = (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Starclick Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item xs={11}>
          <Tabs
            onChange={handleChangeTab}
            options={optionTab}
            value={tab.activeTab}
          />
          <div
            id="sectionScroll"
            onScroll={infinityScroll}
            ref={scrollable}
            style={{
              height: tabList?.dataList?.data?.length > 5 ? 500 : 'auto',
              overflow: 'auto',
            }}
          >
            <Table
              // data={tabList.dataList.data}
              data={tableData}
              emptyMessage={emptyMessageTabList(tab.activeTab)}
              loading={tabList.loadingTabList.row}
              loadingRoot={tabList.loadingTabList.root}
              meta={tabList.dataList.meta}
              numbering={false}
              schema={tableHeader(tab.activeTab)}
            />
          </div>
        </Grid>
      </Grid>
    </>
  );

  const neucentrixDetail = (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          NeuCentrIX Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              NEUCENTRIX TYPE
            </Text>
            {content(data.data?.metaData?.type)}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              NEUCENTRIX POWER
            </Text>
            {content(data.data?.metaData?.power)}
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              NEUCENTRIX LOCATION
            </Text>
            {content(data.data?.metaData?.location)}
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              NEUCENTRIX ADDRESS
            </Text>
            {content(data.data?.metaData?.addressNeucentrix)}
          </div>
        </Grid>
      </Grid>
    </>
  );

  const ncxIdentity = (activationStatus === 'Create_Opportunity' ||
    activationStatus === 'Auto_Quote' ||
    activationStatus === 'Drop_Quote') &&
    data?.data?.ncxIdentity && (
      <>
        <div className={classes.subtitle}>
          <Text color="grey" variant="h4">
            NCX Identity
          </Text>
        </div>
        <Grid container direction="row" item justifyContent="flex-start">
          <Grid item md={6} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                OPP ID
              </Text>
              {content(data?.data?.ncxIdentity?.oppId)}
            </div>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                OPP NUMBER
              </Text>
              {content(data?.data?.ncxIdentity?.oppNumber)}
            </div>
          </Grid>
        </Grid>
      </>
    );

  const contactDetail = (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Contact Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                CONTACT PERSON NAME
              </Text>
              {content(data?.data?.contactPerson?.name)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                OCCUPATION
              </Text>
              {content(data?.data?.contactPerson?.occupation)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                CONTACT NUMBER
              </Text>
              {content(data.data?.contactPerson?.phone)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                BUSINESS MAIL
              </Text>
              {content(data.data?.contactPerson?.email)}
            </div>
          </Grid>
        }
      </Grid>
    </>
  );

  const revenueDetail = (activationStatus === 'Create_Opportunity' ||
    activationStatus === 'Auto_Quote' ||
    activationStatus === 'Drop_Quote') && (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Revenue
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="primary" variant="h4" weight="medium">
              {data?.data?.revenue}
            </Text>
          </div>
        </Grid>
      </Grid>
    </>
  );

  const productDetail = (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Product Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              INTERESTED ID
            </Text>
            {content(data?.data?.productDetail?.interestId)}
          </div>
        </Grid>
        {
          <Grid item md={6} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                DATE
              </Text>
              {content(
                dateFormat({ date: data?.data?.createdAt, type: 'date-time' }),
              )}
            </div>
          </Grid>
        }
        {
          <Grid item md={6} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                PRODUCT
              </Text>
              {content(data.data?.productDetail?.productName)}
            </div>
          </Grid>
        }
        {
          <Grid item md={6} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                UPDATED DATE
              </Text>
              {content(
                dateFormat({ date: data?.data?.updatedAt, type: 'date-time' }),
              )}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                SOURCE
              </Text>
              {content(data?.data?.productDetail?.source)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                SOURCE ALIAS
              </Text>
              {content(data?.data?.sourceAlias)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                DESCRIPTION CATEGORIES
              </Text>
              {content(data?.data?.productDetail?.descriptionType)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                DESCRIPTION
              </Text>
              {content(data?.data?.productDetail?.description)}
            </div>
          </Grid>
        }
      </Grid>
    </>
  );

  const companyDetail = (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Company Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                COMPANY NAME
              </Text>
              {content(data?.data?.companyDetail?.companyName)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                BUSINESS TYPE
              </Text>
              {content(data?.data?.companyDetail?.businessType)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                COMPANY SIZE
              </Text>
              {content(data?.data?.companyDetail?.companySize)}
            </div>
          </Grid>
        }
        {
          <Grid item md={12} xs={12}>
            <div className={classes.subitem}>
              <Text color="grey" variant="caption">
                LOCATION
              </Text>
              {content(data?.data?.companyDetail?.location)}
            </div>
          </Grid>
        }
      </Grid>
    </>
  );

  const analyticDetail = (data?.data?.googleAnalyticDetail?.placement ||
    data?.data?.googleAnalyticDetail?.clientId) && (
    <>
      <div className={classes.subtitle}>
        <Text color="grey" variant="h4">
          Google Analytic Detail
        </Text>
      </div>
      <Grid container direction="row" item justifyContent="flex-start">
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              CLIENT ID
            </Text>
            {content(data?.data?.googleAnalyticDetail?.clientId)}
          </div>
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">BIGQUERY CLIENT ID</Text>
            {content(data?.data?.googleAnalyticDetail?.bigQueryClientId)}
          </div>
        </Grid> */}
        {/* <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">DATE LAST SEEN</Text>
            {content(data?.data?.googleAnalyticDetail?.dateLastSeen)}
          </div>
        </Grid> */}
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              DEVICE CATEGORY
            </Text>
            {content(data?.data?.googleAnalyticDetail?.deviceCategory)}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              DEVICE PLATFORM
            </Text>
            {content(data?.data?.googleAnalyticDetail?.devicePlatform)}
          </div>
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">DATE ACQUISITION</Text>
            {content(data?.data?.googleAnalyticDetail?.dataAcquisition)}
          </div>
        </Grid> */}
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              CHANNEL
            </Text>
            {content(data?.data?.googleAnalyticDetail?.channel)}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              SOURCE / MEDIUM
            </Text>
            {content(data?.data?.googleAnalyticDetail?.source)}
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              CAMPAIGN
            </Text>
            {content(data?.data?.googleAnalyticDetail?.campaign)}
          </div>
        </Grid>
        <Grid item md={12} xs={12}>
          <div className={classes.subitem}>
            <Text color="grey" variant="caption">
              PLACEMENT
            </Text>
            {content(data?.data?.googleAnalyticDetail?.placement)}
          </div>
        </Grid>
      </Grid>
    </>
  );

  return loading ? (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        paddingTop: '30vh',
      }}
    >
      <CircularProgress style={{ color: '#DE1B1B' }} />
    </div>
  ) : (
    <>
      {ncxIdentity}
      {revenueDetail}

      {activationStatus !== 'Waiting' &&
        activationStatus !== 'Invalid' &&
        data.data?.isNetworkConnectivity &&
        ScIntegrationStatus &&
        starclickDetail}

      {productDetail}
      {analyticDetail}
      {companyDetail}
      {contactDetail}
      {data.data?.isNeucentrix && neucentrixDetail}

      <FileViewer
        actionButton={
          <>
            <Button onClick={() => window.open(attachmentFile.fileUrl)}>
              Download
            </Button>
          </>
        }
        file={attachmentFile.fileUrl}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
        title={attachmentFile.fileName}
      />
    </>
  );
};

Component.defaultProps = {
  classes: {},
  data: {},
  isLoading: false,
  loading: true,
};

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  loading: PropTypes.bool,
  ScIntegrationStatus: PropTypes.bool.isRequired,
  tab: PropTypes.object.isRequired,
  tabList: PropTypes.object.isRequired,
};

export default withStyles(styles)(Component);
