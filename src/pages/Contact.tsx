import Footer from "../components/Footer";
import Map from "../components/ContactPage/Map";
import GetKnow from "../components/ContactPage/GetKnow";
import Helmet from "../components/Helmet";

function Contact() {
    return (
      <Helmet title="Contact Us">
        <Map />
        <GetKnow />
        <Footer />
      </Helmet>
    );
  }

export default Contact