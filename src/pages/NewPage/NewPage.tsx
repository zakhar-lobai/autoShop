import Header from '../Header/Header';
import Button from '../../components/Button/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useToggle from '../../hooks/useToggle';

const NewPage: React.FC = () => {
  const [isTextVisible, toggleText] = useToggle();

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email format').required('Required'),
      password: yup.string().required('Required')
    }),
    onSubmit: values => {
      console.log('Form data', values);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto mt-12 p-6 bg-white rounded shadow-md">
        <h1 className="text-3xl mb-4 font-semibold text-indigo-600">Welcome to the New Page</h1>
        
        <Button label={isTextVisible ? 'Hide Text' : 'Show Text'} onClick={toggleText} />
        
        {isTextVisible && (
          <p className="text-lg mt-6 text-gray-700">
            Surprise! Here's the hidden text you've revealed.
          </p>
        )}

        <p className="text-lg my-6 text-gray-700">
          Lorem ipsum dolor sit 
        </p>
        
        <div className="my-6 border-t border-gray-200"></div>
        
        <h2 className="text-2xl mb-4 font-semibold text-green-500">Discover More</h2>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4 flex justify-center flex-col m-auto w-max">
          <div className="flex flex-col w-72">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-700">Email Address</label>
            <input 
              className="border rounded py-2 px-3 focus:border-indigo-500"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 mt-1">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="flex flex-col w-72">
            <label htmlFor="password" className="mb-2 font-semibold text-gray-700">Password</label>
            <input 
              className="border rounded py-2 px-3 focus:border-indigo-500"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 mt-1">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPage;
