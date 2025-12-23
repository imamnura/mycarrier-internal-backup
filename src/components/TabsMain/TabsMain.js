import React from 'react';
import useTabsMainStyles from './TabsMain.styles';
import clsx from 'clsx';

const TabsMain = ({ options, value, onChange: _onChange }) => {
  const classes = useTabsMainStyles();

  const onChange = (v) => () => _onChange(v);
  return (
    <div className={classes.tabGroup}>
      {options.map((opt, i) => (
        <div
          key={i}
          className={clsx({
            [classes.tab]: true,
            [classes.tabActive]: opt.value === value,
          })}
          onClick={onChange(opt.value)}
          id={opt.id}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};

export default TabsMain;
