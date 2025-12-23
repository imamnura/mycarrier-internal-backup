import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Action from './elements/Action';
import { defaultAlert } from '../../../../constants/dialogDefaultValue';
import CallbackAlert from '../../../../__old/components/elements/CallbackAlert';
import {
  steps,
  stepChoice,
  breadcrumb,
  detailSchema,
  generateStatus,
  pickTitle,
} from './constant';
import DetailRequestSection from '../../../../__old/components/fragments/DetailRequestSection';
import { CircularProgress } from '@material-ui/core';
import Text from '../../../../__old/components/elements/Text';
import NoData from '../../../../assets/Svg/NoData';
import Evidence from './elements/Evidence';
import { isHaveAccess } from '../../../../__old/utils/common';
import { useRouter } from 'next/router';

export default function Component(props) {
  const [alert, setAlert] = useState({ content: '', success: true });
  const {
    query: { id },
  } = useRouter();

  const { actions, detailServiceAssuranceNeucloud, feature } = props;

  const { status, referenceId } = detailServiceAssuranceNeucloud;

  useEffect(() => {
    if (isHaveAccess(feature, 'read_detail_ticket_neucloud')) {
      actions.getDetailServiceAssuranceNeucloud(id);
    } else {
      setAlert({
        content: "You don't have permission to view details.",
        success: false,
      });
    }
    return () => {
      actions.cleanUp();
    };
  }, [id]);

  const closeAlert = () => setAlert(defaultAlert);

  const renderAction = (
    <Action
      actions={actions}
      data={detailServiceAssuranceNeucloud}
      feature={feature}
      setAlert={setAlert}
      step={stepChoice(status)}
    />
  );

  const renderAlert = <CallbackAlert onClose={closeAlert} {...alert} />;

  const additionalInformation = () => {
    return [<Evidence data={detailServiceAssuranceNeucloud} key="evidence" />];
  };

  const detailRequestSectionProps = {
    actionButton: renderAction,
    breadcrumb: breadcrumb(referenceId),
    data: detailServiceAssuranceNeucloud,
    schema: detailSchema(),
    status: {
      value: status,
      custom: generateStatus,
    },
    additionalInformation: additionalInformation(),
    stepperProps: {
      activeStep: stepChoice(status),
      steps: steps,
      stepperTitle: 'Fault Handling Step',
    },
    pickTitle: pickTitle,
  };

  if (!props.isLoading && !referenceId) {
    return (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '25vh' }}>
        <NoData />
        <br />
        <Text variant="h5">Data not found</Text>
        {renderAlert}
      </div>
    );
  }

  if (props.isLoading) {
    return (
      <div style={{ width: '100%', textAlign: 'center', paddingTop: '30vh' }}>
        <CircularProgress style={{ color: '#DE1B1B' }} />
      </div>
    );
  }

  return (
    <div>
      <DetailRequestSection {...detailRequestSectionProps} />
      {renderAlert}
    </div>
  );
}

Component.defaultProps = {
  detailServiceAssuranceNeucloud: {},
  isLoading: false,
};

Component.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  detailServiceAssuranceNeucloud: PropTypes.object,
  feature: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  match: PropTypes.object.isRequired,
};
