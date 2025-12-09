import React, { ReactNode, useEffect } from "react";

interface HelmetProps {
  title: string;
  children: ReactNode;
}

const Helmet: React.FC<HelmetProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = "Rent Car Service - " + title;
    // Optionally return a cleanup function if needed
    return () => {
      document.title = "Rent Car Service - BlackCars"; // Reset the title on unmount
    };
  }, [title]);

  return <div>{children}</div>;
};

export default Helmet;
