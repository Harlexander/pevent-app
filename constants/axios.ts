import axios from 'axios';
import { endpoints } from './endpoints';
import { getStorageItemAsync, setStorageItemAsync } from '@/hooks/use-storage-state';
import { router } from 'expo-router';

export const api = axios.create({
    baseURL: endpoints.BASE_URL,
})

api.interceptors.request.use(async (config) => {
    try {
        const token = await getStorageItemAsync('session')

        console.log(token);
        
        if (token) {
            config.headers = config.headers ?? {}
            config.headers.Authorization = `Bearer ${token}`
            config.headers.Accept = 'application/json'
        }
    } catch (e) {
        // ignore token retrieval errors
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Remove auth token and redirect to login
            await setStorageItemAsync('session', null);
            router.replace('/(onboarding)/login');
        }

        return Promise.reject(error)
    }
)