import React from "react";

interface CommonSectionProps {
  title: string;
}

const CommonSection: React.FC<CommonSectionProps> = ({ title }) => {
  return (
    <div className="mt-100 px-0 mt-30 text-white  md:mt-70 md:px-0">
      <div className="xl:w-desk mt-120px mx-auto mb-15 md:mb-0 text-white">
        <h1 className="mb-5 md:mb-15 text-22 md:text-35 text-left font-bold leading-10 md:mt-0">
          {title}
        </h1>
        <div className="mt-5 w-85px h-4 bg-primary" />
      </div>
    </div>
  );
};

export default CommonSection;
