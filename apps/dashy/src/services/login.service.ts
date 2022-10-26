import { IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';

export const login = async(email: string, password: string) => {
    const data = {
        email: email,
        password: password
    }
    const res = await axios.post<IUser>(`${BACKEND_LOC}/users/login`, data)
    return res
}