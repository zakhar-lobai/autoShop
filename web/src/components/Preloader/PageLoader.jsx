import React, { useState, useEffect } from 'react';
import DotPreloader from './Preloader';

const PageLoader = ({ children }) => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setContentLoaded(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page-loader">
      {!contentLoaded && <DotPreloader />}
      {contentLoaded && children}
    </div>
  );
};

export default PageLoader;
