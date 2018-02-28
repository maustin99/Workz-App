import axios from 'axios'
import jwtDecode from 'jwt-decode'

// During initial app load, instantiate axios, and attempt to set
// a stored token as a default header for all api requests.
const clientAuth = axios.create()
clientAuth.defaults.headers.common.token = getToken()

function getToken() {
	return localStorage.getItem('token')
}

function setToken(token) {
	localStorage.setItem('token', token)
	return token
}

function getCurrentUser() {
	const token = getToken()
	if(token) return jwtDecode(token)
	return null
}

function logIn(credentials) {
	return clientAuth({ method: 'post', url: '/api/users/authenticate', data: credentials })
		.then(res => {
			const token = res.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				clientAuth.defaults.headers.common.token = setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
function signUp(userInfo) {
	return clientAuth({ method: 'post', url: '/api/users', data: userInfo})
		.then(res => {
			const token = res.data.token
			if(token) {
				// sets token as an included header for all subsequent api requests
				clientAuth.defaults.headers.common.token = setToken(token)
				return jwtDecode(token)
			} else {
				return false
			}
		})
}

function logOut() {
	localStorage.removeItem('token')
	delete clientAuth.defaults.headers.common.token
	return true
}

function getTodos() {
	return clientAuth({ method: 'get', url: '/api/todos' })
}

function createTodo(fields) {
	return clientAuth({ method: 'post', url: '/api/todos', data: fields })
}

function updateTodo(id, fields) {
	return clientAuth({ method: 'patch', url: `/api/todos/${id}`, data: fields })
}

function updateUser(id, fields) {
	return clientAuth({method: 'patch', url: `/api/users/${id}`, data: fields }).then(res => {
		if(res.data.success) {
			clientAuth.defaults.headers.common.token = setToken(res.data.token)
		}
		return res.data.user
	})
}


export default {
	getCurrentUser,
	logIn,
	signUp,
	logOut,
	getTodos,
	createTodo,
	updateTodo,
	updateUser
}