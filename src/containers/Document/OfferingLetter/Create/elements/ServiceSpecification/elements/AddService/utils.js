import { capitalize } from '@utils/text';

export const normalizeAutoForm = (data) => {
  const select = [];
  const textField = [];
  const radio = [];

  data.API?.forEach((f) => {
    const label = capitalize(f.FIELDNAME);
    const required = f.STATUS === 'mandatory';

    select.push({
      label,
      name: f.FIELDNAME,
      optionsApi: f.URLAPI,
      placeholder: `Choose ${label}`,
      isSearchable: true,
      required,
      ncixRef: f.NCIX_REF,
      rules: {
        required: required ? `${label} is a required field` : false,
      },
    });
  });

  data.FREE?.forEach((f) => {
    const label = capitalize(f.FIELDNAME);
    const required = f.STATUS === 'mandatory';
    const max = f.RDM;

    textField.push({
      disabled: f.DISABLE,
      label,
      name: f.FIELDNAME,
      required,
      rules: {
        max: max
          ? {
              message: `${label} must be lower than or equal to ${max}`,
              value: max,
            }
          : undefined,
        min: {
          message: `${label} must be greater than or equal to 0`,
          value: 0,
        },
        required: required ? `${label} is a required field` : undefined,
      },
    });
  });

  data.SELECT?.forEach((f) => {
    const label = capitalize(f.FIELDNAME);
    const required = f.STATUS === 'mandatory';

    const field = {
      label,
      name: f.FIELDNAME,
      options: f.OPTION.map(({ VALUE, DISPLAY }) => {
        let display = DISPLAY;

        if (DISPLAY === '0') {
          display = 'No';
        } else if (DISPLAY === '1') {
          display = 'Yes';
        }

        return {
          value: typeof VALUE === 'number' ? VALUE.toString() : VALUE,
          label: display,
        };
      }),
      placeholder: `Choose ${label}`,
      required,
      rules: {
        required: required ? `${label} is a required field` : false,
      },
    };

    if (field.options.length > 4) {
      select.push(field);
    } else {
      radio.push(field);
    }
  });

  return {
    select,
    textField,
    radio,
  };
};
