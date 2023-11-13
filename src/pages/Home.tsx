import Footer from "../components/Footer";
import Header from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Partners from "../components/Partners";
import Services from "../components/Services";
import SpecialOffers from "../components/SpecialOffers";

function Home() {
    return (
        <>
            
            <Services />
            <SpecialOffers />
            <Newsletter />
            <Partners />
            <Footer />
        </>
    );
}

export default Home;