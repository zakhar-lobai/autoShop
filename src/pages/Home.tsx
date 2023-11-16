import About from "../components/About";
import CarCard from "../components/CarCard";
import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Partners from "../components/Partners";
import Services from "../components/Services";
import SpecialOffers from "../components/SpecialOffers";
import WhyWe from "../components/WhyWe";

function Home() {
    return (
        <>
            
            <Services />
            <CarCard />
            <WhyWe />
            <SpecialOffers />
            <Newsletter />
            <Partners />
            <About />
            <Footer />
        </>
    );
}

export default Home;