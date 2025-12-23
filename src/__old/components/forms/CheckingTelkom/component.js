import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UploadFile from '../../elements/UploadFile';
import { Grid, Divider } from '@material-ui/core';
import Text from '../../elements/Text';
import Button from '../../elements/Button';
import Download from '../../../../assets/Svg/Download';

export default class Component extends React.Component {
  state = {
    file: null,
    urlDownload: null,
  };

  componentDidMount() {
    const { getDownload, id } = this.props;
    getDownload(id, (urlDownload) => this.setState({ urlDownload }));
  }

  handleChangeFile = (file) => this.setState({ file });

  onSubmit = () => {
    const { handleSubmit, onClose } = this.props;
    const { file } = this.state;
    handleSubmit(file);
    onClose();
  };

  downloadFile = () => window.open(this.state.urlDownload, '_blank');

  render() {
    const { classes, onClose } = this.props;
    const { file, urlDownload } = this.state;
    const buttonDisable = !file;

    return (
      <Fragment>
        <Grid container spacing={2} style={{ padding: 16 }}>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Please download this template and completed it
            </Text>
          </Grid>
          <Grid align="center" item xs={12}>
            <Button
              className={classes.buttonDownload}
              disabled={!urlDownload}
              onClick={this.downloadFile}
              variant="primary"
            >
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Download />
                &nbsp; template surat penunjukan
              </span>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid align="center" item xs={12}>
            <Text variant="body1">
              Please filled the data to be sent to provider
            </Text>
            <br />
            <Text color="grey" variant="caption">
              Once you send this data, it will be processed by provider
            </Text>
          </Grid>
          <Grid item xs={12}>
            <UploadFile
              accept={['.pdf']}
              fileName={file ? file.name : ''}
              maxSize={5242880}
              onChange={this.handleChangeFile}
            />
          </Grid>
          <Grid align="center" item xs={12}>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
            &nbsp;
            <Button disabled={buttonDisable} onClick={this.onSubmit}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
Component.propTypes = {
  classes: PropTypes.object.isRequired,
  getDownload: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  provider: PropTypes.string.isRequired,
};
