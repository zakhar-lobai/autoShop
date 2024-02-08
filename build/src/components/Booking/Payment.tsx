import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';

interface CardFormProps {
    cardNumber?: number;
    month?: number;
    year?: number;
    cvv?: number;
    message?: string[];
    terms?: string;
    transaction?: string;
}

const Payment: React.FC<CardFormProps> = ({
    cardNumber,
    month,
    year,
    cvv,
    message,
    terms,
    transaction
}) => {
    const initialValues = {
        cardNumber: '',
        month: '',
        year: '',
        cvv: '',
        message: '',
        terms: '',
        transaction: '',
        checkbox1: false, // Set initial values for checkboxes
        checkbox2: false // Set initial values for checkboxes
    };

    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string().required('Card Number is required'),
        month: Yup.string().required('Month is required'),
        year: Yup.string().required('Year is required'),
        cvv: Yup.string().required('CVV is required'),
        message: Yup.string().required('Please accept terms-and-conditions and privacy policy'),
        transaction: Yup.string().required('Please agree with card transaction'),
        checkbox1: Yup.boolean().oneOf([true], 'Checkbox 1 is required').required('Checkbox 1 is required'),
        checkbox2: Yup.boolean().oneOf([true], 'Checkbox 2 is required').required('Checkbox 2 is required')
    });

    const handleSubmit = (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
        // Handle form submission here
        console.log(values);
        resetForm();
    };

    const [activeOption, setActiveOption] = useState('option1');

    const handleClick = (option: string) => {
        setActiveOption(option);
    };

    const allCheckboxesSelected = (errors: FormikErrors<typeof initialValues>, touched: FormikTouched<typeof initialValues>) => {
        return !errors.checkbox1 && touched.checkbox1 && !errors.checkbox2 && touched.checkbox2;
    };

    return (
        <div>
            <h2 className=" mb-25 text-[18px] md:text-[25px] text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-50px mt-[35px] md:mt-[80px]">
                Payment
            </h2>
            <div>
                <div className='w-1/2 flex md:flex-row gap-[20px]'>
                    <div
                        onClick={() => handleClick('option1')}
                        className={`${activeOption === 'option1' ? 'text-left bg-base border-[1px] border-white' : 'bg-form-bg'} flex items-center pointer md:w-1/2  md:px-[20px] py-[10px] md:mb-[20px]`}>
                        Pay by Card - Low Deposit
                    </div>
                    <div
                        onClick={() => handleClick('option2')}
                        className={`${activeOption === 'option2' ? 'text-left bg-base border-[1px] border-white' : 'bg-form-bg'} flex items-center pointer md:w-1/2  md:px-[20px] py-[10px] md:mb-[20px]`}
                    >
                        Pay upon delivery
                    </div>
                </div>

                {/* Content for Option 1 */}
                {activeOption === 'option1' && (
                    <div className='md:w-1/2 flex flex-col gap-[20px]'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form className='w-2/3 flex flex-col md:pr-[10px]'>

                                    {/* Card Number */}
                                    <div className='md:w-full flex flex-col text-left'>
                                        <label htmlFor="cardNumber" className='pb-[5px]'>Card Number</label>
                                        <Field type="text" id="cardNumber" name="cardNumber" className="bg-form-bg h-[35px] pl-[5px] focus:border-[1px] focus:border-white focus:rounded-[1px] focus:bg-base mb-[3px]" autoComplete="off" />
                                        <ErrorMessage name="cardNumber" component="div" className="text-[12px] text-primary error" />
                                    </div>

                                    {/* Expire Date */}
                                    <div className='md:w-full flex flex-col md:flex-row text-left md:mt-[15px]'>
                                        <div className='w-1/2 flex flex-col text-left pr-[10px]'>
                                            <label htmlFor="month" className='pb-[5px]'>Month</label>
                                            <Field type="text" id="month" name="month" className="bg-form-bg h-[35px] pl-[5px] focus:border-[1px] focus:border-white focus:rounded-[1px] focus:bg-base mb-[3px]" autoComplete="off" />
                                            <ErrorMessage name="month" component="div" className="text-[12px] text-primary error " />
                                        </div>
                                        <div className='w-1/2 flex flex-col text-left pl-[10px]'>
                                            <label htmlFor="year" className='pb-[5px]'>Year</label>
                                            <Field type="text" id="year" name="year" className="bg-form-bg h-[35px] pl-[5px] focus:border-[1px] focus:border-white focus:rounded-[1px] focus:bg-base mb-[3px]" autoComplete="off" />
                                            <ErrorMessage name="year" component="div" className="text-[12px] text-primary error " />
                                        </div>
                                    </div>

                                    {/* CVV */}
                                    <div className='w-1/3 flex flex-col text-left'>
                                        <label htmlFor="cvv" className='pb-[5px]'>CVV</label>
                                        <Field type="text" id="cvv" name="cvv" className="bg-form-bg h-[35px] pl-[5px] focus:border-[1px] focus:border-white focus:rounded-[1px] focus:bg-base mb-[3px]" autoComplete="off" />
                                        <ErrorMessage name="cvv" component="div" className="text-[12px] text-primary error " />
                                    </div>
                                    <p className='text-[14px] font-semi text-left mt-[10px]'>Safe payments</p>

                                    <h2 className="mb-25 text-[18px] md:text-[25px] text-left font-bold leading-10 pl-10 border-l-4 border-yellow md:mb-20px mt-[35px] md:mt-[40px]">
                                        Leave a message
                                    </h2>

                                    <div className='w-full flex flex-col text-left'>
                                        <Field as="textarea"
                                            id="message"
                                            name="message"
                                            rows={2}
                                            cols={30}
                                            className="bg-form-bg py-[5px] px-[10px] focus:border-[1px] focus:border-white focus:rounded-[1px] focus:bg-base mb-[3px]" />
                                        <ErrorMessage name="message" component="div" className="text-[12px] text-primary error " />
                                    </div>

                                    <div className="mt-[20px]">
                                        <label htmlFor="checkbox1">Checkbox 1</label>
                                        <Field type="checkbox" id="checkbox1" name="checkbox1" />
                                    </div>
                                    <div className="mt-[20px]">
                                        <label htmlFor="checkbox2">Checkbox 2</label>
                                        <Field type="checkbox" id="checkbox2" name="checkbox2" />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`bg-yellow md:w-1/3 color-base mt-[30px] py-[10px] inline-block transition duration-300 ease-in-out ${
                                            !allCheckboxesSelected(errors, touched)
                                                ? ''
                                                : 'hover:bg-btn-hover hover:border-yellow hover:color-base'
                                            }`}
                                        disabled={!allCheckboxesSelected(errors, touched)}
                                    >
                                        Book
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payment;
