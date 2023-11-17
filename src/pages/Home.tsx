import About from "../components/Home/About";
import CarCard from "../components/Home/CarCard";
import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Newsletter from "../components/Home/Newsletter";
import Partners from "../components/Home/Partners";
import Services from "../components/Home/Services";
import SpecialOffers from "../components/Home/SpecialOffers";
import WhyWe from "../components/Home/WhyWe";

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