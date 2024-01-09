import { request } from "../util/ajax";

export const login = async (username, password) => {
    return request('/users/login', 'POST', { username, password });

};

export const register = async ({ email, username, password, userRole }) => {
    return request('/users/register', 'POST', { email, username, password, userRole });
};

export const getProfile = (token) => {
    return request('/users/profile', 'GET', null, token);
}