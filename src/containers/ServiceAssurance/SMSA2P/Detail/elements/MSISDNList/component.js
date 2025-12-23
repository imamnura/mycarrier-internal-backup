import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import FileAttachment from '@__old/components/elements/FileAttachment';
import Typography from '@components/Typography';
import Information from '@components/Information';
import { dateFormat } from '@utils/parser';

export default function Component(props) {
  const { classes, data } = props;

  const renderList = () => {
    if (data.troubleOccurs?.length > 0 && !data.troubleOccursFile) {
      return (
        <div style={{ marginTop: '32px' }}>
          {data.troubleOccurs.map((item, i) => (
            <Grid container key={`msisdn-${i}`} style={{ margin: '32px 0' }}>
              <Grid item>
                <div className={classes.circleNumber}>
                  <Typography color="white" variant="h6">
                    {i + 1}
                  </Typography>
                </div>
              </Grid>
              <Grid className={classes.msisdnWrapper} item xs={11}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Information label="MSISDN" value={item.bNumber || '-'} />
                  </Grid>
                  <Grid item xs={6}>
                    <Information
                      label="TIMESTAMP"
                      value={
                        dateFormat({
                          date: item.dateTime,
                          type: 'date-time-full',
                          empty: '-',
                        }) || '-'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Information
                      label="LOG REQUEST"
                      value={item.logRequest || '-'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Information
                      label="LOG Respon"
                      value={item.respond || '-'}
                    />
                  </Grid>
                  {item.logSMSC && (
                    <Grid item xs={12}>
                      <Information
                        label="LOG SMS C"
                        value={item.logSMSC || '-'}
                      />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </div>
      );
    }
  };

  const renderFile = () => {
    const { troubleOccursFile } = data;

    if (typeof troubleOccursFile === 'object') {
      if (troubleOccursFile && Object.keys(troubleOccursFile).length > 0) {
        return (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FileAttachment
                fileName={troubleOccursFile?.fileNameAlias}
                url={`https://${troubleOccursFile?.fileName}`}
              />
            </Grid>
          </Grid>
        );
      }
    }
  };

  return (
    <>
      {renderList()}
      {renderFile()}
    </>
  );
}

Component.defaultProps = {
  data: {},
};

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  schema: PropTypes.object.isRequired,
};
