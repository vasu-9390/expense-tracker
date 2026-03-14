import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import ThemeToggle from '../common/ThemeToggle';

const Layout = ({ children, section, setSection }) => {
  return (
    <div className="flex">
      <Sidebar section={section} setSection={setSection} />
      <MobileNav section={section} setSection={setSection} />
      
      <main className="flex-1 ml-0 md:ml-60 p-7 pb-20 md:pb-7 overflow-x-hidden max-w-full">
        {children}
      </main>
      
      <ThemeToggle />
    </div>
  );
};

export default Layout;