import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Grid } from '@material-ui/core';
import { useRouter } from 'next/router';
import { isHaveAccess } from '@utils/common';
import { cleanObject } from '@utils/common';
import { size } from '@fragments/List/List';
import Reload from '@assets/icon-v2/Reload';
import usePopupAlert from '@utils/hooks/usePopupAlert';

import Breadcrumb from '@__old/components/elements/Breadcrumb';
import Divider from '@__old/components/elements/Divider';
import Text from '@__old/components/elements/Text';
import Status from '@__old/components/elements/Status';
import CallbackAlert from '@__old/components/elements/CallbackAlert';
import Button from '@components/Button';

import ListAMAssigned from './component/previewAm';
import ListDetail from './component/detail';
import Worklog from './component/worklog';
import {
  getTabList,
  submitInterestMapping,
  getStatusEmail,
  getStatusWhatsapp,
  checkScIntegrationStatus,
} from '../_repositories/repositories';
import {
  steps,
  stepsNonConnect,
  stepChoice,
  stepChoiceNonConnect,
} from './constant';
import { status } from '../List/constant';
import FormValidation from './component/formValidation';
export default function Component(props) {
  const {
    action,
    classes,
    interestedListDetail,
    isLoading,
    // for testing
    initLoading,
    initConfirmInvalid,
    initChooseOption,
    initScIntegrationStatus,
  } = props;

  const {
    query: { id },
  } = useRouter();
  const { data } = interestedListDetail;
  const { setFailedAlert, setLoadingAlert, setSuccessAlert } = usePopupAlert();
  const dataAmMapping = data?.status === 'Valid' && data?.amMapping;
  const dataSendEmail = data?.status === 'Valid' && data?.sendEmail;
  // data?.worklog = testWorklog;
  // data?.isNetworkConnectivity = true;
  // data?.statusStarClick = 'Auto_Quote';

  const [loading, setLoading] = useState(initLoading);
  const [loadingScIntegrationStatus, setLoadingScintegrationStatus] =
    useState(initLoading);
  const [isQuestion, setIsQuestion] = useState(true);
  const [isChooseOption, setIsChooseOption] = useState(initChooseOption);
  const [isShowBtnReassign, setIsShowBtnReassign] = useState(false);
  const [isConfirmInvalid, setIsConfirmInvalid] = useState(initConfirmInvalid);
  const [formValidation, setFormValidation] = useState('');
  const [showQuestionRemapping, setShowQuestionRemapping] = useState(false);

  const [salesAssigned, setSalesAssigned] = useState([]);
  const [emailAssigned, setEmailAssigned] = useState('');
  const [nameAssigned, setNameAssigned] = useState('');
  const [numberAssigned, setNumberAssigned] = useState('');
  const [selectedCompanyName, setSelectedCompanyName] = useState('');
  const [selectedCompanyNum, setSelectedCompanyNum] = useState('');
  const [selectedPreAccount, setSelectedPreAccount] = useState(true);
  const [disableBtnSubmitEmail, setDisableBtnSubmitEmail] = useState('');
  const [disableBtnReassign, setDisableBtnReassign] = useState(false);

  const [statusEmailMailgun, setStatusEmailMailgun] = useState('');
  const [statusWaMailgun, setStatusWaMailgun] = useState('');
  const [assignedBy, setAssignedBy] = useState('');
  const [newDataAm, setNewDataAm] = useState([]);
  const [hasStatusEmailAndWA, setHasStatusEmailAndWA] = useState(true);
  const [
    isDoneGetStatusWaAndEmailMailgun,
    setIsDoneGetStatusWaAndEmailMailgun,
  ] = useState(false);
  const [ScIntegrationStatus, setScIntegrationStatus] = useState(
    initScIntegrationStatus,
  );

  const validateBtnSubmit =
    formValidation === 'form-sales-team'
      ? !Object.keys(salesAssigned).length
      : disableBtnSubmitEmail;

  const [alert, setAlert] = useState({
    content: '',
    success: true,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState({});
  const [loadingTabList, setLoadingTabList] = useState({
    root: true,
    row: false,
  });
  const [page, setPage] = useState(1);
  const callback = () => {
    setLoading(false);
  };

  const activationStatus =
    data?.isNetworkConnectivity && ScIntegrationStatus
      ? data?.statusStarClick
      : data?.status;
  const lengthWorklog = data?.worklog?.length ?? false;
  const isRetireWithoutQualify =
    (lengthWorklog &&
      data?.worklog[lengthWorklog - 1].status === 'Retire' &&
      data?.worklog[lengthWorklog - 2].status === 'Valid') ||
    false;

  const fetchTabList = async (resetData) => {
    const oldData = resetData ? [] : tabList.data;
    let type = 'lead';
    if (activationStatus === 'Create_Opportunity') type = 'opportunity';
    if (activationStatus?.includes('Quote')) type = 'quote';

    const _params = {
      type,
      page: resetData ? 1 : page,
      size,
    };
    const params = cleanObject(_params);

    if (resetData) setLoadingTabList({ root: true });
    else setLoadingTabList({ row: true });
    try {
      const result = await getTabList({ params }, activeTab, id);
      if (result) {
        const { data, meta } = result;
        const hasMore = meta.page >= meta.totalPages ? false : true;
        const newData = data || [];
        const normalize = {
          data: [...oldData, ...newData],
          hasMore,
          meta: {
            ...meta,
            totalPage: meta.totalPages,
          },
        };
        setPage(meta.page + 1);
        setTabList(normalize);
      }
    } catch (error) {
      setTabList({
        data: [],
        hasMore: false,
        meta: {},
      });
    }
    setLoadingTabList({
      root: false,
      row: false,
    });
  };

  const fetchStatusEmailAndWA = async (assignBy) => {
    try {
      if (assignBy === 'sendEmail') {
        if (dataSendEmail.emailId) {
          const dataStatusEmail = await getStatusEmail(dataSendEmail.emailId);
          const emailStatus =
            dataStatusEmail?.data.items.length <= 0 ||
            dataStatusEmail.code !== 200
              ? 'failed'
              : dataStatusEmail.data.items[0].event;
          setStatusEmailMailgun(emailStatus);
        } else if (dataSendEmail.emailId === null) {
          setStatusEmailMailgun('failed');
        }

        if (dataSendEmail.msgId) {
          const dataStatusWA = await getStatusWhatsapp(dataSendEmail.msgId);
          const waStatus =
            dataStatusWA.data.history_status[
              dataStatusWA.data.history_status.length - 1
            ]?.status;
          setStatusWaMailgun(waStatus);
        } else if (dataSendEmail.msgId === null) {
          setStatusWaMailgun('failed');
        }
      } else {
        let remapDataAM = [];

        await Promise.all(
          dataAmMapping.map(async (item, index) => {
            let dataStatusEmail;
            let emailStatus;

            if (item.emailId) {
              dataStatusEmail = await getStatusEmail(item.emailId);
              emailStatus =
                dataStatusEmail?.data.items.length <= 0 ||
                dataStatusEmail.code !== 200
                  ? 'failed'
                  : dataStatusEmail.data.items[0].event;
            } else if (item.emailId === null) {
              emailStatus = 'failed';
            }

            let dataStatusWA;
            let waStatus;
            if (item.msgId) {
              dataStatusWA = await getStatusWhatsapp(item.msgId);
              waStatus =
                dataStatusWA.data.history_status[
                  dataStatusWA.data.history_status.length - 1
                ]?.status;
              setStatusWaMailgun(waStatus);
            } else if (item.msgId === null) waStatus = 'failed';

            if (emailStatus && waStatus) {
              remapDataAM.push({
                ...item,
                index,
                statusEmailMailgun: emailStatus,
                statusWaMailgun: waStatus,
              });
            }
          }),
        );
        setNewDataAm(remapDataAM);
        setIsDoneGetStatusWaAndEmailMailgun(true);
      }
    } catch (err) {
      setStatusEmailMailgun('failed');
      setStatusWaMailgun('failed');
    }
  };

  const fetchScIntegrationStatus = async () => {
    setLoadingScintegrationStatus(true);
    try {
      const result = await checkScIntegrationStatus();
      const { data } = result;

      setScIntegrationStatus(data?.status);
      setLoadingScintegrationStatus(false);
    } catch (err) {
      setFailedAlert({
        message: 'Failed to check sc integration status',
      });
      setLoadingScintegrationStatus(false);
    }
  };

  const onBottomPage = () => {
    tabList.hasMore && fetchTabList(false);
  };

  useEffect(() => {
    fetchScIntegrationStatus();
    action.getInterestedDetail(id, callback);
  }, [id]);

  useEffect(() => {
    if (data?.amMapping && !data?.isNetworkConnectivity) {
      setFormValidation('');
      setIsShowBtnReassign(true);
      setDisableBtnReassign(false);
    }
    if (data?.sendEmail && !data?.isNetworkConnectivity) {
      setFormValidation('');
      setIsShowBtnReassign(true);
      setDisableBtnReassign(false);
    }
    if (activationStatus === 'Waiting') {
      setIsShowBtnReassign(false);
    }
    if (
      data?.sendEmail?.statusEmail === null ||
      data?.sendEmail?.statusEmail === 'failed'
    ) {
      setShowQuestionRemapping(true);
    }
    activationStatus &&
      data?.isNetworkConnectivity &&
      ScIntegrationStatus &&
      activationStatus !== 'Waiting' &&
      activationStatus !== 'Invalid' &&
      fetchTabList(true);

    //fetch status email & wa mailgun
    if (data?.status === 'Valid') {
      if (dataSendEmail) {
        setAssignedBy('sendEmail');
        if (dataSendEmail?.emailId || dataSendEmail?.msgId) {
          fetchStatusEmailAndWA('sendEmail');
        } else {
          setHasStatusEmailAndWA(false);
        }
      } else {
        setAssignedBy('amMapping');
        if (
          data?.amMapping?.every((el) => el.emailId) ||
          data?.amMapping?.every((el) => el.msgId)
        ) {
          fetchStatusEmailAndWA('amMapping');
        }
      }
    }
  }, [interestedListDetail, activeTab]);

  const breadcrumb = () =>
    formValidation
      ? [
          { label: 'Interested List', url: '/interested-list' },
          { label: id },
          { label: 'Form Validation' },
        ]
      : [{ label: 'Interested List', url: '/interested-list' }, { label: id }];

  const handleYesClick = () => {
    setIsQuestion(false);
    data?.isNetworkConnectivity && ScIntegrationStatus
      ? setFormValidation('form-sales-team')
      : setIsChooseOption(true);
  };

  const handleCancelForm = () => {
    setFormValidation('');
    setSelectedCompanyName('');
    setSelectedCompanyNum('');
    setSelectedPreAccount(true);
    isShowBtnReassign ? setDisableBtnReassign(false) : setIsQuestion(true);
  };

  const handleInvalid = () => {
    setIsQuestion(false);
    setIsConfirmInvalid(true);
  };

  const handleBackConfirmInvalid = () => {
    setIsConfirmInvalid(false);
    setIsQuestion(true);
  };

  const fetchSubmit = async (data, id) => {
    setLoadingAlert();
    try {
      const result = await submitInterestMapping(data, id);
      const { message, success } = result;
      success &&
        setSuccessAlert({
          message,
          onClose: () =>
            (window.location.href = `/interested-list/detail/${id}`),
        });
    } catch (error) {
      setFailedAlert({
        message: 'Failed mapping to AM',
      });
    }
  };

  const handleSubmitInvalid = (id) => {
    const _data = {
      email: data?.contactPerson.email,
      status: 'invalid',
      company: {
        custAccntName: data?.companyDetail?.companyName,
        custAccntNum: '',
        preAccount: selectedPreAccount,
      },
    };
    fetchSubmit(_data, id);
  };

  const handleCancelChoose = () => {
    setIsChooseOption(false);
    setIsQuestion(true);
    if (data?.status === 'Valid') {
      setDisableBtnReassign(false);
      setIsQuestion(false);
    }
    if (
      data?.sendEmail?.statusEmail === null ||
      data?.sendEmail?.statusEmail === 'failed'
    ) {
      setShowQuestionRemapping(true);
    }
  };

  const handleAssignChoose = () => {
    setIsChooseOption(false);
    setFormValidation('form-sales-team');
  };

  const handleEmailChoose = () => {
    setIsChooseOption(false);
    setFormValidation('form-email');
  };

  const alertClose = () => {
    setAlert({
      content: '',
      success: true,
    });
  };

  const renderCallbackAlert = () => {
    return <CallbackAlert onClose={alertClose} {...alert} />;
  };

  const handleRefresh = () => {
    action.getInterestedDetail(id, callback);
    setPage(1);
    // fetchTabList(true);
  };

  const handleReassignAM = () => {
    setIsChooseOption(true);
    setDisableBtnReassign(true);
  };

  const renderChooseOptionForMapping = () => {
    return (
      <div className={classes.question}>
        <div style={{ margin: '0 5px' }}>
          <Text
            className={classes.caption}
            color="mainDark"
            variant="h4"
            weight="medium"
          >
            Choose option for mapping this customer
          </Text>
        </div>
        <div
          className={classes.option}
          id="btnAssign"
          onClick={handleAssignChoose}
        >
          <Text
            style={{ lineHeight: '19px' }}
            variant="subtitle1"
            weight="bold"
          >
            Assigning Account Manager
          </Text>
        </div>
        <div
          className={classes.option}
          id="btnEmail"
          onClick={handleEmailChoose}
        >
          <div style={{ display: 'block', textAlign: 'left' }}>
            <Text
              style={{ display: 'block', lineHeight: '19px' }}
              variant="subtitle1"
              weight="bold"
            >
              Assigning to other recipient
            </Text>
            <Text color="grey" variant="status" weight="regular">
              Via email and WhatsApp number
            </Text>
          </div>
        </div>
        <Button
          id="btnCancel"
          onClick={handleCancelChoose}
          style={{ margin: 'auto' }}
          variant="ghost"
        >
          CANCEL
        </Button>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data;
    if (formValidation === 'form-sales-team') {
      const amProfile = [...salesAssigned];
      data = {
        amMapping: amProfile,
        status: 'valid',
        validBy: 'amMapping',
        company: {
          custAccntName: selectedCompanyName,
          custAccntNum: selectedCompanyNum,
          preAccount: selectedPreAccount,
        },
      };
    } else {
      data = {
        email: emailAssigned,
        phoneNumber: numberAssigned,
        fullName: nameAssigned,
        status: 'valid',
        validBy: 'sendEmail',
        company: {
          custAccntName: selectedCompanyName,
          custAccntNum: selectedCompanyNum,
          preAccount: selectedPreAccount,
        },
      };
    }

    fetchSubmit(data, id);
  };

  const btnRefresh = data?.isNetworkConnectivity &&
    ScIntegrationStatus &&
    (activationStatus === 'Qualify' ||
      activationStatus === 'Convert' ||
      activationStatus === 'Create_Opportunity' ||
      activationStatus === 'Auto_Quote') && (
      <Button
        id="btnRefresh"
        leftIcon={Reload}
        loading={isLoading}
        onClick={handleRefresh}
        style={{ marginRight: '1em' }}
      >
        {' '}
        Refresh{' '}
      </Button>
    );

  const btnReassign = activationStatus === 'Valid' &&
    isShowBtnReassign &&
    isHaveAccess(props.feature, 'update_reassignAM') &&
    !data?.isNetworkConnectivity &&
    !formValidation &&
    !showQuestionRemapping && (
      <Button disabled={disableBtnReassign} onClick={handleReassignAM}>
        Reassign AM
      </Button>
    );

  const btnSubmit = (
    <>
      <Button
        onClick={handleCancelForm}
        style={{ marginRight: '2em' }}
        variant="ghost"
      >
        CANCEL
      </Button>
      <Button
        disabled={validateBtnSubmit || !selectedCompanyName}
        onClick={handleSubmit}
        type="submit"
      >
        {loading ? (
          <CircularProgress
            size={17}
            style={{ marginTop: 5, color: '#FFFFFF' }}
            thickness={3}
          />
        ) : (
          'SUBMIT'
        )}
      </Button>
    </>
  );

  const handleRemappingCustomer = () => {
    setShowQuestionRemapping(false);
    setIsChooseOption(true);
  };

  return (
    <>
      {loading && loadingScIntegrationStatus ? (
        <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
          <CircularProgress style={{ color: '#DE1B1B' }} />
        </div>
      ) : (
        <>
          <div className={classes.header}>
            <div style={{ display: 'flex' }}>
              <Breadcrumb data={breadcrumb()} />
              <Status
                className={classes.dropdown}
                label={status(activationStatus).label}
                variant={status(activationStatus).variant}
              />
            </div>
            <div style={{ display: 'flex' }}>
              {btnRefresh}
              {btnReassign}
              {formValidation && btnSubmit}
            </div>
          </div>
          <Divider />
          <Grid container spacing={4} style={{ flexGrow: 1 }}>
            {formValidation ? (
              <FormValidation
                classes={classes}
                data={data}
                formValidation={formValidation}
                isNetworkConnectivity={data?.isNetworkConnectivity}
                loading={loading}
                salesAssigned={(v) => setSalesAssigned(v)}
                ScIntegrationStatus={ScIntegrationStatus}
                selectedCompanyName={selectedCompanyName}
                selectedCompanyNum={selectedCompanyNum}
                setDisableBtnSubmitEmail={(v) => setDisableBtnSubmitEmail(v)}
                setEmailAssigned={(v) => setEmailAssigned(v)}
                setNameAssigned={(v) => setNameAssigned(v)}
                setNumberAssigned={(v) => setNumberAssigned(v)}
                setSelectedCompanyName={(v) => setSelectedCompanyName(v)}
                setSelectedCompanyNum={(v) => setSelectedCompanyNum(v)}
                setSelectedPreAccount={(v) => setSelectedPreAccount(v)}
              />
            ) : (
              <>
                <Grid item sm={6} xs={12}>
                  {/* List Interested Detail */}
                  <ListDetail
                    data={interestedListDetail}
                    loading={loading}
                    ScIntegrationStatus={ScIntegrationStatus}
                    statusEmailMailgun={statusEmailMailgun}
                    statusWaMailgun={statusWaMailgun}
                    tab={{ activeTab, setActiveTab }}
                    tabList={{
                      dataList: tabList,
                      loadingTabList,
                      onBottomPage,
                    }}
                  />

                  {/* List AM Assigned */}
                  {/* {activationStatus === 'Valid' && */}
                  <ListAMAssigned
                    assignedBy={assignedBy}
                    data={data}
                    hasStatusEmailAndWA={hasStatusEmailAndWA}
                    isDoneGetStatusWaAndEmailMailgun={
                      isDoneGetStatusWaAndEmailMailgun
                    }
                    newDataAm={newDataAm}
                    statusEmailMailgun={statusEmailMailgun}
                    statusWaMailgun={statusWaMailgun}
                  />
                  {/* } */}
                </Grid>
                <Grid item sm={6} xs={12}>
                  {/* Question assign */}
                  {activationStatus === 'Waiting' &&
                    isQuestion &&
                    isHaveAccess(props.feature, 'update_assignAM') && (
                      <div className={classes.question}>
                        <Text variant="h4" weight="medium">
                          Is this interest was valid?
                        </Text>
                        <div className={classes.questionBtn}>
                          <Button
                            id="btnInvalid"
                            onClick={handleInvalid}
                            style={{ marginRight: '2em' }}
                            variant="ghost"
                          >
                            No
                          </Button>
                          <Button id="btnValid" onClick={handleYesClick}>
                            Yes
                          </Button>
                        </div>
                      </div>
                    )}

                  {/* Question invalid */}
                  {isConfirmInvalid && (
                    <div className={classes.question}>
                      <Text
                        className={classes.caption}
                        variant="h4"
                        weight="medium"
                      >
                        Are you sure this interest wasn{`'`}t valid?
                      </Text>
                      <Text color="grey" variant="subtitle2" weight="regular">
                        Once you click Yes, this status will changed to Invalid
                      </Text>
                      <div className={classes.questionBtn}>
                        <Button
                          id="btnNoInvalid"
                          onClick={handleBackConfirmInvalid}
                          style={{ marginRight: '2em' }}
                          variant="ghost"
                        >
                          No
                        </Button>
                        <Button
                          id="btnYesInvalid"
                          onClick={() => handleSubmitInvalid(id)}
                        >
                          Yes
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Question Remapping */}
                  {showQuestionRemapping && (
                    <div className={classes.question}>
                      <Text variant="h4" weight="medium">
                        Status sent email was failed. <br /> Want to remapping
                        this customer?
                      </Text>
                      <div className={classes.questionBtn}>
                        <Button
                          id="nobutton"
                          onClick={() => setShowQuestionRemapping(false)}
                          style={{ marginRight: '2em' }}
                          variant="ghost"
                        >
                          No
                        </Button>
                        <Button
                          id="yesbutton"
                          onClick={handleRemappingCustomer}
                        >
                          Yes
                        </Button>
                      </div>
                    </div>
                  )}

                  {isChooseOption && renderChooseOptionForMapping()}

                  {/* Worklog Section */}
                  {data?.worklog && (
                    <Worklog
                      // data={testWorklog}
                      data={data?.worklog}
                      status={activationStatus}
                      stepperProps={{
                        activeStyle:
                          activationStatus === 'Delayed_Convert'
                            ? 'yellow'
                            : 'default',
                        steps:
                          data?.isNetworkConnectivity && ScIntegrationStatus
                            ? steps(activationStatus, isRetireWithoutQualify)
                            : stepsNonConnect(activationStatus),
                        activeStep:
                          data?.isNetworkConnectivity && ScIntegrationStatus
                            ? stepChoice(
                                activationStatus,
                                isRetireWithoutQualify,
                              )
                            : stepChoiceNonConnect(activationStatus),
                      }}
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
      {renderCallbackAlert()}
    </>
  );
}

Component.defaultProps = {
  action: {},
  classes: {},
  initChooseOption: false,
  initConfirmInvalid: false,
  initLoading: true,
  initScIntegrationStatus: false,
  interestedListDetail: {},
  isLoading: false,
};

Component.propTypes = {
  action: PropTypes.object,
  classes: PropTypes.object,
  feature: PropTypes.array.isRequired,
  initChooseOption: PropTypes.bool,
  initConfirmInvalid: PropTypes.bool,
  initLoading: PropTypes.bool,
  initScIntegrationStatus: PropTypes.bool,
  interestedListDetail: PropTypes.object,
  isLoading: PropTypes.bool,
};
