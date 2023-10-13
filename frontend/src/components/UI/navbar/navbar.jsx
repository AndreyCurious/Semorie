import React, { useEffect, useState } from "react";
import { Navbar, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import routes from "../../../routes.js";
import { Link } from "react-router-dom";
import classes from './navbar.module.css'
import { useAuth } from '../../../hooks/index.js'

const MyNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const decodeUser = JSON.parse(localStorage.getItem('user'));
  const user = localStorage.getItem('isUser');

	return (
		<Navbar className={classes.myNavbar}>
      <Container>
        <Navbar.Brand>
        <NavLink to={routes.shop()}>
            <img
              alt="logo"
              src='/images/icons/logo.png'
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <span>{t('navbar.logo')}</span>
        </NavLink>
        </Navbar.Brand>

        <div className="d-flex align-items-center">
        {decodeUser?.role === 'ADMIN' ?
          <Button variant="success" onClick={() => navigate(routes.admin())}>{t('navbar.admin')}</Button>
        :
          <></>
        }
        {decodeUser?.email ?
          <span className="ms-2">{decodeUser.email}</span>
        :
        <></>
        }
        {!auth.isUser ? 
          <Link to={routes.login()} className={classes.icon}>
            <img
              alt="login"
              src='/images/icons/login.png'
              width="25"
              height="25"
              className="d-inline-block align-top"
            />
          </Link>
          :
          <>
            <Link to={routes.basket()} className={`${classes.icon} p-2`}>
              <img
                alt="basket"
                src='/images/icons/basket.png'
                width="25"
                height="25"
                className="d-inline-block align-top"
              />
            </Link>
            <Link onClick={() => {
                auth.logout();
                navigate(routes.shop())
              }} 
              className={classes.icon}
            >
              <img
                alt="logout"
                src='/images/icons/logout.png'
                width="25"
                height="25"
                className="d-inline-block align-top"
              />
              </Link>
          </>
        }
        </div>
      </Container>
    </Navbar>
	)
};

export default MyNavbar;