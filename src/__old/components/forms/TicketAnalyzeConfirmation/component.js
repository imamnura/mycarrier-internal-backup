import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextField from '../../elements/TextField';
import { Grid } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';
import CheckOk from '../../../../assets/Svg/CheckOk';
import Divider from '../../elements/Divider';
import Download from '../../../../assets/Svg/Download';
import UploadFile from '../../elements/UploadFile';
import FileAttachment from '../../elements/FileAttachment';
import moment from 'moment';
import { GetValues } from './utils';

const schema = [
  { name: 'bNumber', label: 'MSISDN' },
  { name: 'dateTime', label: 'Timestamp' },
  { name: 'logRequest', label: 'Log Request' },
  { name: 'respond', label: 'Log Respond' },
  { name: 'logSMSC', label: 'Log SMS C' },
];

const Component = (props) => {
  const {
    classes,
    invalid,
    isLoading,
    onClose,
    submitting,
    handleSubmit,
    detailServiceAssurance,
  } = props;
  const [trouble, setTrouble] = useState([]);
  const [smsCValidation, setSmsCValidation] = useState(true);
  const buttonDisable =
    invalid || submitting || smsCValidation || !trouble || isLoading;

  const { category, troubleOccursFile } = detailServiceAssurance;

  useEffect(() => {
    const { troubleOccursFile, operatorTypeName, troubleOccurs } =
      detailServiceAssurance;
    if (!operatorTypeName) {
      setSmsCValidation(false);
    }

    if (
      category === 'Link Connectivity' ||
      category === 'LBA' ||
      category === 'LBA Targeted' ||
      category === 'Reguler' ||
      category === 'Premium'
    ) {
      setSmsCValidation(false);
    }

    if (operatorTypeName !== 'Telkomsel' && category !== 'Link Connectivity') {
      if (GetValues(trouble, 'logSMSC').length === troubleOccurs?.length) {
        setSmsCValidation(false);
      } else {
        setSmsCValidation(true);
      }
    }

    if (typeof troubleOccursFile === 'object') {
      if (
        Object.keys(troubleOccursFile).length > 0 &&
        operatorTypeName !== 'Telkomsel'
      ) {
        setTrouble(null);
      }
      setSmsCValidation(false);
    }
  }, [trouble]);

  const renderAttachment = () => {
    const { category } = detailServiceAssurance;
    return (
      (category === 'LBA' || category === 'LBA Targeted') &&
      detailServiceAssurance.troubleOccurs.map((t) => {
        return (
          <>
            {t.file.map((f, key) => (
              <Grid item key={key} xs={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#FAF0F0',
                    padding: '.5rem',
                    borderRadius: '4px',
                  }}
                >
                  <div>{f.fileName}</div>
                  <CheckOk />
                </div>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Field
                component={TextField}
                disabled
                fullWidth={true}
                label="Timestamp"
                name="timestamp"
                type="text"
              />
            </Grid>
          </>
        );
      })
    );
  };

  const filterSchema = (provider) => {
    if (provider === 'Telkomsel') {
      return schema.slice(0, -1);
    } else {
      return schema;
    }
  };

  const replacer = (page, index, block) => {
    let data = [...page];
    data[index] = block;
    return data;
  };

  const handleChangeMSISDN = (index, bNumber, event, name) => {
    const { troubleOccurs } = detailServiceAssurance;
    let _trouble = troubleOccurs;
    // const index = _trouble.findIndex(item => item.bNumber === bNumber);
    const find = _trouble.find((item) => item.bNumber === bNumber);
    setTrouble(
      replacer(trouble, index, {
        ...find,
        [name]: event.target.value,
      }),
    );
  };

  const renderMsisdn = () => {
    const { category, troubleOccurs, operatorTypeName, troubleOccursFile } =
      detailServiceAssurance;
    if (troubleOccurs?.length > 0 && !troubleOccursFile) {
      return (
        (category === 'Premium' || category === 'Reguler') &&
        troubleOccurs.map((item, i) => {
          return (
            <Grid item key={i} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className={classes.circleNumber}>
                    <Text color="white" variant="body1">
                      {i + 1}
                    </Text>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    {filterSchema(operatorTypeName)?.map((s, key) => {
                      return (
                        <Grid
                          item
                          key={key}
                          style={{ marginBottom: '1rem' }}
                          xs={12}
                        >
                          <TextField
                            defaultValue={
                              s.name === 'dateTime'
                                ? moment(item[s.name]).format(
                                    'DD/MM/YYYY HH:mm:ss',
                                  )
                                : item[s.name]
                            }
                            disabled={s.name === 'logSMSC' ? false : true}
                            label={s.label}
                            multiline={
                              s.name === 'logRequest' || s.name === 'logSMSC'
                            }
                            onChange={(e) =>
                              handleChangeMSISDN(i, item.bNumber, e, s.name)
                            }
                            rows={s.name === 'logRequest' ? 6 : 1}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })
      );
    }
  };

  const renderUploadBulk = () => {
    const { troubleOccursFile, operatorTypeName } = detailServiceAssurance;

    if (typeof troubleOccursFile === 'object') {
      if (Object.keys(troubleOccursFile).length > 0) {
        return (
          <Grid item xs={12}>
            {operatorTypeName === 'Telkomsel' ? (
              <Grid item xs={12}>
                <FileAttachment
                  fileName={troubleOccursFile?.fileNameAlias}
                  url={`https://${troubleOccursFile?.fileName}`}
                />
              </Grid>
            ) : (
              <UploadFile
                accept={['.xlsx']}
                fileName={trouble ? trouble.name : null}
                maxSize={1048576}
                name="file"
                onChange={setTrouble}
              />
            )}
          </Grid>
        );
      }
    }
  };

  const renderDownloadBulk = () => {
    const { troubleOccursFile, operatorTypeName } = detailServiceAssurance;

    if (typeof troubleOccursFile === 'object') {
      if (
        Object.keys(troubleOccursFile).length > 0 &&
        operatorTypeName !== 'Telkomsel'
      ) {
        return (
          <>
            <Grid align="center" item xs={12}>
              <Text className={classes.bold} variant="h5">
                Please download this file and complete it
              </Text>
            </Grid>
            <Grid align="center" item xs={12}>
              <Text variant="caption">
                Please add logSMSC column on BULK-FILE.xls
              </Text>
            </Grid>
            <Grid align="center" item xs={12}>
              <Button
                onClick={() =>
                  window.open(`https://${troubleOccursFile.fileName}`, '_blank')
                }
                size="medium"
              >
                <Download />
                &nbsp;&nbsp; Bulk-file.xls
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        );
      }
    }
  };

  const handleSave = (values) => {
    props.onSubmit({
      ...values,
      trouble,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Grid container spacing={2} style={{ padding: '24px 24px' }}>
        {renderDownloadBulk()}
        <Grid align="center" item xs={12}>
          <Text className={classes.bold} variant="h5">
            Please filled the data <br />
            to be sent to operator
          </Text>
          <br />
          <Text variant="caption">
            {troubleOccursFile && Object.keys(troubleOccursFile).length > 0
              ? 'Once you send this data, it will be processed by provider'
              : 'Data will be sent according the date of issue that has been requested by customer'}
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            disabled
            fullWidth={true}
            label="Service Category"
            name="category"
            type="text"
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            component={TextField}
            disabled
            fullWidth={true}
            label="Date of issue"
            name="date"
            type="text"
          />
        </Grid>
        {category !== 'Link Connectivity' && (
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="Sender ID"
              name="senderID"
              type="text"
            />
          </Grid>
        )}
        {renderAttachment()}
        {renderMsisdn()}
        {category === 'Link Connectivity' && (
          <Grid item xs={12}>
            <Field
              component={TextField}
              disabled
              fullWidth={true}
              label="IP Customer"
              name="ipCustomer"
              type="text"
            />
          </Grid>
        )}
        {renderUploadBulk()}
        <Grid align="center" item xs={12}>
          <Button onClick={onClose} variant="ghost">
            CANCEL
          </Button>
          &nbsp;
          <Button disabled={buttonDisable} id="buttonApprove" type="submit">
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Component;

Component.propTypes = {
  classes: PropTypes.object,
  detailServiceAssurance: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.object,
  submitting: PropTypes.bool,
};
Component.defaultProps = {
  classes: {},
  detailServiceAssurance: {},
  invalid: true,
  isLoading: false,
  onSubmit: {},
  submitting: false,
};
