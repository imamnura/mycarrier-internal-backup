import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray } from 'redux-form';
import TextField from '@__old/components/elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import RadioGroup from '@__old/components/elements/RadioGroup';
import { AddCircle } from '@material-ui/icons';
import { uniqueMail, formatPhoneNumber, uniquePhone } from './utils';
import Card from '@components/Card/Card';

const Approval = (p) => {
  const isTypeValid = p.type;
  const maxLength = p.fields.length < 5;
  const minLength = p.title === 'Telkom Reviewer' ? 2 : 1;

  return (
    <Grid alignItems="center" container spacing={2}>
      <Grid item xs={12}>
        {p.fields.map((item, i) => (
          <Grid alignItems="center" container key={`aprvl-${i}`} spacing={2}>
            <Grid item xs={12}>
              <div className={p.classes.removeButton}>
                {isTypeValid && p.fields.length > minLength && (
                  <>
                    <div />
                    <span onClick={() => p.fields.remove(i)}>
                      <AddCircle style={{ transform: 'rotate(45deg)' }} />
                      <Text color="primary" variant="button">
                        DELETE REVIEWER
                      </Text>
                    </span>
                  </>
                )}
              </div>
            </Grid>
            <Grid item style={{ paddingTop: 24 }} xs={3}>
              <Text color="grey" variant="subtitle1" weight="medium">
                {p.title} {i + 1}{' '}
                {p.fields.length === i + 2 ? '(mengetahui)' : ''}{' '}
                {p.fields.length === i + 1 ? '(menyetujui)' : ''}
              </Text>
            </Grid>
            <Grid item xs={7}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    disabled={!isTypeValid}
                    label="Name"
                    name={`${item}.name`}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    disabled={!isTypeValid}
                    label="Phone Number"
                    name={`${item}.phoneNumber`}
                    validate={[uniquePhone, formatPhoneNumber]}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    disabled={!isTypeValid}
                    label="Title"
                    name={`${item}.position`}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Field
                    component={TextField}
                    disabled={!isTypeValid}
                    label="Email"
                    name={`${item}.email`}
                    validate={uniqueMail}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item style={{ paddingTop: 8 }} xs={12}>
        <div className={p.classes.insertButton}>
          {maxLength && isTypeValid && (
            <>
              <div />
              <span onClick={() => p.fields.push({ phoneNumber: '+62' })}>
                <AddCircle />
                <Text color="green" variant="button">
                  ADD REVIEWER
                </Text>
              </span>
            </>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default function Component(props) {
  const {
    handleSubmit,
    invalid,
    submitting,
    classes,
    approvalType,
    approvalHasValue,
    asyncValidating,
  } = props;

  useEffect(() => {
    props.disableButton(invalid || submitting || asyncValidating);
    props.loadingButton(submitting || asyncValidating);
  }, [invalid, submitting, asyncValidating]);

  useEffect(() => {
    if (approvalType && !approvalHasValue) {
      props.change('telkomApproval', [
        { phoneNumber: '+62' },
        { phoneNumber: '+62' },
      ]);
    }
  }, [approvalType]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          <Card title="Signature Type">
            <Field
              component={RadioGroup}
              direction="horizontal"
              name="approvalType"
              options={[
                {
                  value: 'digital',
                  label: (
                    <div className={classes.customLabelRadio}>
                      <Text variant="subtitle1" weight="medium">
                        Digital Signature
                      </Text>
                      <Text color="grey" variant="body2">
                        Recipient will sign the document based on digital
                        signature
                      </Text>
                    </div>
                  ),
                },
                {
                  value: 'manual',
                  label: (
                    <div className={classes.customLabelRadio}>
                      <Text variant="subtitle1" weight="medium">
                        Manual Signature
                      </Text>
                      <Text color="grey" variant="body2">
                        Recipient will sign the document freely based on manual
                        signature
                      </Text>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Telkom Approval">
            <FieldArray
              classes={classes}
              component={Approval}
              disabled
              name="telkomApproval"
              title="Telkom Reviewer"
              type={approvalType}
            />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card title="Telkom Approval">
            <FieldArray
              classes={classes}
              component={Approval}
              name="customerApproval"
              title="Customer Reviewer"
              type={approvalType}
            />
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

Component.defaultProps = {
  approvalType: '',
};

Component.propTypes = {
  approvalHasValue: PropTypes.bool.isRequired,
  approvalType: PropTypes.string,
  asyncValidating: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disableButton: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  loadingButton: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
