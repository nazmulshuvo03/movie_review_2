export const signInAction = {
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_ERROR: 'LOGIN_ERROR'
};

export const signOutAction = {
	SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
	SIGNOUT_ERROR: 'SIGNOUT_ERROR'
};

export const signUpAction = {
	SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
	SIGNUP_ERROR: 'SIGNUP_ERROR'
};

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: signInAction.LOGIN_SUCCESS });
			})
			.catch((err) => {
				dispatch({ type: signInAction.LOGIN_ERROR, err });
			});
	};
};

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch({ type: signOutAction.SIGNOUT_SUCCESS });
			})
			.catch((err) => {
				dispatch({ type: signOutAction.SIGNOUT_ERROR, err });
			});
	};
};

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				return firestore.collection('users').doc(resp.user.uid).set({
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					initials: newUser.firstName[0] + newUser.lastName[0]
				});
			})
			.then(() => {
				dispatch({ type: signUpAction.SIGNUP_SUCCESS });
			})
			.catch((err) => {
				dispatch({ type: signUpAction.SIGNUP_ERROR, err });
			});
	};
};

const initState = {
	authError: null
};

export const authReducer = (state = initState, action) => {
	switch (action.type) {
		case signInAction.LOGIN_SUCCESS:
			console.log('Login Successful');
			return {
				...state,
				authError: null
			};

		case signInAction.LOGIN_ERROR:
			console.log('Login Error');
			return {
				...state,
				authError: 'Login Failed'
			};

		case signOutAction.SIGNOUT_SUCCESS:
			console.log('Signout successful');
			return state;

		case signOutAction.SIGNOUT_ERROR:
			console.log('Signout Error');
			return state;

		case signUpAction.SIGNUP_SUCCESS:
			console.log('Signup successful');
			return {
				...state,
				authError: null
			};

		case signUpAction.SIGNUP_ERROR:
			console.log('Signup Error');
			return {
				...state,
				authError: action.err.message
			};

		default:
			return state;
	}
};
