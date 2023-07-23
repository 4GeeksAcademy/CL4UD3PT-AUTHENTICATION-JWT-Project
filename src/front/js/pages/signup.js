import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [alertMessage, setAlertMessage] = useState("");

	const handleChange = (setState) => (event) => {
		setState(event.target.value);
	}

	const handleSignup = async () => {
		const response = await actions.signup(email, password);

		if (response[0]) {
			navigate("/login");
		} else {
			console.log(response);
			setAlertMessage(response[1]);
		}
	}

	return (
		<div className="container">
			<h1 className="text-center mt-5">Please Signup</h1>

			<div className="col-12 col-sm-6 mx-auto mt-5 d-flex flex-column gap-3">

				{/* EMAIL */}
				<div className="form-floating">
					<input type="email"
						className="form-control shadow"
						id="floatingInput"
						placeholder="name@example.com"
						value={email}
						onChange={handleChange(setEmail)} />
					<label htmlFor="floatingInput">Email address</label>
				</div>

				{/* PASSWORD */}
				<div className="form-floating">
					<input type="password"
						className="form-control shadow"
						id="floatingPassword"
						placeholder="Password"
						value={password}
						onChange={handleChange(setPassword)} />
					<label htmlFor="floatingPassword">Password</label>
				</div>

				{/* SIGNUP BUTTON */}
				<div>
					<button className="btn btn-primary w-100" onClick={handleSignup}>Signup</button>
				</div>

				{/* ALERT BOX */}
				{alertMessage !== "" &&
					<div className="alert alert-danger" role="alert">
						{alertMessage}
					</div>
				}
			</div>
		</div>
	);
};
