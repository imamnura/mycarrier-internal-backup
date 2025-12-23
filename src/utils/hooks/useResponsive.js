import { useMediaQuery, useTheme } from '@material-ui/core';

/**
 * @description for react-select props information
 *
//  * @typedef  SizeParam -n
 *
 * @param {'xs' | 'sm' | 'md' | 'lg' | 'xl'} size -n
 * @returns {React.FC} -n
 */

const useResponsive = (size) => {
  return useMediaQuery(useTheme().breakpoints.down(size));
};

export default useResponsive;
