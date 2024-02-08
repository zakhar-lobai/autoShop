// Login.tsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from "./firebase";
import { Route, useNavigate, } from 'react-router';
import { Link } from 'react-router-dom';
import Account from '../pages/Account';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (values: any) => {
    const { email, password } = values; 

    try {
      await signInWithEmailAndPassword(auth, email, password);

      console.log('Login successful!');
      navigate('/account')
      // You can redirect the user or perform other actions on successful login
    } catch (error) {
      console.error('Login error:');
    }
  };

  return (
    <Formik initialValues={{ email: '', password: '' }} onSubmit={handleLogin}>
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

        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;