import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PricesForm from '../CarPage/PricesForm';

interface BookingFormProps {
  images?: string[];
  OneThreeDays?: string;
  FourSixDays?: string;
  SevenThirteenDays?: string;
  FourteenTwentyNineDays?: string;
  Month?: string;
  Insurance?: string;
  Deposit?: string;
  Age?: string;
  License?: string;
  DailyLimit?: string;
  WeeklyLimit?: string;
  TwoWeeksLimit?: string;
  MonthlyLimit?: string;
  AnnualyLimit?: string;
  Service?: string;
  carName?: string;
  ReadMoreOne?: string;
  ReadMoreTwo?: string;
  Booking?: string;
  pageUrl?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  OneThreeDays,
  FourSixDays,
  SevenThirteenDays,
  FourteenTwentyNineDays,
  Month,
  Insurance,
  Deposit,
  Age,
  License,
  DailyLimit,
  WeeklyLimit,
  TwoWeeksLimit,
  MonthlyLimit,
  AnnualyLimit,
  Service,
  carName,
  ReadMoreOne,
  ReadMoreTwo,
  Booking,
  images,
  pageUrl,
}) => {
  const initialValues = {
    firstName: '',
    lastName: '',
    taxNumber: '',
    address: '',
    postalCode: '',
    city: '',
    memberCode: '',
    phoneNumber: '',
    email: '',
    driverLicenseNumber: '',
    idNumber: '',
    personalIdentityNumber: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    taxNumber: Yup.string(),
    address: Yup.string().required('Address is required'),
    postalCode: Yup.string().required('Postal code is required'),
    city: Yup.string().required('City/town is required'),
    memberCode: Yup.string(),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    driverLicenseNumber: Yup.string().required('Driver license number is required'),
    idNumber: Yup.string().required('ID number is required'),
    personalIdentityNumber: Yup.string().required('Personal identity number is required'),
  });

  const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
    // Handle form submission here
    console.log(values);
    resetForm();
  };

  return (
    <div className="px-0 mt-30 text-white pl-15 pr-15 md:mt-[70px] md:px-[30px] lg:px-0">
      <div className="flex flex-col mt-120px xl:w-desk mx-auto mb-15 md:mb-0 text-white md:mt-0">
        <div className="flex flex-col-reverse md:flex-row justify-between xl:w-desk mx-auto mb-[60px] md:mb-[100px] text-white md:mt-0">
          <div className="md:w-1/2">
            <div className="mt-100 px-0 mt-30 text-white md:mt-70 md:px-0">
              <div className="xl:w-desk mt-[50px] mx-auto mb-15 md:mb-0 text-white">
                <h1 className="mb-5 md:mb-15 text-22 md:text-35 text-left font-bold leading-10 md:mt-0">
                  Booking
                </h1>
                <div className="mt-5 w-85px h-4 bg-primary" />
              </div>
            </div>
            <h2 className=" mb-25 text-[18px] md:text-[25px] text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-50px mt-[35px] md:mt-[50px]">
              Renter details
            </h2>
  
            {/* Main Contact Form */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="w-full rounded-none focus:rounded-none">
                  {/* First and Last Name */}
                  <div className="w-full flex flex-col md:flex-row md:mt-[20px] gap-[15px] md:gap-[30px]">
                    {/* First Name */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="firstName" className="pb-[3px] md:pb-[5px]">
                        First Name
                      </label>
                      <Field
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="bg-form-bg h-[40px] pl-[5px] border-none rounded-none focus:border-none focus:rounded-none focus:border-transparent focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* Last Name */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="lastName" className="pb-[3px] md:pb-[5px]">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white focus:rounded-none focus:border-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
                  </div>
  
                  {/* Residence Address and Postal Code */}
                  <div className="w-full flex flex-col md:flex-row mt-[15px] md:mt-[20px] gap-[15px] md:gap-[30px] rounded-none">
                    {/* Residence Address */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="address" className="pb-[3px] md:pb-[5px]">
                        Address of permanent residence
                      </label>
                      <Field
                        type="text"
                        id="address"
                        name="address"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white focus:bg-base mb-[3px] rounded-none"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* Postal Code */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="postalCode" className="pb-[5px]">
                        Postal Code
                      </label>
                      <Field
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white  focus:bg-base mb-[3px] rounded-none"
                      />
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
                  </div>
  
                  {/* City/Town and Member Code */}
                  <div className="w-full flex flex-col md:flex-row mt-[15px] md:mt-[20px] gap-[15px] md:gap-[30px]">
                    {/* City/Town */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="city" className="pb-[3px] md:pb-[5px]">
                        City/Town
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* Member Code */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="memberCode" className="pb-[5px]">
                        Membership Code
                      </label>
                      <Field
                        type="text"
                        id="memberCode"
                        name="memberCode"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="memberCode"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
                  </div>
  
                  {/* Phone Number and Email */}
                  <div className="w-full flex flex-col md:flex-row mt-[15px] md:mt-[20px] gap-[15px] md:gap-[30px]">
                    {/* Phone Number */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label
                        htmlFor="phoneNumber"
                        className="pb-[3px] md:pb-[5px]"
                      >
                        Phone Number
                      </label>
                      <Field
                        type="phone"
                        id="phoneNumber"
                        name="phoneNumber"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* Email */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="email" className="pb-[5px]">
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
                  </div>
  
                  {/* Driver License and ID Number */}
                  <div className="w-full flex flex-col md:flex-row mt-[15px] md:mt-[20px] gap-[15px] md:gap-[30px]">
                    {/* Driver License */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label
                        htmlFor="driverLicenseNumber"
                        className="pb-[3px] md:pb-[5px]"
                      >
                        Driver License
                      </label>
                      <Field
                        type="text"
                        id="driverLicenseNumber"
                        name="driverLicenseNumber"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="driverLicenseNumber"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* ID Number */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="idNumber" className="pb-[5px]">
                        ID Number
                      </label>
                      <Field
                        type="text"
                        id="idNumber"
                        name="idNumber"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="idNumber"
                        component="div"
                        className="text-[12px] text-primary error"
                      />
                    </div>
                  </div>
  
                  {/* Tax Number and Personal Identity Number */}
                  <div className="w-full flex flex-col md:flex-row mt-[15px] md:mt-[20px] gap-[15px] md:gap-[30px]">
                    {/* Tax Number */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label htmlFor="taxNumber" className="pb-[3px] md:pb-[5px]">
                        Driver License
                      </label>
                      <Field
                        type="text"
                        id="taxNumber"
                        name="taxNumber"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="taxNumber"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
  
                    {/* Personal Identity Number */}
                    <div className="md:w-1/2 flex flex-col text-left">
                      <label
                        htmlFor="personalIdentityNumber"
                        className="pb-[5px]"
                      >
                        Personal Identity Number
                      </label>
                      <Field
                        type="number"
                        id="personalIdentityNumber"
                        name="personalIdentityNumber"
                        className="bg-form-bg h-[40px] pl-[5px] focus:border-[1px] focus:border-white rounded-none focus:bg-base mb-[3px]"
                      />
                      <ErrorMessage
                        name="personalIdentityNumber"
                        component="div"
                        className="text-[12px] text-primary error "
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="submit"
                      className="bg-yellow w-full md:w-1/3 color-base mt-[30px] py-[15px] inline-block transition duration-300 ease-in-out hover:bg-btn-hover hover:border-yellow hover:color-base"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
  
          {/* Right Section - Pricing */}
          <div className="md:w-1/3 md:float-right md:pt-[200px] w-full md:ml-[30px]">
            <img
              src={images && images[0]}
              alt={carName}
              className="w-full h-auto rounded-b-[5px]"
            />
            <form action="post" className="w-full bg-box-grey">
              <PricesForm
                carName={carName}
                Booking={Booking}
                Deposit={Deposit}
                OneThreeDays={OneThreeDays}
                FourSixDays={FourSixDays}
                SevenThirteenDays={SevenThirteenDays}
                FourteenTwentyNineDays={FourteenTwentyNineDays}
                Month={Month}
                DailyLimit={DailyLimit}
                WeeklyLimit={WeeklyLimit}
                TwoWeeksLimit={TwoWeeksLimit}
                MonthlyLimit={MonthlyLimit}
                pageUrl={pageUrl}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
