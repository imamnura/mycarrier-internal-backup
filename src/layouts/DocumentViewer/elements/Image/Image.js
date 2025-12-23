import React from 'react';
import useStyles from './styles';
import useAction from './hooks/useAction';
import ViewerContainer from '../ViewerContainer';
import clsx from 'clsx';

const Image = () => {
  const { url, title, action, onClose, onDownload, centered } = useAction();

  const classes = useStyles();

  return (
    <ViewerContainer
      action={action}
      emptyDoc={!url}
      onClose={onClose}
      onDownload={onDownload}
      open={!!url}
      title={title}
    >
      <div
        className={clsx(classes.wrapper, {
          [classes.centered]: centered,
        })}
      >
        <img alt={title} loading="lazy" src={url} />
      </div>
    </ViewerContainer>
  );
};

export default React.memo(Image);
