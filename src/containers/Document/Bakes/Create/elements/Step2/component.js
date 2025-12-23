import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextEditor from '@__old/components/elements/TextEditor';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import Dropdown from '@__old/components/elements/Dropdown';
import { AddCircle } from '@material-ui/icons';
import TextField from '@__old/components/elements/TextField';
import { normalizeRupiah } from '@utils/text';
import UploadFile from '@__old/components/elements/UploadFile';
import Card from '@components/Card/Card';

export default function Component(props) {
  const { handleSubmit, invalid, submitting, data, classes } = props;

  const [serviceOptions, setServiceOptions] = useState([]);
  const [reqsbr, setReqsbr] = useState(null);
  const [sbr, setSbr] = useState(null);
  const [otherdoc, setOtherdoc] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    props.getServiceOption(setServiceOptions);
    data?.hjmPercentage
      ? setPercentage(data.hjmPercentage)
      : setPercentage(100);
  }, []);

  const checked = () => {
    if (percentage === '' || percentage === null || percentage > 200) {
      setIsChecked(false);
      setCount('');
    } else if (percentage < 100) {
      let temp1 =
        reqsbr || (data.reqSbr ? Object.keys(data.reqSbr).length !== 0 : false);
      let temp2 =
        sbr || (data.sbr ? Object.keys(data.sbr).length !== 0 : false);
      if (temp1 && temp2) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
      setCount('Dibawah HJM');
    } else if (parseInt(percentage) === 100) {
      setIsChecked(true);
      setCount('Sama dengan HJM');
    } else if (percentage > 100) {
      setIsChecked(true);
      setCount('Diatas HJM');
    }
  };

  useEffect(() => {
    checked();
    props.disableButton(
      invalid ||
        submitting ||
        !data.products.length ||
        isChecked === false ||
        uploading,
    );
    props.loadingButton(submitting || uploading);
  }, [
    invalid,
    submitting,
    data.products,
    isChecked,
    percentage,
    setPercentage,
    reqsbr,
    sbr,
    uploading,
  ]);

  const strongText = (str) => (
    <Text color="mainDark" variant="medium">
      {str}
    </Text>
  );

  const handleChangeService = ({ data: prod }) => {
    let temp = [...data.products];

    if (!temp.some((i) => i.productId === prod.productId))
      props.change('products', [...temp, prod]);
  };

  const handleChangeUploadDoc = async (type, file, typeField) => {
    let formData = new FormData();
    formData.append('bakesId', data.bakesId);
    formData.append('type', type);

    if (data['typeField']) {
      formData.append('fileUrl', data['typeField'].fileUrl);
      await props.removeServiceDoc(formData, typeField);
    }

    formData.delete('fileUrl');
    formData.append('file', file);
    props.uploadServiceDoc(formData, typeField, setUploading);
  };

  const required = (label) => {
    return (
      <>
        <Text color="primary" variant="subtitle2">
          *{' '}
        </Text>
        {label}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Text color="grey" variant="body1">
              Para Pihak dalam kedudukannya sebagaimana tersebut di atas
              menyepakati penggunaan layanan {strongText(data.telkomAlias)}{' '}
              dengan ketentuan dan syarat-syarat sebagai berikut:
            </Text>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: 'flex' }}>
              <Text color="mainDark" variant="h5" weight="bold">
                A.{' '}
              </Text>
              <div style={{ paddingLeft: 16 }}>
                <Text color="mainDark" variant="h5" weight="bold">
                  Rincian Layanan
                </Text>
                <br />
                <Text color="grey" variant="body1">
                  {strongText(data.telkomAlias)} telah menyetujui dan
                  mengirimkan permohonan penggunaan layanan{' '}
                  {strongText(data.telkomAlias)}, oleh
                  {strongText(' ' + data.companyAlias)} dengan rincian sebagai
                  berikut:{' '}
                </Text>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.rootProducts} style={{ paddingLeft: 34 }}>
              <Text color="grey" variant="h4" weight="bold">
                Service
              </Text>
              <div className={classes.dropdownWrapper}>
                <Dropdown
                  id="addService"
                  isSearchable
                  onChange={handleChangeService}
                  options={serviceOptions}
                  placeholder="Add Service"
                  value={null}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {data.products.map(({ productName }, i) => (
              <div
                className={classes.rootProducts}
                key={i}
                style={{
                  padding: '8px 0px 8px 34px',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div className={classes.numberCircle}>
                    <Text className={classes.number} color="white" variant="h5">
                      {i + 1}
                    </Text>
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Text variant="h5" weight="bold">
                    {productName}
                  </Text>
                </div>
                <div
                  className={classes.rootProducts}
                  id="deleteService"
                  onClick={() => {
                    let temp = [...data.products];
                    temp.splice(i, 1);
                    props.change('products', temp);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <AddCircle className={classes.closeIcon} />
                  &nbsp;&nbsp;&nbsp;
                  <Text color="primary" variant="body2" weight="bold">
                    DELETE SERVICE
                  </Text>
                </div>
              </div>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            item
            spacing={5}
            style={{ marginTop: 12, paddingLeft: 42 }}
            xs={12}
          >
            <Grid item sm={6} xs={12}>
              <Text color="grey" variant="h4" weight="bold">
                Persentase HJM
              </Text>
              <br />
              <Text
                color="grey"
                style={{ fontStyle: 'italic' }}
                variant="body2"
              >
                Masukan persentase Harga Jangkauan Minimum
              </Text>
              <Grid
                className={classes.rootProducts}
                container
                direction="row"
                spacing={2}
              >
                <Grid item lg={6} xs={12}>
                  <Field
                    className={classes.formService}
                    component={TextField}
                    id="hjmPercentage"
                    label={required('Angka dalam %')}
                    name="hjmPercentage"
                    onChange={(e) => setPercentage(e.target.value)}
                    type="number"
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Text variant="caption">{count}</Text>
                </Grid>
              </Grid>
              <Text color="grey" variant="h4" weight="bold">
                Form
              </Text>
              <Field
                className={classes.formService}
                component={TextField}
                label="HJM (Masukan nominal HJM)"
                name="hjm"
                normalize={normalizeRupiah}
              />
              <Field
                className={classes.formService}
                component={TextField}
                label="Price (Masukan nominal total harga layanan)"
                name="price"
                normalize={normalizeRupiah}
              />
              <Field
                className={classes.formService}
                component={TextField}
                inputProps={{ maxLength: 601 }}
                label={required('Notes')}
                multiline
                name="notes"
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Text color="grey" variant="h4" weight="bold">
                Dokumen Pendukung
              </Text>
              <div className={classes.formServiceFile}>
                <Text color="grey" variant="body2">
                  {!isChecked
                    ? required('Upload Req SBR Document')
                    : 'Upload Req SBR Document'}
                </Text>
                <UploadFile
                  accept={['.pdf']}
                  fileName={reqsbr?.name || data.reqSbr?.fileName}
                  id="reqsbr"
                  label="reqsbr"
                  maxSize={5240000}
                  onChange={(file) => {
                    handleChangeUploadDoc('req-sbr', file, 'reqSbr');
                    setReqsbr(file);
                  }}
                />
              </div>
              <div className={classes.formServiceFile}>
                <Text color="grey" variant="body2">
                  {!isChecked
                    ? required('Upload SBR Document')
                    : 'Upload SBR Document'}
                </Text>
                <UploadFile
                  accept={['.pdf']}
                  fileName={sbr?.name || data.sbr?.fileName}
                  id="sbr"
                  label="sbr"
                  maxSize={5240000}
                  onChange={(file) => {
                    handleChangeUploadDoc('sbr', file, 'sbr');
                    setSbr(file);
                  }}
                />
              </div>
              <div className={classes.formServiceFile}>
                <Text color="grey" variant="body2">
                  Upload Dokumen Lain
                </Text>
                <UploadFile
                  accept={['.pdf']}
                  fileName={otherdoc?.name || data.otherDoc?.fileName}
                  id="otherdoc"
                  label="otherdoc"
                  maxSize={5240000}
                  onChange={(file) => {
                    handleChangeUploadDoc('other-doc', file, 'otherDoc');
                    setOtherdoc(file);
                  }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ paddingLeft: 34 }}>
              <Text color="grey" variant="h4" weight="bold">
                Value Agreement
              </Text>
              <br />
              <Text
                color="grey"
                style={{ fontStyle: 'italic' }}
                variant="body2"
              >
                Potential value that will be obtained.
              </Text>
              <Field
                className={classes.formService}
                component={TextField}
                label={required('Estimasi Value Agreement')}
                name="valueAgreement"
                normalize={normalizeRupiah}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Text color="grey" variant="h4" weight="bold">
              Rincian Spesifikasi Harga Layanan
            </Text>
            <br />
            <br />
            <Field
              component={TextEditor}
              name="serviceSpecification"
              type="evaluate"
            />
            <br />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}

Component.propTypes = {
  change: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  disableButton: PropTypes.func.isRequired,
  getServiceOption: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  loadingButton: PropTypes.func.isRequired,
  removeServiceDoc: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  uploadServiceDoc: PropTypes.func.isRequired,
};
