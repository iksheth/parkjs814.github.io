import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Desktop, Resume, Taskbar } from 'components';
import { FileSystemContext, ResponsiveContext } from 'contexts';
import { RootDir } from 'beans';
import Menu from '../Menu';
import './stylesheet.scss';

const isMobile = () => {
  const { clientWidth } = document.body;
  return clientWidth <= 512;
};

function Screen() {
  const [mobile, setMobile] = useState(isMobile());
  const [rootDirRefresh, setRootDirRefresh] = useState(0);

  useEffect(() => {
    const onResize = () => {
      setMobile(isMobile());
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('mobile', mobile);
  }, [mobile]);

  const refreshRootDir = () => setRootDirRefresh(rootDirRefresh + 1);

  return (
    <Router>
      <Switch>
        <Route path="/resume">
          <Resume/>
        </Route>
        {/* support for legacy paypal donation callback (/#paypal-success -> /#/paypal/success  */}
        <Route path="/paypal-success">
          <Redirect to="/paypal/success"/>
        </Route>
        <Route>
          <ResponsiveContext.Provider value={mobile}>
            <FileSystemContext.Provider value={[RootDir.instance, refreshRootDir]}>
              <div className="Screen">
                <Desktop/>
                <Menu/>
                <Taskbar/>
              </div>
            </FileSystemContext.Provider>
          </ResponsiveContext.Provider>
        </Route>
      </Switch>
    </Router>
  );
}

export default Screen;
