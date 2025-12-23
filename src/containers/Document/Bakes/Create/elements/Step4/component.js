import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '@__old/components/elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import CheckboxGroup from '@__old/components/elements/CheckboxGroup';
// import RadioGroup from '@components/elements/RadioGroup';
import clsx from 'clsx';
import { normalizeOnlyNumber } from '@utils/text';
import { bankData } from './constants';
import { IMAGES } from '@__old/configs';
import Card from '@components/Card/Card';

export default function Component(props) {
  const {
    handleSubmit,
    invalid,
    submitting,
    // loadingButton,
    classes,
    data: { telkomAlias, companyAlias },
  } = props;

  const [customValue, setCustomValue] = useState('');

  useEffect(() => {
    props.disableButton(invalid || submitting);
    props.loadingButton(submitting);
  }, [invalid, submitting]);

  const strongText = (str) => (
    <Text color="mainDark" variant="medium">
      {str}
    </Text>
  );

  const sectionC = () => (
    <div className={classes.flex}>
      <Text color="mainDark" variant="h5" weight="bold">
        C.{' '}
      </Text>
      <div className={clsx(classes.leftSpace, classes.flexCol)}>
        <Text color="mainDark" variant="h5" weight="bold">
          Ketentuan Penagihan
        </Text>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            1.
          </Text>
          <div className={classes.leftSpace}>
            <Text color="grey" variant="body1">
              Metode penagihan adalah:{' '}
            </Text>
            <br />
            <Field
              component={CheckboxGroup}
              name="billingMethod"
              options={[
                { value: 'Prepaid', label: 'Prepaid' },
                { value: 'Postpaid', label: 'Postpaid' },
              ]}
            />
          </div>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            2.
          </Text>
          <div className={classes.leftSpace}>
            <Text color="grey" variant="body1">
              Pembayaran atas biaya layanan dilaksanakan oleh{' '}
              {strongText(companyAlias)} kepada {strongText(telkomAlias)}{' '}
              secara:{' '}
            </Text>
            <br />
            <Field
              component={CheckboxGroup}
              // direction="vertical"
              // isGrey
              name="termOfPayment"
              options={[
                {
                  value: 'One Time Charge (OTC)',
                  label: 'One Time Charge (OTC)',
                },
                { value: 'Bulanan', label: 'Bulanan' },
                { value: 'Triwulan', label: 'Triwulan' },
                { value: 'Per-Semester', label: 'Per-Semester' },
                { value: 'Tahunan', label: 'Tahunan' },
                {
                  value: customValue,
                  label: 'Lainnya',
                  withCustomField: true,
                  setValue: setCustomValue,
                },
              ]}
            />
          </div>
        </div>
        <div className={classes.flexCenter}>
          <Text color="grey" variant="body1">
            3.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Penagihan biaya Pasang Baru, bersamaan dengan tagihan biaya sewa
            bulanan bulan pertama.
          </Text>
        </div>
        <div className={classes.flexCenter}>
          <Text color="grey" variant="body1">
            4.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Penagihan biaya sewa bulanan penggunaan jasa multimedia dan
            komunikasi dilakukan sesuai bulan takwim.
          </Text>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            5.
          </Text>
          <Grid className={classes.leftSpace} container spacing={2}>
            <Grid item xs={12}>
              <Text color="grey" variant="body1">
                Tagihan {strongText(telkomAlias)} kepada{' '}
                {strongText(companyAlias)} dikirimkan kepada:
              </Text>
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                component={TextField}
                label="Nama"
                name="customerBilling.picName"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                component={TextField}
                label="Jabatan"
                name="customerBilling.position"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                component={TextField}
                label="Nama Perusahaan/Instansi"
                name="customerBilling.companyName"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                component={TextField}
                label="Alamat"
                name="customerBilling.address"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                component={TextField}
                label="Telepon"
                name="customerBilling.phoneNumber"
                normalize={normalizeOnlyNumber}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );

  const sectionD = () => (
    <div className={classes.flex}>
      <Text color="mainDark" variant="h5" weight="bold">
        D.{' '}
      </Text>
      <div className={clsx(classes.leftSpace, classes.flexCol)}>
        <Text color="mainDark" variant="h5" weight="bold">
          Ketentuan Pembayaran
        </Text>
        <div className={classes.flexCenter}>
          <Text color="grey" variant="body1">
            1.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            {strongText(companyAlias)} wajib melakukan pembayaran tagihan
            selambat{' '}
          </Text>
          <div style={{ padding: '0 8px' }}>
            <Field component={TextField} name="paymentDueDate" />
          </div>
          <Text color="grey" variant="body1">
            setelah tagihan diterima.
          </Text>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            2.
          </Text>
          <Grid className={classes.leftSpace} container spacing={2}>
            <Grid item xs={12}>
              <Text color="grey" variant="body1">
                Pembayaran tagihan dilaksanakan oleh {strongText(companyAlias)}{' '}
                kepada {strongText(telkomAlias)} dengan cara transfer ke
                rekening:
              </Text>
            </Grid>
            <Grid item style={{ display: 'flex' }} xs={12}>
              <div className={classes.customLabelRadio}>
                <img alt="" src={IMAGES.MANDIRI} />
                <Text color="mainDark" variant="subtitle1" weight="medium">
                  {bankData.mandiri.accountNumber}
                </Text>
                <Text className={classes.bankName} color="grey" variant="body2">
                  {bankData.mandiri.accountName}
                </Text>
                <Text color="grey" variant="body2">
                  {bankData.mandiri.bankAddress}
                </Text>
              </div>
              <div
                className={classes.customLabelRadio}
                style={{ marginLeft: 16 }}
              >
                <img alt="" src={IMAGES.BNI} />
                <Text color="mainDark" variant="subtitle1" weight="medium">
                  {bankData.bni.accountNumber}
                </Text>
                <Text className={classes.bankName} color="grey" variant="body2">
                  {bankData.bni.accountName}
                </Text>
                <Text color="grey" variant="body2">
                  {bankData.bni.bankAddress}
                </Text>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            3.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Biaya transfer atas pembayaran tagihan menjadi tanggung jawab{' '}
            {strongText(companyAlias)}.
          </Text>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            4.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Pembayaran diakui oleh {strongText(telkomAlias)} apabila telah
            tercatat di rekening {strongText(telkomAlias)}.
          </Text>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            5.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Apabila dari hasil pelaksanaan rekonsiliasi di antara Para Pihak
            ditemukan selisih tagihan yang disebabkan karena kelebihan atau
            kekurangan tagih dan/atau kekurangan atau kelebihan bayar, maka{' '}
            {strongText(companyAlias)} tagihan tersebut harus dituangkan dalam
            Berita Acara Rekonsiliasi.
          </Text>
        </div>
        <div className={classes.flex}>
          <Text color="grey" variant="body1">
            6.
          </Text>
          <Text className={classes.leftSpace} color="grey" variant="body1">
            Pembayaran kelebihan atau kekurangan tagihan oleh salah satu Pihak
            kepada Pihak lainnya berdasarkan Berita Acara Rekonsiliasi,
            dilaksanakan pada bulan berikutnya.
          </Text>
        </div>
      </div>
    </div>
  );

  const sectionE = () => (
    <div className={classes.flex}>
      <Text color="mainDark" variant="h5" weight="bold">
        E.{' '}
      </Text>
      <div
        className={clsx(classes.leftSpace, classes.flexCol)}
        style={{ width: '100%' }}
      >
        <Text color="mainDark" variant="h5" weight="bold">
          Ketentuan Keterlambatan Pembayaran
        </Text>
        <Field
          component={TextField}
          fullWidth
          label="Notes"
          multiline
          name="paymentDueNote"
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        {sectionC()}
        {sectionD()}
        {sectionE()}
        <br />
      </Card>
    </form>
  );
}

Component.propTypes = {
  change: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  disableButton: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  loadingButton: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
