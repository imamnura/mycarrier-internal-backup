import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@legion-ui/core';
import { Switch, TextArea, TextField } from '@components/FormFieldLegion';
import { string } from 'yup';
import { pickTitleFormLocalization } from '../../utils';
import { titleCapitalize } from '@utils/common';
import { useWatch } from 'react-hook-form';
import { IconButton } from '@material-ui/core';
import Swap from '@assets/Svg/Swap';
import color from '@styles/color';

const Content = (props) => {
  const { useForm } = props;

  const withSecondaryButton = useWatch({
    control: useForm?.control,
    name: 'withSecondaryButton',
  });

  const renderFormButton = (lang, type = 'primary') => {
    return (
      <Flex
        direction="row"
        style={{
          flex: 1,
          padding: '12px',
          gap: '16px',
          borderRadius: '8px',
          backgroundColor: '#F8F9FA',
        }}
      >
        <Flex
          alignX="space-between"
          style={{
            flex: 1,
          }}
        >
          <Text size="16px" weight="700" color="secondary500">
            {titleCapitalize(type)} Button ({lang})
          </Text>
          {type === 'secondary' && (
            <Switch control={useForm?.control} name={`withSecondaryButton`} />
          )}
        </Flex>
        {!(type === 'secondary' && !withSecondaryButton) && (
          <>
            <TextField
              block
              control={useForm?.control}
              label={`Button Label (${lang})`}
              name={`localizations.${lang}.ctaButtons.${type}.label`}
              placeholder={`Input Button Label (${lang})`}
              required
              rules={{
                validate: async (value) =>
                  string()
                    .required()
                    .label(`Button Label (${lang})`)
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message),
              }}
            />
            <TextField
              block
              control={useForm?.control}
              label="Link"
              name={`localizations.${lang}.ctaButtons.${type}.link`}
              placeholder="Input Link"
              required
              rules={{
                validate: async (value) =>
                  string()
                    .required()
                    .label('Link')
                    .validate(value)
                    .then(() => true)
                    .catch((err) => err?.message),
              }}
            />
          </>
        )}
      </Flex>
    );
  };

  const renderFormLocalization = (lang) => {
    return (
      <Flex
        direction="row"
        style={{ flex: 1, padding: '16px 32px', gap: '16px' }}
      >
        <Text size="20px" weight="700" color="secondary500">
          {pickTitleFormLocalization[lang]}
        </Text>
        <TextArea
          block
          control={useForm?.control}
          label={`Banner Title (${lang})`}
          name={`localizations.${lang}.title`}
          placeholder={`Input Banner Title (${lang})`}
          rows={3}
          required
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label(`Banner Title (${lang})`)
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
        <TextArea
          block
          control={useForm?.control}
          label={`Banner Description (${lang})`}
          name={`localizations.${lang}.description`}
          required
          placeholder={`Input Banner Desciption (${lang})`}
          rows={3}
          rules={{
            validate: async (value) =>
              string()
                .required()
                .label(`Banner Description (${lang})`)
                .validate(value)
                .then(() => true)
                .catch((err) => err?.message),
          }}
        />
        {['primary', 'secondary'].map((item, key) => (
          <Box inline width="100%" key={key}>
            {renderFormButton(lang, item)}
          </Box>
        ))}
      </Flex>
    );
  };

  return (
    <Flex
      style={{
        position: 'relative',
        border: '1px solid #D2D8DA',
        borderRadius: '12px',
      }}
    >
      <IconButton
        style={{
          '&:hover': {
            backgroundColor: color.general.light,
          },
          backgroundColor: color.general.soft,
          height: 32,
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%)',
          width: 32,
          marginTop: 14,
        }}
        onClick={() => {}}
        disabled
      >
        <Swap />
      </IconButton>
      {renderFormLocalization('ID')}
      <div style={{ borderRight: '1px dashed #D2D8DA' }} />
      {renderFormLocalization('EN')}
    </Flex>
  );
};

Content.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
};

export default Content;
