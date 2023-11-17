const OfferSection = () => {
    return (
      <div className="mt-100 pt-30 px-0 text-white pl-15 pr-15 md:pt-72px md:px-15">
        <div className="xl:w-desk mx-auto mb-15 md:mb-0">
          <h2 className="mb-15 text-22 md:text-35 text-left font-bold leading-10">
            Contact details
          </h2>
          <div className="w-85px h-4 bg-primary"></div>
  
          <div className="bg-box-grey p-30 mt-30">
            <h3 className="w-full text-left text-18 font-bold md:text-25 md:pb-10">
              Airport transfers
            </h3>
            <div className="w-125 h-4 bg-primary"></div>
            <p className="mt-15 text-white text-left text-base leading-p-base">
              Wynajmij dowolne auto z naszej floty na okres dłuższy niż 3 miesiące
              i otrzymaj zbiornik paliwa gratis! To nie żart! Nie musisz martwić
              się o koszty paliwa, które rosną z dnia na dzień. My pokryjemy Twoje
              pierwsze tankowanie za Ciebie! Wybierz spośród szerokiej gamy modeli
              i marek luksusowych i komfortowych samochodów. Wszystkie nasze
              samochody są nowe, zadbane i wyposażone w najnowsze technologie.
              <b>
                {" "}
                Nie zwlekaj! Skorzystaj z naszej promocji i ciesz się swobodą
                jazdy bez dodatkowych kosztów!
              </b>
            </p>
          </div>
  
          <div className="bg-box-grey mb-70 p-30 mt-30">
            <h3 className="w-full text-left text-18 font-bold md:text-25 md:pb-10">
              2+1 for weekend
            </h3>
            <div className="w-125 h-4 bg-primary"></div>
            <p className="mt-15 text-white text-left font-bold text-base leading-p-base">
              Rent a car on Friday until 6 pm, return it on Monday by noon and pay
              for two days!
            </p>
            <p className="mt-15 text-white text-left text-small leading-p-base">
              <span className="italic">
                *offer for selected car models, details from consultants
              </span>
              <br></br>
              List of cars available in the promotion:<br></br>
              BMW 5 Series<br></br>
              BMW X4<br></br>
              Mercedes-Benz C-class<br></br>
              Mercedes-Benz E-class<br></br>
              Mercedes-Benz GLC
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default OfferSection;
  