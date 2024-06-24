import axios, { AxiosInstance } from 'axios';

export function getAxiosInstance(): AxiosInstance {
    return axios.create({
        baseURL: `${process.env.BASE_URL}`,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
