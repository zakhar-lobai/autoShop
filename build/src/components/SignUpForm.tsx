import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createUserWithEmailAndPassword } from '@firebase/auth'; // Importing from firebase.tsx
import { auth } from './firebase'; // Importing from firebase.tsx
import { useNavigate } from 'react-router-dom';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = async (values: any) => {
    const { email, password } = values;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Sign-up successful!');
      // Redirect to the desired page after successful sign-up
      navigate('/account'); // Change '/dashboard' to the desired route
    } catch (error) {
      console.error('Sign-up error:');
    }
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSignUp}>
      <Form>
        <div className='mt-100'>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  );
};

export default SignUpForm;