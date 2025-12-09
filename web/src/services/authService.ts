import axios from 'axios';
import { API_BASE_URL } from '../helpers/apiConstants';

export const login = async (credentials: { username: string; password: string }) => {
   return axios.post(`${API_BASE_URL}/login`, credentials);
};

export const logout = async () => {
   return axios.post(`${API_BASE_URL}/logout`);
};