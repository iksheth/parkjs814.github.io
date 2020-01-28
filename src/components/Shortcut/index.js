import React, { useContext } from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';
import { Icon, Link } from 'components';
import { ResponsiveContext } from 'contexts';

function Shortcut({ target, desktop, taskbar }) {
  const mobile = useContext(ResponsiveContext);

  return (
    <Link
      className={classes(
        'Shortcut', desktop && 'desktop', taskbar && 'taskbar',
        target.pinned && !mobile && 'pinned',
        target.opened && !target.closing && 'active')}
      url={target.url}>
      <Icon className="icon" {...target.iconProps}/>
      {
        desktop &&
        <div className="name">
          {target.name}
        </div>
      }
    </Link>
  );
}

export default Shortcut;