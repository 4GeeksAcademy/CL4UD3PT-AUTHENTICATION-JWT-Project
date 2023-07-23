import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<h1 className="text-center mt-5">Please Login</h1>
			<div className="col-12 col-sm-6 mx-auto mt-5">
				<div className="form-floating mb-3">
					<input type="email" className="form-control shadow" id="floatingInput" placeholder="name@example.com" />
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input type="password" className="form-control shadow" id="floatingPassword" placeholder="Password" />
					<label htmlFor="floatingPassword">Password</label>
				</div>
			</div>
		</div>
	);
};
