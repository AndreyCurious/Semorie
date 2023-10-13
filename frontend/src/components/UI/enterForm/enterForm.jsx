import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/index.js';
import routes from '../../../routes.js';
import { useState } from 'react';
import { $host } from '../../../http/index.js';
import jwt_decode from 'jwt-decode';

const btnClass = `mb-3 w-100 btn-lg border`;

const EnterForm = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setUserAuth(false);
      try {
        const response = await $host.post(routes.axiosLogin(), values);
        const decodeUser = jwt_decode(response.data)
        auth.login(response.data, decodeUser);
        return navigate(routes.shop());
      } catch (e) {
        setUserAuth(true);
        if (e.response.status === 500) {
          setErrorMessage(e.response.data.message);
        } else {
          setErrorMessage(t('enterForm.err.network'));
        }
      }
      return null;
    },
    validationSchema: yup.object({
      password: yup.string().required(t('enterForm.err.required')),
      email: yup.string().required(t('enterForm.err.required')),
    }),

  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-md-10">
      <h1 className="text-center mb-4">{t('enterForm.enter')}</h1>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 w-100 rounded border"
          name="email"
          id="email"
          required
          type="text"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder={t('enterForm.email')}
          autoComplete="email"
        />
        <label className="ms-2 form-label" htmlFor="email">{t('enterForm.email')}</label>
      </Form.Group>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 h-2  0 w-100 rounded border"
          name="password"
          id="password"
          required
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('enterForm.password')}
          autoComplete="password"
        />
        <label className="ms-2 form-label" htmlFor="password">{t('enterForm.password')}</label>
      </Form.Group>
      <Button
        type="submit"
        className={btnClass}
        variant=""
      >
        {t('enterForm.submit')}
      </Button>
      {userAuth
        ? <h6 className="text-danger text-center" title=""><strong>{errorMessage}</strong></h6>
        : <div className="p-4" />}
    </Form>
  );
};

export default EnterForm;