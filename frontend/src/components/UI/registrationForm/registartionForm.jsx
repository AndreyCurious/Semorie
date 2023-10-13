import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import jwt_decode from 'jwt-decode'
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/index.js';
import routes from '../../../routes.js';
import { $host } from '../../../http/index.js';

const RegistrationForm = () => {
  const [signUser, setSignUser] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      setSignUser(false);
      try {
        const response = await $host.post(routes.axiosSignup(), { email, password, role: 'ADMIN' });
        const decodeUser = jwt_decode(response.data.token);
        auth.login(response.data, decodeUser);
        return navigate(routes.shop());
      } catch (e) {
        console.log(e)
				setSignUser(true); 
				if (e.response.status === 404) {
          setErrorMessage(e.response.data.message);
        } else {
          setErrorMessage(t('signUpForm.err.network'));
        }
      }
      return null;
    },
    validationSchema: yup.object({
      password: yup.string().min(6, t('signUpForm.err.min')).max(20, t('signUpForm.err.max')),
      email: yup.string().email(t('signUpForm.err.email')),
      confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUpForm.err.samePass')),
    }),
  });
  useEffect(() => {

  }, [errorMessage])
  return (
    <Form onSubmit={formik.handleSubmit} className="col-md-10">
      <h1 className="text-center pb-2">{t('signUpForm.registration')}</h1>
      <Form.Group className="mb-4 position-relative form-floating">
        <Form.Control
          placeholder={t('signUpForm.email')}
          onBlur={formik.handleBlur}
          id="email"
          disabled={formik.isSubmitting}
          required
          autoComplete="email"
          onChange={formik.handleChange}
          name="email"
          value={formik.email}
          isInvalid={!!formik.errors.email && formik.touched.email}
        />
        <label htmlFor="email">{t('signUpForm.email')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-4 position-relative form-floating">
        <Form.Control
          type="password"
          onBlur={formik.handleBlur}
          id="password"
          placeholder={t('signUpForm.password')}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="password"
          value={formik.password}
          isInvalid={!!formik.errors.password && formik.touched.password}
        />
        <label htmlFor="password">{t('signUpForm.password')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className=" position-relative form-floating">
        <Form.Control
          type="password"
          onBlur={formik.handleBlur}
          id="confirmPassword"
          placeholder={t('signUpForm.confirmPassword')}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="confirmPassword"
          value={formik.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
        />
        <label htmlFor="confirmPassword">{t('signUpForm.confirmPassword')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      {signUser
        ? <h6 className="text-danger text-center m-3" title=""><strong>{errorMessage}</strong></h6>
        : <div className="p-4"/>}
      <div>
        <Button variant="" className="mb-3 w-100 btn-lg border" type="submit">{t('signUpForm.submit')}</Button>
      </div>
    </Form>
  );
};

export default RegistrationForm;
