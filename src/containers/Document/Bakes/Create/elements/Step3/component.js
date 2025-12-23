import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import TextEditor from '@__old/components/elements/TextEditor';
import { Grid } from '@material-ui/core';
import Text from '@__old/components/elements/Text';
import CheckboxGroup from '@__old/components/elements/CheckboxGroup';
import DateRangePickers from '@__old/components/elements/DateRangePickers';
import Card from '@components/Card/Card';

export default function Component(props) {
  const { handleSubmit, invalid, submitting, data } = props;

  useEffect(() => {
    props.disableButton(invalid || submitting);
    props.loadingButton(submitting);
  }, [invalid, submitting]);

  const strongText = (str) => (
    <Text color="mainDark" variant="medium">
      {str}
    </Text>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex' }}>
              <Text color="mainDark" variant="h5" weight="bold">
                B.{' '}
              </Text>
              <div style={{ paddingLeft: 16 }}>
                <Text color="mainDark" variant="h5" weight="bold">
                  Syarat dan Ketentuan
                </Text>
                <br />
                <Text color="grey" variant="body1">
                  Penggunaan layanan-layanan {strongText(data.telkomAlias)}{' '}
                  sebagaimana dimaksud butir A dengan ketentuan-ketentuan
                  sebagai berikut:
                </Text>
                <br />
                <br />
                <Field
                  component={CheckboxGroup}
                  name="toc"
                  options={[
                    'Masa berlaku BAKES selama 1 Tahun',
                    'Harga tidak termasuk PPN',
                    `Proses provisioning dan pemberian layanan kepada ${data.customerAlias} 
                  dilaksanakan setelah ${data.telkomAlias} menerima surat Purchase Order 
                  dari ${data.customerAlias}`,
                  ].map((v) => ({ value: v, label: v }))}
                />
                <br />
                <br />
                <Text color="grey" variant="body1">
                  Periode Tanggal BAKES
                </Text>
                <br />
                <br />
                <Field component={DateRangePickers} fullDate name="period" />
                <br />
                <Text color="grey" variant="body1">
                  Syarat dan Ketentuan tambahan:
                </Text>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Text color="grey" variant="h4" weight="bold">
              Text Editor
            </Text>
            <br />
            <br />
            <Field
              component={TextEditor}
              name="additionalToc"
              type="evaluate"
            />
            <br />
          </Grid>
        </Grid>
      </Card>
    </form>
  );
}

Component.propTypes = {
  data: PropTypes.object.isRequired,
  disableButton: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  loadingButton: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};
