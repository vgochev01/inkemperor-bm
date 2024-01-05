import { request } from "../util/ajax";

export const getTattooArtists = (token) => {
    return request('/artists', 'GET', null, token);
}

export const createArtist = (data, token) => {
    return request('/artists', 'POST', data, token);
}

export const updateArtistColor = (artistId, newColor, token) => {
    return request(`/artists/${artistId}`, 'PUT', { color: newColor }, token);
}

export const removeArtist = (artistId, token) => {
    return request(`/artists/${artistId}`, 'DELETE', null, token);
}