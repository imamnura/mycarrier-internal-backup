import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '../../../../elements/Button';
import Text from '../../../../elements/Text';
import InfoDetail from '../../../../elements/InfoDetail';
import { getValueObject } from '../../../../../utils/common';
import FileAttachment from '../../../../elements/FileAttachment';
import { textLimit } from '../../../../../../utils/text';
import RedList from '../../../../elements/RedList';

export default function Component(props) {
  const { classes, data, schema } = props;

  const detailInfo = Object.keys(schema).map((item) => schema[item]);

  const renderFile = (property) => {
    const { name, ...rest } = property;
    const file = getValueObject({ name, data });
    const { fileName, fileUrl, fileUrlDownload } = file || {};

    if (file && file.length > 0) {
      return file.map(({ fileName, fileUrl, fileUrlDownload }, index) => (
        <FileAttachment
          {...rest}
          file={{ fileName, fileUrl, fileUrlDownload }}
          fileName={textLimit(fileName, 24)}
          key={(fileUrlDownload ? fileUrlDownload : fileUrl) + index}
          label={index === 0 ? rest.label : ''}
          url={fileUrlDownload ? fileUrlDownload : fileUrl}
        />
      ));
    }

    return (
      fileUrl && (
        <FileAttachment
          file={file}
          fileName={textLimit(fileName, 24)}
          url={fileUrlDownload ? fileUrlDownload : fileUrl}
          {...rest}
        />
      )
    );
  };

  return (
    <Fragment>
      {detailInfo.map(
        ({ title, data: child, status, validStatus = [], exceptStatus }) => {
          let display = true;

          if (
            !validStatus.includes(data.activationStatus) &&
            title === 'Bulk Parameter'
          )
            display = false;
          if (status && status !== data.activationStatus) display = false;
          if (exceptStatus && exceptStatus === data.status) display = false;
          if (
            status &&
            status === data.activationStatus &&
            !data.isConsortium &&
            data.provider !== 'Telkomsel'
          )
            display = false;
          if (status && status === data.activationStatus && title === 'Notes') {
            if (data.isConsortium && data.provider === 'Telkomsel') {
              display = false;
            } else {
              display = true;
            }
          }
          if (
            status &&
            status === data.activationStatus &&
            title === 'Sender ID Parameter'
          ) {
            if (data.isConsortium && data.provider === 'Telkomsel') {
              display = true;
            } else {
              display = false;
            }
          }

          return (
            display &&
            child.length > 0 && (
              <Grid
                className={classes.wrapper}
                container
                key={title}
                spacing={1}
              >
                <Grid
                  item
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                  xs={12}
                >
                  <Text color="grey" variant="h4">
                    {title}
                  </Text>
                  {title !== 'Document Attachment' ||
                  !data.attachmentDoc?.fileUrl ? null : (
                    <Button href={data.attachmentDoc?.fileUrl}>
                      Download All
                    </Button>
                  )}
                </Grid>
                {child.map((property, i) => {
                  const { label, name, type, grid, render, file, ...rest } =
                    property;

                  if (file) {
                    return (
                      <Grid item xs={12} key={i}>
                        {renderFile(property)}
                      </Grid>
                    );
                  }

                  if (type === 'redList') {
                    const renderData = data[name];
                    if (renderData.length) {
                      return (
                        <Grid item xs={12} key={i}>
                          <RedList data={renderData} {...rest} />
                        </Grid>
                      );
                    } else
                      return (
                        <Grid item xs={12} key={i}>
                          <Text variant="h5">{'-'}</Text>
                        </Grid>
                      );
                  }

                  if (type === 'custom') {
                    return (
                      <Grid item xs={12} key={i}>
                        {render}
                      </Grid>
                    );
                  }

                  if (!label) {
                    return <Grid item xs={6} key={i} />;
                  }

                  let content = getValueObject({ name, data });

                  if (name === 'messageFormatOtp' && !data[name]) {
                    return null;
                  }

                  if (name === 'messageFormat' && !data[name]) {
                    return null;
                  }

                  if (name === 'mediaSeller' && !data[name]) {
                    return null;
                  }

                  if (name === 'documentPO') {
                    const documentPO = data.map((item) => item.fileName);
                    content = documentPO;
                  }

                  // if (name === 'translationNumber') {
                  //   const translationNumber = data.map((item) => item.)
                  // }

                  // if (name === 'subscribeType') {
                  //   const subscribeType = data.map((item) => item);
                  //   content = subscribeType;
                  // }

                  if (name === 'additionalVisitor') {
                    const visitor = data.additionalVisitor;
                    const additionalVisitor = visitor.length
                      ? visitor.map((v) => v.name)
                      : '';
                    content = additionalVisitor;
                  }

                  if (type === 'troubleOccurs') {
                    const troubleOccurs = data.troubleOccurs
                      ? data.troubleOccurs[0]
                      : {};
                    content = troubleOccurs[name];
                  }

                  if (type === 'troubleOccursLink') {
                    const troubleOccursLink = data.troubleOccursLink;
                    content = troubleOccursLink[name];
                  }

                  if (type === 'cpNameInfo') {
                    const cpNameInfo = data.cpNameInfo
                      ? data.cpNameInfo[0]
                      : {};
                    content = cpNameInfo[name];
                  }

                  if (type === 'amFullname' && data.account_manager) {
                    const account_manager = data.account_manager;
                    content = account_manager[name];
                  }

                  if (type === 'amSegment' && data.account_manager) {
                    const account_manager = data.account_manager;
                    content = account_manager[name];
                  }

                  if (type === 'smscData' && data.smscData) {
                    const smscData = data.smscData;
                    content = smscData[name];
                  }

                  if (type === 'MsightCompanyInfo' && data.companyAddress) {
                    const MsightCompanyInfo = data.companyAddress;
                    content = MsightCompanyInfo[name];
                  }

                  return (
                    <Grid item key={label} xs={grid ? 12 : 6}>
                      <InfoDetail content={content} label={label} {...rest} />
                    </Grid>
                  );
                })}
              </Grid>
            )
          );
        },
      )}
    </Fragment>
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
