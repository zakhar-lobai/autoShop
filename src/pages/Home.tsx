import About from "../components/Home/About";
import CarCard from "../components/Home/CarCard/CarCard";
import Footer from "../components/Footer";
import Newsletter from "../components/Home/Newsletter";
import Partners from "../components/Home/Partners/Partners";
import Services from "../components/Home/Services";
import SpecialOffers from "../components/Home/SpecialOffers";
import WhyWe from "../components/Home/WhyWe";
import ImageSlider from "../components/Home/ImageSlider";

function Home() {
    return (
        <>
            <ImageSlider />
            <WhyWe />
            <CarCard />
            <Services />
            <SpecialOffers />
            <Newsletter />
            <Partners />
            <About />
            <Footer />
        </>
    );
}

export default Home;