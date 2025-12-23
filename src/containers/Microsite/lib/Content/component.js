import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Text from '../../../../__old/components/elements/Text';
import { Grid } from '@material-ui/core';
import images from '../../../../__old/configs/images';
import { getValueObject } from '../../../../__old/utils/common';
import FileViewer from '../../../../layouts/FileViewer';
import { dateFormat } from '@utils/parser';

export default function Component(props) {
  const {
    classes,
    header: { title, subtitle },
    label,
    schema,
    data,
    additionalContent,
  } = props;

  const [previewFile, setPreviewFile] = useState(null);

  const renderItem = (item) => {
    let value = getValueObject({ name: item.name, data });

    if (item.date) {
      value = dateFormat({ date: value, type: item?.type || 'date' });
    }

    if (
      typeof value === 'object' &&
      !item.link &&
      !item.previewDocs &&
      !item.list
    ) {
      value = value.join(', ');
    }

    let textProps = {};

    if (item.color) {
      textProps = { color: item.color };
    }

    const contentType = () => {
      if (item.link) {
        return (
          <a
            href={value.fileUrl}
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
            target="_blank"
          >
            <Text variant="body2" {...textProps}>
              {value.fileName}
            </Text>
          </a>
        );
      }
      if (item.previewDocs) {
        if (Array.isArray(value) && !!value.length) {
          return (
            <ul style={{ paddingLeft: 0, margin: 0, listStyleType: 'none' }}>
              {value.map((item, i) => (
                <li key={`bdy-det-${item}-${i}`}>
                  <Grid item xs={12}>
                    <Text
                      children={item?.fileName}
                      onClick={() => setPreviewFile(item)}
                      style={{ cursor: 'pointer' }}
                      variant="body2"
                      {...textProps}
                    />
                  </Grid>
                </li>
              ))}
            </ul>
          );
        }

        if (!!value?.fileUrl && typeof value?.fileUrl === 'string') {
          return (
            <Text
              children={value?.fileName}
              onClick={() => setPreviewFile(value)}
              style={{ cursor: 'pointer' }}
              variant="body2"
              {...textProps}
            />
          );
        }

        return <Text children={'-'} variant="body2" />;
      }
      if (item.list) {
        if (Array.isArray(value) && !!value.length) {
          return (
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {value.map((item, i) => (
                <li key={`bdy-det-${item}-${i}`}>
                  <Grid item xs={12}>
                    <Text variant="body2">{item || '-'}</Text>
                  </Grid>
                </li>
              ))}
            </ul>
          );
        }

        return <Text children={'-'} variant="body2" />;
      }

      return (
        <Text variant="body2" {...textProps}>
          {value || '-'}
        </Text>
      );
    };

    return (
      <Fragment>
        <Grid item xs={6}>
          <Text variant="body2">{item.label}</Text>
        </Grid>
        <Grid item xs={1}>
          <Text variant="body2">:</Text>
        </Grid>
        <Grid item xs={5}>
          {contentType()}
        </Grid>
      </Fragment>
    );
  };

  return (
    <>
      <Grid
        alignItems="center"
        className={classes.mainWrapper}
        container
        spacing={2}
      >
        <Grid item xs={2}>
          <img
            className={classes.logo}
            src={images.LOGO_SQUARE}
            alt="logo-square"
          />
        </Grid>
        <Grid item xs={10}>
          <Text variant="subtitle2">{title}</Text>
          <br />
          <Text color="grey" variant="body2">
            {subtitle}
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Text variant="body2">{label}</Text>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.content}>
            <Grid container spacing={1}>
              {schema.map(renderItem)}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          {additionalContent}
        </Grid>
      </Grid>
      <FileViewer
        file={previewFile?.fileUrl}
        onClose={() => setPreviewFile(null)}
        open={Boolean(previewFile?.fileUrl)}
        title={previewFile?.fileName}
      />
    </>
  );
}

Component.defaultProps = {
  additionalContent: null,
  data: {},
  header: {
    caption: '',
    title: '',
  },
  label: '',
  schema: [],
};

Component.propTypes = {
  additionalContent: PropTypes.node,
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  header: PropTypes.object,
  label: PropTypes.string,
  schema: PropTypes.array,
};
