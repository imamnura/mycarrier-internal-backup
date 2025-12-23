import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { getValueObject } from '@utils/common';
import Information from '@components/Information';
import Attachment from '@components/Attachment';
import Button from '@components/Button';
import FileUpload from '@components/FileUpload';
import Switch from '@components/Switch/Switch';
import ImageAttachment from '@components/ImageAttachment';
import Typography from '@components/Typography';

const SectionAttachment = (props) => {
  const { schema, data } = props;

  return (
    <Grid container spacing={4}>
      {schema.map(
        ({
          name,
          label,
          action: _action,
          upload,
          hidePreviewDownload,
          attachmentProps,
          switch: _switch,
          imageType,
          desc,
          gridProps = { xs: 12 },
        }) => {
          const value = getValueObject({ name, data });
          const isHaveValue =
            (Array.isArray(value) && !!value.length) ||
            (!!value?.fileUrl && typeof value?.fileUrl === 'string');

          const { onClick, ...action } = _action || {};
          const {
            onChange,
            hidden: hiddenSwitch,
            ...switchProps
          } = _switch || {};

          if (upload && !isHaveValue) {
            return (
              <Grid item key={name} xs={12}>
                <Information
                  label={label}
                  value={
                    <Grid alignItems="center" container spacing={2}>
                      <Grid item xs>
                        <FileUpload {...upload} />
                      </Grid>
                      {_switch && !hiddenSwitch && (
                        <Grid item xs="auto">
                          <Switch onChange={onChange} {...switchProps} />
                        </Grid>
                      )}
                    </Grid>
                  }
                />
              </Grid>
            );
          }

          return (
            isHaveValue && (
              <Grid item key={name} {...gridProps}>
                <Information
                  label={label}
                  value={
                    <>
                      {Array.isArray(value) ? (
                        <>
                          {value.map(
                            (valueItem, i) =>
                              valueItem?.fileUrl && (
                                <Grid
                                  alignItems="center"
                                  container
                                  key={i}
                                  spacing={2}
                                >
                                  <Grid item xs>
                                    {imageType ? (
                                      <ImageAttachment
                                        {...valueItem}
                                        {...attachmentProps}
                                      />
                                    ) : (
                                      <Attachment
                                        {...valueItem}
                                        {...attachmentProps}
                                      />
                                    )}
                                  </Grid>
                                  {_action && (
                                    <Grid item xs="auto">
                                      <Button
                                        {...action}
                                        onClick={onClick(i)}
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                              ),
                          )}
                        </>
                      ) : (
                        <Grid alignItems="center" container spacing={2}>
                          <Grid item xs>
                            {imageType ? (
                              <ImageAttachment
                                {...value}
                                {...attachmentProps}
                                hidePreviewDownload={hidePreviewDownload}
                              />
                            ) : (
                              <Attachment
                                {...value}
                                {...attachmentProps}
                                hidePreviewDownload={hidePreviewDownload}
                              />
                            )}
                          </Grid>
                          {_action && (
                            <Grid item xs="auto">
                              <Button {...action} onClick={onClick(0)} />
                            </Grid>
                          )}
                          {_switch && !hiddenSwitch && (
                            <Grid item xs="auto">
                              <Switch onChange={onChange} {...switchProps} />
                            </Grid>
                          )}
                        </Grid>
                      )}
                      {desc && (
                        <Typography variant="caption" color="general-mid">
                          {desc}
                        </Typography>
                      )}
                    </>
                  }
                />
              </Grid>
            )
          );
        },
      )}
    </Grid>
  );
};

SectionAttachment.defaultProps = {
  data: null,
  schema: [],
};

SectionAttachment.propTypes = {
  data: PropTypes.object,
  schema: PropTypes.array,
};

export default SectionAttachment;
