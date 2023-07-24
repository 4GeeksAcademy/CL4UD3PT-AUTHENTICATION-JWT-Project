import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { useNavigate } from "react-router-dom";

export const Private = props => {
	const { actions, store } = useContext(Context);
	const navigate = useNavigate();
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		actions.verifyToken()
			.then((response) => {
				!response ? navigate("/") : setAuthorized(true);
			})
	}, [])

	return (
		<>
			{authorized &&
				<div className="jumbotron text-center mt-5">
					<h1 className="display-4">This is a private page</h1>
					<img src={rigoImageUrl} />
					<hr className="my-4" />
				</div>
			}
		</>
	);
};