import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

if (!API_KEY) {
	throw new Error('YouTube API ключ не найден. Проверь .env файл')
}

interface YoutubeRequestParams extends AxiosRequestConfig {
	endpoint: string
	params?: Record<string, any>
}

export async function youtubeApi<T>({ endpoint, params = {}, ...rest }: YoutubeRequestParams): Promise<T> {
	try {
		const response = await axios.get<T>(`https://www.googleapis.com/youtube/v3/${endpoint}`, {
			...rest,
			params: {
				...params,
				key: API_KEY,
			},
		})
		return response.data
	} catch (error) {
		const err = error as AxiosError<any>
		const message = err.response?.data?.error?.message || 'Произошла ошибка при запросе к YouTube API'
		throw new Error(message)
	}
}
