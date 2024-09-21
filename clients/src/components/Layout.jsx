import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from './SideNavBar';
import Header from './Header';

function Layout() {
  const [showNav, setShowNav] = useState(true);
  const sideNavRef = useRef(null);

  const handleToggleNav = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target) &&
        !event.target.closest('.menu-btn')
      ) {
        setShowNav(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideNavBar show={showNav} ref={sideNavRef} />
      <div
        className={`flex-grow transition-all duration-300 ${
          showNav ? 'ml-64' : 'ml-0'
        }`}
      >
        <Header onMenuClick={handleToggleNav} />
        <div className="pt-16 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
