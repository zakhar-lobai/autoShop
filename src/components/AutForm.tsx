import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPhoneNumber } from './firebase'; // Importing from firebase.tsx
import { useNavigate } from 'react-router-dom';

const AuthForm: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  const switchForm = () => {
    setIsLoginForm((prev) => !prev);
  };

  const handleAuth = async (values: any) => {
    const { email, password, fullname } = values;

    try {
      if (isLoginForm) {
        await signInWithEmailAndPassword(email, password);
        console.log('Login successful!');
      } else {
        await createUserWithEmailAndPassword(email, password);
        console.log('Sign-up successful!');
      }

      // Redirect to the desired page after successful authentication
      navigate('/dashboard'); // Change '/dashboard' to the desired route
    } catch (error) {
      console.error(`${isLoginForm ? 'Login' : 'Sign-up'} error:`, error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleAuthProvider();
      console.log('Google Sign-in successful!');
      navigate('/dashboard'); // Change '/dashboard' to the desired route
    } catch (error) {
      console.error('Google Sign-in error:', error);
    }
  };

  const handlePhoneSignIn = async (values: any) => {
    const { phone } = values;
    try {
      await signInWithPhoneNumber(phone);
      console.log('Phone Sign-in successful!');
      navigate('/dashboard'); // Change '/dashboard' to the desired route
    } catch (error) {
      console.error('Phone Sign-in error:', error);
    }
  };

  return (
    <div className="container">
      <div className="backbox">
        <div className={`loginMsg ${isLoginForm ? '' : 'visibility'}`}>
          <div className="textcontent">
            <p className="title">Don't have an account?</p>
            <p>Sign up to save all your graph.</p>
            <button onClick={switchForm} id="switch1">
              Sign Up
            </button>
          </div>
        </div>
        <div className={`signupMsg ${isLoginForm ? 'visibility' : ''}`}>
          <div className="textcontent">
            <p className="title">Have an account?</p>
            <p>Log in to see all your collection.</p>
            <button onClick={switchForm} id="switch2">
              LOG IN
            </button>
          </div>
        </div>
      </div>

      <div className="frontbox">
        <Formik initialValues={{ email: '', password: '', fullname: '', phone: '' }} onSubmit={handleAuth}>
          <Form className={`login ${isLoginForm ? '' : 'hide'}`}>
            <h2>LOG IN</h2>
            <div className="inputbox">
              <Field type="text" name="email" placeholder="  EMAIL" />
              <Field type="password" name="password" placeholder="  PASSWORD" />
            </div>
            <p>FORGET PASSWORD?</p>
            <button type="submit">LOG IN</button>
          </Form>
        </Formik>

        <Formik initialValues={{ email: '', password: '', fullname: '', phone: '' }} onSubmit={handleAuth}>
          <Form className={`signup ${isLoginForm ? 'hide' : ''}`}>
            <h2>SIGN UP</h2>
            <div className="inputbox">
              <Field type="text" name="fullname" placeholder="  FULLNAME" />
              <Field type="text" name="email" placeholder="  EMAIL" />
              <Field type="password" name="password" placeholder="  PASSWORD" />
            </div>
            <button type="submit">SIGN UP</button>
          </Form>
        </Formik>

        <Formik initialValues={{ email: '', password: '', fullname: '', phone: '' }} onSubmit={handlePhoneSignIn}>
          <Form className={`signup ${isLoginForm ? 'hide' : ''}`}>
            <h2>SIGN UP</h2>
            <div className="inputbox">
              <Field type="text" name="phone" placeholder="  PHONE NUMBER" />
            </div>
            <button type="submit">SIGN UP WITH PHONE</button>
          </Form>
        </Formik>

        <button type="button" onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;