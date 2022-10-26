import { IUser } from '@dashy/api-interfaces';
import { BACKEND_LOC } from '@dashy/secrets';
import axios from 'axios';

export const register = async(email: string, username: string, password: string) => {
    const data = {
        email,
        username,
        password
    }
    const res = await axios.post<Partial<IUser>>(`${BACKEND_LOC}/users/login`, data)
    return res
}