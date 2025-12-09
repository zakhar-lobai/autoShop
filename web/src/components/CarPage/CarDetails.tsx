import React from 'react';

interface CarDetailsProps {
  Year?: number;
  Transmission?: string;
  Fuel?: string;
  Features?: string[]; 
  Description?: string;
  'Description-more'?: string;
  Engine?: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ Year, Transmission, Engine, Fuel, Features, Description, 'Description-more': DescriptionMore }) => {
  return (
    <div className="md:w-1/2 text-left">
      {/* Features */}
      <div className="flex flex-row flex-wrap mt-20 gap-15 mb-[25px] md:mt-[30px] md:mr-[20px] md:mb-[5%] gap-10 bg-box-grey px-[10px] py-[20px]">
        <p className="pl-12 md:pl-10 md:pr-5 border-l-4 border-yellow">{Year}</p>
        <p className="pl-12 md:pl-10 md:pr-5 border-l-4 border-yellow">{Transmission}</p>
        <p className="pl-12 md:pl-10 md:pr-5 border-l-4 border-yellow">{Engine}</p>
        <p className="pl-12 md:pl-10 md:pr-5 border-l-4 border-yellow">{Fuel}</p>

        {Features && Features.map((feature, index) => (
          <p key={index} className="pl-12 md:pl-10 md:pr-5 border-l-4 border-yellow">
            {feature}
          </p>
        ))}
      </div>

      {/* Info */}
      <div>
        <p className='text-[14px] leading-[27px] md:pr-[10px] md:mb-[5%]'>{Description}</p>
        <p className='text-[14px] leading-[27px] mb-[30px] md:pr-[10px] md:mb-[5%]'>{DescriptionMore}</p>
      </div>
      <a href="#more" className='float-right md:mr-[20px] font-bold hover:text-yellow hover:duration-300'>Read More</a>
    </div>
  );
};

export default CarDetails;
