import React from "react";
import EnterForm from "./UI/enterForm/enterForm";
import { Link } from "react-router-dom";
import routes from "../routes.js"
import { useTranslation } from 'react-i18next'; 

const Login = () => {
	const { t } = useTranslation();
	return (
		<div className="container h-100	">
			<div className="row align-content-center justify-content-center h-100">  
				<div className="col-sm-4">
					<div className="card shadow-sm">
						<div className="card-body row justify-content-center">
							<EnterForm />
						</div>
						<div className="card-footer text-center p-3">
							<Link to={routes.signup()}>
								{t('enterForm.registration')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Login;