import React, { useEffect, useState } from 'react';
import useResponsive from '../../utils/hooks/useResponsive';
import Navigation from './elements/Navigation';
import Header from './elements/Header';
import PropTypes from 'prop-types';
import useMainStyles from './Main.styles';

const Main = (props) => {
  const { children, hideNavigation } = props;

  let smClient = useResponsive('sm');
  if (hideNavigation) smClient = true;

  const [expand, setExpand] = useState(true);
  const toggleExpand = () => setExpand(!expand);

  useEffect(() => {
    if (smClient) {
      toggleExpand();
    }
  }, [smClient]);

  const classes = useMainStyles({ smClient, expand });

  return (
    <>
      {!['Page404', 'Unauthorize'].includes(children?.type?.name) && (
        <>
          <Header setExpand={toggleExpand} />
          <Navigation
            expand={expand}
            hideNavigation={hideNavigation}
            setExpand={toggleExpand}
          />
        </>
      )}
      <div className={classes.content}>{children}</div>
    </>
  );
};

Main.defaultProps = {
  children: <span />,
  hideNavigation: false,
};

Main.propTypes = {
  children: PropTypes.node,
  hideNavigation: PropTypes.bool,
};

export default Main;
