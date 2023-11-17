import Picture from "../../assets/images/special-offer.png";

const SpecialOffers = () => {
  return (
    <div className="px-0 mt-15 text-white pt-25 pl-15 pr-15 md:pt-70 md:mt-0 md:px-15">
      <div className="xl:w-desk mx-auto mb-15 md:mb-0">
        <h2 className="mb-25 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-45 md:mt-0">
          Special offers
        </h2>
        <div className="flex flex-col gap-20 mb-20 md:flex-row ">
          <div className="bg-box-grey pt-25 pl-20 pb-40 md:pt-50 md:pl-50 md:pb-70 md:w-1/3 ">
            <h3 className="w-full pb-10 text-left text-18 font-bold md:text-25 md:pt-25">
              Free fuel tank
            </h3>
            <div className="w-100 h-4 bg-primary mb-15 md:mb-25"></div>
            <p className=" text-white text-left md:font-normal text-base leading-p-base">
              For rent a minimum of 3 months.
            </p>
          </div>

          <div className="bg-box-grey pt-25 pl-20 pb-40 md:pt-50 md:pl-50 md:pb-70 md:w-1/3 ">
            <h3 className="w-full pb-10 text-left text-18 font-bold md:text-25 md:pt-25">
              2+1 for weekend
            </h3>
            <div className="w-100 h-4 bg-primary mb-15 md:mb-25"></div>
            <p className=" text-white text-left md:font-normal text-base leading-p-base">
              *details from consultants
            </p>
          </div>
        </div>
        <div className="bg-box-grey flex flex-col md:flex-row w-full pt-25 pl-20 pr-20 pb-15 md:pt-50 md:pl-50 md:pb-0">
          <div className="w-full flex flex-col md:w-1/2">
            <h3 className="w-full pb-10 text-left text-18 font-bold md:text-25 md:pt-25">
              Gift cards for rental and services
            </h3>
            <div className="w-100 h-4 bg-primary mb-15 md:mb-25 md:w-190"></div>
            <p className=" text-white text-left md:font-normal text-base leading-p-base">
              The certificate is valid for 1 year. In addition to driving
              premium cars on a day-to-day basis, we also offer VIP transport
              services.
            </p>
            <a href="/contact" className="flex">
              <button className="bg-primary w-full mt-40 mb-10 md:w-40p text-base py-18 md:px-80 ml-left mr-left text-base p-sm font-bold hover:bg-btn-hover hover:text-white duration-300">
                Buy Now
              </button>
            </a>
          </div>
          <div className="w-full md:w-1/2">
            <img
              className="w-full h-auto md:w-85p"
              src={Picture}
              alt="Speciall Offers"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
