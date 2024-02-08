import Footer from "../components/Footer";
import Partners from "../components/Home/Partners/Partners";
import ImageSlider from "../components/RentalWithDriver/ImageSlider";
import ContactSection from "../components/SpecialOffer/ContactSection";
import CommonSection from "../components/UI/CommonSection";
import OurDrivers from "../components/RentalWithDriver/OurDrivers";
import OurServices from "../components/RentalWithDriver/OurServices";

function RentalWithDriver() {
    return (
        <>
            <ImageSlider />
            <OurServices />
            
            <OurDrivers />
            <Partners />
            <ContactSection />
            <Footer />
        </>
    )
}

export default RentalWithDriver;