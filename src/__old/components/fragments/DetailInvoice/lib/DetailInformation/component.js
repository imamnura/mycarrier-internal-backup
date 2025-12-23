import React, { Fragment } from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Text from '../../../../elements/Text';
import InfoDetail from '../../../../elements/InfoDetail';
import { getValueObject } from '../../../../../utils/common';
import FileAttachment from '../../../../elements/FileAttachment';
import { textLimit } from '../../../../../../utils/text';
import UploadFile from '../../../../elements/UploadFile';

export default function Component(props) {
  const { classes, data, schema } = props;

  const detailInfo = Object.keys(schema).map((item) => schema[item]);

  const renderFile = (property) => {
    const { name, ...rest } = property;
    delete property.fileNames;
    delete property.upload;
    const file = getValueObject({ name, data });
    const { fileName, fileUrl } = file || {};
    if (file && file.length > 0) {
      return file.map(({ fileName, fileUrl }, index) => (
        <FileAttachment
          {...rest}
          fileName={textLimit(fileName, 24)}
          key={fileUrl + index}
          label={index === 0 ? rest.label : ''}
          type={rest.type[index]}
          url={fileUrl}
        />
      ));
    }

    return (
      fileUrl && (
        <FileAttachment
          fileName={textLimit(fileName, 24)}
          url={fileUrl}
          {...rest}
        />
      )
    );
  };

  const renderUpload = (property) => {
    const { label, fileNames, ...rest } = property;
    return (
      <>
        <Text className={classes.label} color="grey" variant="body2">
          {label}
        </Text>
        <UploadFile
          accept={['.pdf']}
          fileName={fileNames}
          label={label}
          // maxSize={512000}
          maxSize={10490000}
          {...rest}
          type="file"
        />
      </>
    );
  };

  return (
    <Fragment>
      {detailInfo.map(({ title, data: child }) => {
        let display = true;
        return (
          display && (
            <Grid className={classes.wrapper} container key={title} spacing={1}>
              <Grid item xs={12}>
                <Text color="grey" variant="h4">
                  {title}
                </Text>
              </Grid>
              {child.map((property, i) => {
                const { label, name, grid, file, upload, ...rest } = property;
                if (file) {
                  return (
                    <Grid item xs={12} key={i}>
                      {upload ? renderUpload(property) : renderFile(property)}
                    </Grid>
                  );
                }

                if (!label) {
                  return <Grid item xs={6} key={i} />;
                }

                let content = getValueObject({ name, data });

                return (
                  <Grid item key={label} xs={grid ? 12 : 6}>
                    <InfoDetail content={content} label={label} {...rest} />
                  </Grid>
                );
              })}
            </Grid>
          )
        );
      })}
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
