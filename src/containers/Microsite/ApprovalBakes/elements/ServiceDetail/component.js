import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Text from '../../../../../__old/components/elements/Text';
import RedList from '../../../../../__old/components/elements/RedList';
import { getValueObject } from '../../../../../__old/utils/common';
import { convertToRupiah } from '../../../../../utils/text';
import FileViewer from '../../../../../layouts/FileViewer';

export default function Component(props) {
  const { classes, data, schema } = props;

  const [previewFile, setPreviewFile] = useState(null);

  const countPercentage = (percentage) => {
    if (percentage === '' || percentage === null) {
      return '-';
    } else if (percentage < 100) {
      return 'Dibawah HJM (' + percentage + '%)';
    } else if (parseInt(percentage) === 100) {
      return 'Sama dengan HJM (' + percentage + '%)';
    } else if (percentage > 100) {
      return 'Diatas HJM (' + percentage + '%)';
    }
  };

  const checked = (item, value) => {
    if (item.percentage) {
      return countPercentage(value);
    } else if (item.rupiah) {
      return convertToRupiah(value);
    } else {
      return value || '-';
    }
  };

  const renderItem = (item) => <Text variant="body2">{item.productName}</Text>;

  const renderItemDetail = (item) => {
    let value = getValueObject({ name: item.name, data });

    if (typeof value === 'object' && !item.previewDocs) {
      value = value?.join(', ');
    }

    let textProps = {};

    if (item.color) {
      textProps = { color: item.color };
    }

    return (
      <Fragment>
        <Grid item xs={6}>
          <Text variant="body2">{item.label}</Text>
        </Grid>
        <Grid item xs={1}>
          <Text variant="body2">:</Text>
        </Grid>
        <Grid item xs={5}>
          {item.previewDocs ? (
            <Text
              children={value?.fileName || '-'}
              id="textpreview"
              onClick={() => setPreviewFile(value)}
              style={{ cursor: 'pointer' }}
              variant="body2"
              {...textProps}
            />
          ) : (
            <Text variant="body2" {...textProps}>
              {checked(item, value)}
            </Text>
          )}
        </Grid>
      </Fragment>
    );
  };

  return (
    <Grid container spacing={1}>
      {data.products && (
        <Grid item xs={12}>
          <Text variant="body1">Service</Text>
          <RedList child={renderItem} classes={classes} data={data.products} />
        </Grid>
      )}
      <Grid item xs={12}>
        <Text variant="body1">Service Detail Information</Text>
        <div className={classes.content}>
          <Grid container spacing={1}>
            {schema.map(renderItemDetail)}
          </Grid>
        </div>
      </Grid>
      <FileViewer
        file={previewFile?.fileUrl}
        onClose={() => setPreviewFile(null)}
        open={Boolean(previewFile?.fileUrl)}
        title={previewFile?.fileName}
      />
    </Grid>
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
