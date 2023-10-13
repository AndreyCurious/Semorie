import React from "react";
import RegistrationForm from "./UI/registrationForm/registartionForm";

const Signup = () => {
	return (
		<div className="container h-100	">
			<div className="row align-content-center justify-content-center h-100">  
				<div className="col-sm-4">
					<div className="card shadow-sm">
						<div className="card-body row justify-content-center">
							<RegistrationForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Signup;