const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			sessionStorageAndSetStoreDataSave: (key, data) => {
				sessionStorage.setItem([key], JSON.stringify(data));
				setStore({ [key]: data });
				// return true;
			},

			signup: async (email, password) => {
				console.log("signup");
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};

				try {
					const response = await fetch(process.env.BACKEND_URL + "api/signup", opts);
					const data = await response.json();

					if (response.status !== 200) {
						return ([false, data.msg]);
					}

					return ([true, data.msg]);
				} catch (error) {

				}
			},

			login: async (email, password) => {
				console.log("actions: login")
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				};
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login", opts);
					const data = await response.json();

					if (response.status !== 200) {
						return ([false, data.msg]);
					}

					await getActions().sessionStorageAndSetStoreDataSave('token', data.access_token);
					return ([true, data.msg]);
				}
				catch (error) {
					// console.log("Contact service support", error);
					return (["error", error]);
				}
			},
		}
	};
};

export default getState;
