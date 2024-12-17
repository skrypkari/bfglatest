import { AppDispatch } from './store'
import { setAccessToken, setRole, fetchAnonymousToken } from './authSlice'
import axios from 'axios'

export const initializeAuth = () => async (dispatch: AppDispatch) => {
	const token = localStorage.getItem('accessToken')

	if (token) {
		try {
			// Проверяем валидность токена
			const response = await axios.get(
				'http://localhost:5000/api/auth/validate',
				{
					headers: { Authorization: `${token}` },
				}
			)
			dispatch(setAccessToken(token))
			dispatch(setRole(response.data.role))
		} catch (error) {
			localStorage.removeItem('accessToken')
			dispatch(fetchAnonymousToken())
		}
	} else {
		// Токена нет, запрашиваем анонимный токен
		dispatch(fetchAnonymousToken())
	}
}
