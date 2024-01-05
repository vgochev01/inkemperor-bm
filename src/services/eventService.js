import { request, requestMultipart } from "../util/ajax";

export const getAllEvents = (token) => {
    return request('/events', 'GET', null, token);
}

export const createEvent = async (data, token) => {
    return requestMultipart('/events', 'POST', data, token)
}

export const updateEvent = (eventId, data, token) => {
    return requestMultipart(`/events/${eventId}`, 'PUT', data, token);
}

export const removeEvent = (eventId, token) => {
    return request(`/events/${eventId}`, 'DELETE', null, token);
}