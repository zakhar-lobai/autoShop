import React from "react";
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
  firstName: string;
  phoneNumber: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  return (
    <div className="px-0 text-white pl-15 pr-15 md:pt-72px md:px-15">
      <div className="xl:w-desk mx-auto mb-15 md:mb-0">
        <h2 className="md:mb-15 text-22 md:text-35 text-center font-bold leading-10">
          Write us
        </h2>
        <div className="w-85px h-4 bg-primary mx-auto"></div>
        <h4 className="text-18 mt-10 font-semi mb-40">
          Or call us{" "}
          <a href="tel:+1777777" className="text-yellow">
            +48 720 889 788
          </a>
        </h4>

        {/* Contact Form */}
        <Formik initialValues={{ firstName: '', phoneNumber: '', email: '', message: '',}}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form className="flex flex-col w-full mb-50px md:mb-100">
          <div className="flex flex-col md:flex-row md:mb-20">
            {/* First Name */}
            <Field className="bg-box-grey w-full mb-15 md:w-1/3 md:mb-0 md:mr-20 px-10 py-15" id="firstName" name="firstName" placeholder="Your Name" />

            {/* Phone Number */}
            <Field className="bg-box-grey w-full mb-15 md:w-1/3 md:mb-0 md:mr-20 px-10 py-15" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" />

            {/* Email */}
            <Field className="bg-box-grey w-full mb-15 md:w-1/3 md:mb-0 px-10 py-15" id="email" name="email" placeholder="Email" type="email" />
          </div>

          {/* Message */}
          <textarea className="bg-box-grey w-full mb-15 md:mr-15 mb-30 px-10 py-15"
            id="message"
            name="message"
            placeholder="Enter your message"
            rows={5}
          />

          <button className="bg-primary md:mx-auto font-bold w-full md:w-200px h-50px text-base py-18 md:py-1 ml-left mr-left text-base p-sm  hover:bg-btn-hover hover:text-white duration-300" type="submit">Submit</button>
          
        </Form>
      </Formik>

      </div>
    </div>
  );
};

export default ContactSection;
