import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div className="form-floating mb-3">
				<input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
				<label htmlFor="floatingInput">Email address</label>
			</div>
			<div className="form-floating">
				<input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
				<label htmlFor="floatingPassword">Password</label>
			</div>
		</div>
	);
};
