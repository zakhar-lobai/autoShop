import React from 'react'
import Footer from '../components/Footer'
import OfferSection from '../components/SpecialOffer/OfferSection'
import ContactSection from '../components/SpecialOffer/ContactSection'
import Helmet from '../components/Helmet'

const SpecialOffer = () => {
  return (
    <>
      <Helmet title='Special Offers'>
        <OfferSection />
        <ContactSection />
        <Footer />
      </Helmet>
    </>
  )
}

export default SpecialOffer