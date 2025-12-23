import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FileUpload } from '@components/FormField';
import { Grid } from '@material-ui/core';
import CheckOk from '@assets/Svg/CheckOk';
import Download from '@assets/Svg/Download';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Divider from '@__old/components/elements/Divider';
import FileAttachment from '@__old/components/elements/FileAttachment';
import Dialog from '@__old/components/elements/Dialog';

import useActions from './hooks/useActions';

const Component = (props) => {
  const { classes } = props;

  const {
    onClose,
    control,
    handleSubmit,
    data,
    buttonDisable,
    filterSchema,
    handleSave,
    troubleFields,
    modalApproveIssue,
  } = useActions(props);

  const renderAttachment = () => {
    return (
      (data?.category === 'LBA' || data?.category === 'LBA Targeted') &&
      data.troubleOccurs.map((t) => {
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
              <TextField
                control={control}
                disabled
                fullWidth
                label="Timestamp"
                name="timestamp"
              />
            </Grid>
          </>
        );
      })
    );
  };

  const renderMsisdn = () => {
    if (data?.troubleOccurs?.length > 0 && !data?.troubleOccursFile) {
      return (
        (data?.category === 'Premium' || data?.category === 'Reguler') &&
        troubleFields.map((item, i) => {
          return (
            <Grid item key={item.id} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className={classes.circleNumber}>
                    <Typography color="white" variant="body1">
                      {i + 1}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={10}>
                  <Grid container>
                    {filterSchema(data?.operatorTypeName)?.map((s, key) => {
                      if (s.name === 'logSMSC') {
                        return (
                          <Grid
                            item
                            key={`schema-${key}`}
                            style={{ marginBottom: '1rem' }}
                            xs={12}
                          >
                            <TextField
                              control={control}
                              fullWidth
                              label={s.name}
                              name={`trouble.${i}.${s.name}`}
                            />
                          </Grid>
                        );
                      }
                      return (
                        <Grid
                          item
                          key={`schema-${key}`}
                          style={{ marginBottom: '1rem' }}
                          xs={12}
                        >
                          <TextField
                            control={control}
                            disabled
                            fullWidth
                            label={s.name}
                            name={`trouble.${i}.${s.name}`}
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
    if (typeof data?.troubleOccursFile === 'object') {
      if (Object.keys(data?.troubleOccursFile).length > 0) {
        return (
          <Grid item xs={12}>
            {data?.operatorTypeName === 'Telkomsel' ? (
              <Grid item xs={12}>
                <FileAttachment
                  fileName={data?.troubleOccursFile?.fileNameAlias}
                  url={`https://${data?.troubleOccursFile?.fileName}`}
                />
              </Grid>
            ) : (
              <>
                <FileUpload
                  accept={['.xlsx']}
                  control={control}
                  helperText="Upload .xlsx document, max 1 MB "
                  maxSize={1048576}
                  name="troubleFile"
                  placeholder="Example: document.xlsx"
                />
              </>
            )}
          </Grid>
        );
      }
    }
  };

  const renderDownloadBulk = () => {
    if (typeof data?.troubleOccursFile === 'object') {
      if (
        Object.keys(data?.troubleOccursFile).length > 0 &&
        data?.operatorTypeName !== 'Telkomsel'
      ) {
        return (
          <>
            <Grid align="center" item xs={12}>
              <Typography variant="h5" weight="medium">
                Please download this file and complete it
              </Typography>
            </Grid>
            <Grid align="center" item xs={12}>
              <Typography variant="caption">
                Please add logSMSC column on BULK-FILE.xls
              </Typography>
            </Grid>
            <Grid align="center" item xs={12}>
              <Button
                onClick={() =>
                  window.open(
                    `https://${data?.troubleOccursFile.fileName}`,
                    '_blank',
                  )
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

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={modalApproveIssue}>
      <form onSubmit={handleSubmit(handleSave)}>
        <Grid container spacing={2} style={{ padding: '24px 24px' }}>
          {renderDownloadBulk()}
          <Grid align="center" item xs={12}>
            <Typography variant="h5" weight="medium">
              Please filled the data <br />
              to be sent to operator
            </Typography>
            <br />
            <Typography variant="caption" weight="normal">
              {data?.troubleOccursFile &&
              Object.keys(data?.troubleOccursFile).length > 0
                ? 'Once you send this data, it will be processed by provider'
                : 'Data will be sent according the date of issue that has been requested by customer'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              disabled
              fullWidth
              label="Service Category"
              name="category"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              control={control}
              disabled
              fullWidth
              label="Date of issue"
              name="date"
            />
          </Grid>
          {data?.category !== 'Link Connectivity' && (
            <Grid item xs={12}>
              <TextField
                control={control}
                disabled
                fullWidth
                label="Sender ID"
                name="senderID"
              />
            </Grid>
          )}
          {renderAttachment()}
          {renderMsisdn()}
          {data?.category === 'Link Connectivity' && (
            <Grid item xs={12}>
              <TextField
                control={control}
                disabled
                fullWidth
                label="IP Customer"
                name="ipCustomer"
              />
            </Grid>
          )}
          {renderUploadBulk()}
          <Grid
            align="center"
            item
            style={{ display: 'flex', justifyContent: 'center' }}
            xs={12}
          >
            <Button
              onClick={onClose}
              style={{ marginRight: '8px' }}
              variant="ghost"
            >
              CANCEL
            </Button>
            &nbsp;
            <Button disabled={buttonDisable} id="buttonApprove" type="submit">
              SUBMIT
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export default Component;

Component.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};
Component.defaultProps = {
  classes: {},
  data: {
    operatorTypeName: '',
    troubleOccursFile: {},
    troubleOccurs: [],
    senderTypeName: '',
    troubleOccursLink: { ipCustomer: '', logPingTrace: '' },
    createdAt: '',
    category: '',
  },
};
