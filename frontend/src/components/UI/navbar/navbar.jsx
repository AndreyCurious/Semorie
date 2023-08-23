import React from "react";
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from "../../../routes.js";
import { Link } from "react-router-dom";
import classes from './navbar.module.css'
import { useAuth } from '../../../hooks/index.js'

const MyNavbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();
	return (
		<Navbar className={classes.myNavbar}>
      <Container>
        <Navbar.Brand href={routes.shop()}>
            <img
              alt="logo"
              src='/images/icons/logo.png'
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            {t('navbar.logo')}
        </Navbar.Brand>
        <div>
        
        {!auth.user ? 
          <Link to={routes.login()} className={classes.icon}>
            <img
              alt="logo"
              src='/images/icons/login.png'
              width="25"
              height="25"
              className="d-inline-block align-top"
            />
          </Link>
          :
          <>
            <Link to={routes.basket()} className={classes.icon}>
              <img
                alt="logo"
                src='/images/icons/basket.png'
                width="25"
                height="25"
                className="d-inline-block align-top"
              />
            </Link>
            <Link onClick={auth.logout()} className={classes.icon}>
              <img
                alt="logo"
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