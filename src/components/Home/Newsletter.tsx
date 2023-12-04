import Image from "../../assets/images/newsletter.png";
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
  email: string;
}

const Newsletter = () => {
  return (
    <div className="px-0 text-white pl-15 pr-15 md:mt-38 md:px-15">
      <div className="xl:w-desk mx-auto mb-15 mt-50px flex flex-col md:flex-row bg-box-grey md:mb-100 md:mt-0">

        {/* Image Section */}
        <div className="md:w-41 px-0">
          <img className="h-full object-cover" src={Image} alt="" />
        </div>

        {/* Email Section */}
        <div className="bg-box-grey flex flex-col w-full pt-15 pl-20 pr-20 pb-30 md:w-58p md:pt-50 md:pl-50 md:pb-50">
          <h3 className="w-full pb-10 text-left text-25 font-bold md:pl-25 md:pt-25">
            Sign up for our newsletter for a 10% discount
          </h3>
          <div className="w-190 h-4 bg-primary mb-20 md:mb-25 md:ml-25"></div>

          {/* Contact Form */}
          <div className="flex w-full md:pl-25 md:pb-25">

            {/* Email Form */}
            <Formik initialValues={{ email: '', }}
              onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
              ) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 500);
              }}>
              <Form className="w-full flex  flex-col md:flex-row">
                <Field id="email" name="email" placeholder="john@acme.com" type="email" className="bg-form-bg w-full mb-15 md:w-45p md:mr-15 md:mb-0 px-10 py-15"/>
                <button type="submit" className="bg-primary font-bold w-full md:w-34p text-base py-18  ml-left mr-left text-base p-sm  hover:bg-btn-hover hover:text-white duration-300">Subscribe</button>
              </Form>
            </Formik>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Newsletter;
