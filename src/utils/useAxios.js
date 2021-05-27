import { useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { BASE_URL } from './constants';

const useAxios = () => {
    const [auth] = useContext(AuthContext);
    const apiClient = axios.create({
        baseURL: BASE_URL
    });
    apiClient.interceptors.request.use(config => {
        const token = auth.jwt;
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    });

    return apiClient;
};

export default useAxios;