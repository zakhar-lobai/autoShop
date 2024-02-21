import React from 'react'
import Helmet from '../components/Helmet'
import CommonSection from '../components/UI/CommonSection'
import Img from "../assets/images/limo-service.jpg"
import ContactSection from '../components/SpecialOffer/ContactSection'

const Limo = () => {
  return (
    <Helmet title='Limo Services'>
        <div className="mt-120 px-0 mt-30 text-white pl-15 pr-15 md:mt-70 md:px-15">
            <div className="xl:w-desk mt-[120px] md:mt-[150px] mx-auto mb-15 md:mb-0 text-white">
                <CommonSection title='Limo & driver rental'/>
                <div className='flex flex-col-reverse md:flex-row text-left'>
                    <div className='md:w-1/2 md:pr-[20px]'>
                        <p className='text-white text-left mt-20 md:font-base text-base leading-p-base mb-30'><b>Renting a car with a driver</b> is an effective way to increase your prestige and image, while traveling in a comfortable and elegant premium car makes travel a real pleasure. Instead of focusing on driving a car and stressing in the traffic jams of a crowded city, delegate this task to our professional driver and prepare yourself for an important meeting or conference in calm and peace in the back seat.</p>
                        <p className='text-white text-left mt-20 md:font-base text-base leading-p-base mb-30'>Our experienced drivers put a lot of commitment and effort into the tasks entrusted to them. They can take the right attitude during important meetings, events, or conferences. Furthermore, they are characterized by a very good appearance and high personal culture to also support you in terms of image. We put the needs of our customers first, which is why our offer is extremely flexible and tailored to individual needs.</p>
                    </div>
                    <div className='nd:w-1/2'>
                        <img src={Img} alt="Limo & driver rental" />
                    </div>
                </div>
                <p className='text-white text-left mt-20 md:font-base text-base leading-p-base mb-30'>We are aware that entrepreneurs want to travel efficiently from place to place and deal with important business or private matters in a calm and pleasant atmosphere. This is exactly what we are trying to guarantee our customers and the main reason why many come back to us and re-establish cooperation with us. We have luxury cars with unusual appearance and rich equipment. Among the brands that our car rental company has is BMW and Mercedes-Benz.</p>
                <p className='text-white text-left mt-20 md:font-base text-base leading-p-base mb-30'>If you need custom transportation, please contact our BlackCars rental company and we will do everything to make the transportation fully professional. Choosing our company, you get guarantees of the best cars and drivers at extremely competitive prices. If you decide to rent a limousine with a driver in our company, you can be sure that the trip will be organized professionally and it will go calmly, without any problems. We invite you to familiarize yourself with our offer.</p>
            
                <ContactSection />
            </div>
        </div>
    </Helmet>
  )
}

export default Limo