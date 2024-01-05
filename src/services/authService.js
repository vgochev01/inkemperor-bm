import { request } from "../util/ajax";

export const login = async (username, password) => {
    return request('/users/login', 'POST', { username, password });

};

export const register = (email, username, password) => {
    return request('/users/register', 'POST', { email, username, password });
}

export const getProfile = (token) => {
    return request('/users/profile', 'GET', null, token);
}