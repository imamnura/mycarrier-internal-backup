import { Checkbox } from '@components/FormField';
import Typography from '@components/Typography';
import HeaderAndFilter from '@fragments/HeaderAndFilter';
import List from '@fragments/List';
import { Box } from '@material-ui/core';
import StopIcon from '@material-ui/icons/Stop';
import useResponsive from '@utils/hooks/useResponsive';
import PropTypes from 'prop-types';
import { tableHeader } from './constant';
import useActions from './hooks/useActions';

const NotificationSetting = (props) => {
  const { action, control, loading, groupedData } = useActions(props);

  const mobileClient = useResponsive('xs');
  // const smClient = useResponsive('sm');

  const checkboxItem = ({ name, padding, type }) => {
    return (
      <div>
        {mobileClient && (
          <Box mt={2}>
            <Typography
              children={type.toUpperCase()}
              inline
              variant="caption"
              weight="bold"
            />
          </Box>
        )}
        <Box pl={mobileClient ? 0 : padding}>
          <Checkbox
            checkedIcon={<StopIcon />}
            control={control}
            key={`${name}-${type}`}
            name={`${name}.${type}`}
          />
        </Box>
      </div>
    );
  };

  const normalize = (data) =>
    data?.map((v) => ({
      ...v,
      email: checkboxItem({ name: v?.slug, type: 'email', padding: 1 }),
      whatsapp: checkboxItem({ name: v?.slug, type: 'whatsapp', padding: 3 }),
    }));

  const renderList = (key, value) => {
    const listProps = {
      table: {
        data: normalize(value),
        loadingRoot: loading,
        loading: false,
        meta: 0,
        numbering: false,
        schema: tableHeader(key),
        size: 2,
      },
      withTopDivider: false,
    };

    return (
      <div key={`${key}-table`}>
        <List {...listProps} />
      </div>
    );
  };

  return (
    <>
      <HeaderAndFilter
        action={action}
        breadcrumb={[{ label: 'Notification Settings' }]}
      />
      <Box px={6}>
        {Object.keys(groupedData).map((key) =>
          renderList(key, groupedData[key]),
        )}
      </Box>
    </>
  );
};

NotificationSetting.defaultProps = {
  classes: {},
  feature: [],
};

NotificationSetting.propTypes = {
  classes: PropTypes.object,
  feature: PropTypes.array,
};

export default NotificationSetting;
