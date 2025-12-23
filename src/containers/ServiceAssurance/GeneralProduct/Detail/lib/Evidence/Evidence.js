import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import EstimateValue from '../EstimateValue';
import FileAttachment from '@__old/components/elements/FileAttachment';
import ImageAttachment from '@__old/components/elements/ImageAttachment';

const Evidence = (props) => {
  const { data } = props;

  return (
    <Grid container spacing={3}>
      {data.rejectReason && (
        <Grid item xs={12}>
          <EstimateValue value={data.rejectReason} variant="success" />
        </Grid>
      )}
      {data.fileEvidence &&
        ['pdf', 'txt', 'word', 'doc', 'docx'].includes(
          data.fileEvidence.fileType,
        ) && (
          <Grid item xs={12}>
            <FileAttachment
              fileName={data.fileEvidence.fileName}
              type={data.fileEvidence.fileType}
              url={data.fileEvidence.fileUrl}
            />
          </Grid>
        )}
      {data.fileEvidence &&
        ['png', 'jpg', 'jpeg'].includes(data.fileEvidence.fileType) && (
          <Grid item xs={4}>
            <ImageAttachment
              fileName={data.fileEvidence.fileName}
              url={data.fileEvidence.fileUrl}
            />
          </Grid>
        )}
    </Grid>
  );
};

Evidence.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Evidence;
