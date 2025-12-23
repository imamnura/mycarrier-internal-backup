import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '@__old/components/elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import Dropdown from '@__old/components/elements/Dropdown';
import MaskedInput from 'react-text-mask';
import Card from '@components/Card/Card';

// eslint-disable-next-line react/prop-types
const MaskedNPWP = ({ inputRef, ...other }) => (
  <MaskedInput
    {...other}
    guide={false}
    mask={[
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      '-',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
      '.',
      /[0-9]/,
      /[0-9]/,
      /[0-9]/,
    ]}
    ref={(ref) => {
      inputRef(ref ? ref.inputElement : null);
    }}
  />
);

export default function Component(props) {
  const {
    change,
    company,
    getCompanyList,
    getTelkomPIC,
    handleSubmit,
    invalid,
    isCompanyValid,
    submitting,
    telkomPic,
    // loadingButton,
  } = props;

  const [options, setOptions] = useState([]);
  const [optionsCustomer, setOptionsCustomer] = useState([]);

  const defaultCustomer = () => {
    if (!company?.name) return null;

    if (company?.custAccntNum) {
      return {
        custAccntNum: company.custAccntNum,
        label: company.name,
        value: company.name,
      };
    }

    return {
      custAccntNum: '',
      label: 'Add New Customer',
      value: 'Others',
    };
  };
  const [customerValue, setCustomerValue] = useState(defaultCustomer());

  useEffect(() => {
    getTelkomPIC(setOptions);
    getCompanyList(' ', setOptionsCustomer);
  }, []);

  useEffect(() => {
    props.disableButton(
      invalid || submitting || isCompanyValid || !telkomPic?.name,
    );
    props.loadingButton(submitting);
  }, [invalid, submitting]);

  useEffect(() => {
    const {
      unit = '',
      position = '',
      alias = '',
      nik = '',
      email = '',
    } = telkomPic || {};
    change('telkomPic.unit', unit);
    change('telkomPic.position', position);
    change('telkomPic.alias', alias);
    change('telkomPic.nik', nik);
    change('telkomPic.email', email);
  }, [telkomPic]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex' }}>
              <Text color="mainDark" variant="h5" weight="bold">
                1.{' '}
              </Text>
              <div style={{ paddingLeft: 16 }}>
                <Text color="mainDark" variant="h5" weight="bold">
                  PERUSAHAAN PERSEROAN (PERSERO) PT TELEKOMUNIKASI INDONESIA Tbk
                </Text>
                <br />
                <Text color="grey" variant="body1">
                  dalam Berita Acara Kesepakatan ini diwakili secara sah oleh:
                </Text>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={Dropdown}
              isLoading={props.dropdownLoad}
              isSearchable
              name="telkomPic.name"
              options={options}
              placeholder="Nama Perwakilan"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              disabled
              label="Unit"
              name="telkomPic.unit"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              disabled
              label="Jabatan"
              name="telkomPic.position"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              label="Selanjutnya disebut:"
              name="telkomPic.alias"
            />
          </Grid>
        </Grid>
      </Card>
      <Card style={{ marginTop: 24 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex' }}>
              <Text color="mainDark" variant="h5" weight="bold">
                2.{' '}
              </Text>
              <div style={{ paddingLeft: 16 }}>
                <Text color="mainDark" variant="h5" weight="bold">
                  PELANGGAN
                </Text>
                <br />
                <Text color="grey" variant="body1">
                  Identitas Perusahaan:
                </Text>
              </div>
            </div>
          </Grid>
          <Grid item md={4} xs={12}>
            <Dropdown
              isLoading={props.dropdownLoad}
              isSearchable
              onChange={(x) => {
                setCustomerValue(x);
                change('company.name', x.value !== 'Others' ? x.value : '');
                change(
                  'company.custAccntNum',
                  x.value !== 'Others' ? x.custAccntNum : '',
                );
              }}
              options={optionsCustomer}
              placeholder="Nama Perusahaan"
              value={customerValue}
            />
            {customerValue?.value === 'Others' && (
              <Field
                component={TextField}
                label="Nama Perusahaan"
                name="company.name"
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <br />
            <Text color="grey" variant="body1">
              dalam Berita Acara Kesepakatan ini diwakili secara sah oleh:
            </Text>
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              label="Nama"
              name="company.contactName"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              InputProps={{ inputComponent: MaskedNPWP }}
              label="NPWP"
              name="company.npwp"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              label="Jabatan"
              name="company.contactPosition"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Field
              component={TextField}
              label="Selanjutnya disebut:"
              name="company.alias"
            />
          </Grid>
          <Grid item xs={12}>
            <br />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}

Component.defaultProps = {
  telkomPic: null,
};

Component.propTypes = {
  change: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  disableButton: PropTypes.func.isRequired,
  dropdownLoad: PropTypes.bool.isRequired,
  getCompanyList: PropTypes.func.isRequired,
  getTelkomPIC: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isCompanyValid: PropTypes.bool.isRequired,
  loadingButton: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  telkomPic: PropTypes.object,
};
