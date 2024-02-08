import ImageCarousel from "./ImageCarousel";

const Partners = () => {
  return (
    <div className="px-0 mt-50px text-white pl-15 pr-15 md:mt-0 md:px-15">
      <div className="xl:w-desk mx-auto mb-15 md:mb-0">
        <h2 className="mb-25 text-22 md:text-35 text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-50px md:mt-0">
          Our Partners
        </h2>
        <ImageCarousel />
      </div>
    </div>
  );
};

export default Partners;
