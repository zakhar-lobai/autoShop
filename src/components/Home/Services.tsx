import Airtransfer from "../../assets/images/airport-transfer.jpg";
import Minibus from "../../assets/images/minibus.jpg";
import Limo from "../../assets/images/limo.jpg";
import Wedding from "../../assets/images/wedding-car.jpg";

const Services = () => {
  return (
    <div className="px-0 mt-100 text-white pt-25 pl-15 pr-15 md:pt-30 md:px-15">
      <div className="xl:w-desk mx-auto">
        <h2 className="mb-30 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-20 md:mt-0">
          Our services
        </h2>
        <p className=" hidden md:block text-white text-left md:font-medium text-base leading-p-base md:w-50 md:mb-20">
          In addition to driving premium cars on a day-to-day basis, we also
          offer VIP transport services. Our aim is to make sure that a ride in
          top-segment cars is associated both with luxury and comfort. That is
          why we will gladly adapt our offer to your needs – give us a try!
        </p>
        
        <div className="">
        {/* Airport transfers */}
          <div className="w-full flex mb-45 md:mb-0">
            <a
              href="/airport-transfer"
              className="w-full flex flex-col md:flex-row"
            >
              <div className="w-full md:w-50">
                <img
                  className="w-full h-auto mb-15 md:mb-0"
                  src={Airtransfer}
                  alt="Airport transfers"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-50 md:pl-30 md:pt-9">
                <h3 className="w-full text-left text-18 font-bold md:text-25 md:pb-10">
                  Airport transfers
                </h3>
                <div className="w-125 h-4 bg-primary"></div>
              </div>
            </a>
          </div>
        {/* Minibus rental */}
          <div className="w-full flex mb-45 md:mb-0">
            <a
              href="/premium-minibus-rental"
              className="w-full flex flex-col-reverse md:flex-row"
            >
              <div className="w-full md:w-50  md:pt-9">
                <h3 className="w-full text-left text-18 font-bold md:text-25 md:pb-10">
                  Premium minibus & driver rental
                </h3>
                <div className="w-125 h-4 bg-primary"></div>
              </div>
              <div className="md:w-50">
                <img
                  className="w-full h-auto mb-15 md:mb-0"
                  src={Minibus}
                  alt="Premium minibus & driver rental"
                />
              </div>
            </a>
          </div>
        {/* Limo rental */}
          <div className="w-full flex mb-45 md:mb-0">
            <a
              href="/limousine-rental-with-driver"
              className="w-full flex flex-col md:flex-row"
            >
              <div className="md:w-50">
                <img
                  className="w-full h-auto mb-15 md:mb-0"
                  src={Limo}
                  alt="Limo & driver rental"
                />
              </div>
              <div className="w-full md:w-50 md:pl-30 md:pt-9">
                <h3 className="w-full text-left text-18 font-bold md:text-25 md:pb-10">
                  Limo & driver rental
                </h3>
                <div className="w-125 h-4 bg-primary"></div>
              </div>
            </a>
          </div>
        {/* Wedding rental */}
          <div className="w-full flex mb-25 md:mb-0">
            <a
              href="/wedding-cars"
              className="w-full flex flex-col-reverse md:flex-row"
            >
              <div className="w-full md:w-50 md:pt-9">
                <h3 className="w-full text-left text-18 font-bold md:text-25  md:pb-10">
                  Wedding car rental
                </h3>
                <div className="w-125 h-4 bg-primary"></div>
              </div>
              <div className="md:w-50">
                <img
                  className="w-full h-auto mb-15 md:mb-0"
                  src={Wedding}
                  alt="Wedding car rental"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
