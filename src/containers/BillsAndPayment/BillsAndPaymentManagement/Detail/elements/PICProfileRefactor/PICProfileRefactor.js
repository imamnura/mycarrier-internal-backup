import React from 'react';
import PropTypes from 'prop-types';
import Button from '@components/Button';
import Trash from '@assets/icon-v2/Trash';
import Whatsapp from '@assets/Svg/Whatsapp';
import FormPICProfile from './elements/FormPICProfile';
import NoData from '@assets/ilustration-v2/NoData';
import useStyles from './styles';
import { title, privilege, emptyLabel } from './utils';
import useAction from './hooks/useAction';
import { isHaveAccess } from '@utils/common';
import { Box, Flex, Text } from '@legion-ui/core';
// import Status from '@components/Status';
import AddIcon from '@assets/icon-v2/Add';
import { getUserData } from '@utils/common';

const PICProfileRefactor = (props) => {
  const classes = useStyles();
  const {
    data,
    type,
    updatePicProfile,
    feature,
    companyName = '',
    testLocator,
  } = props;

  const { setFormPic, formPic, closeFormPic, deleteProfile } = useAction(props);

  const privilegeConstant = privilege[type];

  const picCdmUserLogin = getUserData()?.fullName;

  return (
    <div>
      <Flex
        alignX="space-between"
        alignY="center"
        mb={type === 'am' ? '29px' : '24px'}
        mt={type === 'am' ? '5px' : '0px'}
      >
        <Text size={'20px'} weight="700" color="secondary500">
          {title[type]}
        </Text>
        {type !== 'am' && isHaveAccess(feature, privilegeConstant?.create) && (
          <Button
            onClick={setFormPic({ variant: 'add' })}
            variant="ghost"
            leftIcon={AddIcon}
            center
            id={testLocator.addPic}
          >
            ADD PIC
          </Button>
        )}
      </Flex>
      {data.length > 0 ? (
        <div
          style={{
            maxHeight: '151px',
            overflow: data.length > 2 ? 'auto' : 'unset',
          }}
        >
          {data.map(({ name, phoneNumber, email }, i) => (
            <Flex
              alignX="space-between"
              alignY="center"
              key={i}
              className={classes.boxPic}
              style={{ gap: 12, position: 'relative', alignItems: 'center' }}
            >
              <Flex style={{ flexGrow: 1, maxWidth: '90%' }}>
                <Flex style={{ width: '100%' }}>
                  <Text size={'14px'} weight="600" color="secondary700">
                    {i + 1}. {name}
                  </Text>
                </Flex>
                <Flex direction="column" ml="15px">
                  <Flex alignY="center">
                    <Text size={'12px'} color="secondary400">
                      {phoneNumber}
                    </Text>
                    <Box className={classes.circle} />
                    <Text size={'12px'} color="secondary400">
                      {email}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              {/* {source && <Status variant="tag">{source}</Status>} */}
              {type === 'customer' && phoneNumber && (
                <Box
                  id={testLocator.id + '-whatsapp'}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://wa.me/${phoneNumber}/?text=Halo%20${name}%20dari%20${companyName}%2C%0APerkenalkan%2C%20saya%20${picCdmUserLogin}%20dari%20TELKOM%20DWS.%20%0A%0ATerimakasih%20atas%20kepercayaan%20yang%20selama%20ini%20anda%20berikan.%20Ada%20informasi%20yang%20perlu%20kami%20sampaikan%20kepada%20anda.%0A%0ATerimakasih%20atas%C2%A0perhatiannya.`,
                      '_blank',
                    );
                  }}
                  style={{
                    position: 'absolute',
                    right: '45px',
                    cursor: 'pointer',
                  }}
                >
                  <Whatsapp />
                </Box>
              )}
              {type !== 'am' &&
                isHaveAccess(feature, privilegeConstant.delete) && (
                  <Box
                    id={testLocator.id + '-delete'}
                    color="primary500"
                    className={classes.trashIcon}
                    onClick={deleteProfile(email)}
                    style={{ position: 'absolute', right: '8px' }}
                  >
                    <Trash />
                  </Box>
                )}
            </Flex>
          ))}
        </div>
      ) : (
        <Box className={classes.notFound}>
          <NoData className={classes.noData} />
          <Box mt="8px" mb="3px">
            <Text size={'16px'} weight="600" color="secondary700">
              {emptyLabel[type].title}
            </Text>
          </Box>
          <Text size={'14px'} color="secondary400">
            {emptyLabel[type].description}
          </Text>
        </Box>
      )}
      <FormPICProfile
        allProfile={data}
        formPic={formPic}
        onClose={closeFormPic}
        type={type}
        updatePicProfile={updatePicProfile}
      />
    </div>
  );
};

PICProfileRefactor.defaultProps = {
  data: [],
  type: 'customer',
};

PICProfileRefactor.propTypes = {
  data: PropTypes.array,
  feature: PropTypes.array.isRequired,
  testLocator: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['cdm', 'customer', 'am']),
  updatePicProfile: PropTypes.func.isRequired,
};

export default PICProfileRefactor;
