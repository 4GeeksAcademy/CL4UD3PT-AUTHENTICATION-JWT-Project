import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions, store } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-flex ml-auto gap-2">
					{store.token === null &&
						<Link to="/signup">
							<button className="btn btn-primary">Sign up</button>
						</Link>
					}
					{store.token && store.token !== "" && store.token !== undefined ?
						<button className="btn btn-primary">Logout</button>
						:
						<Link to="/login">
							<button className="btn btn-success">Login</button>
						</Link>
					}

				</div>
			</div>
		</nav>
	);
};
