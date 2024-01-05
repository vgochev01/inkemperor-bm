import { request } from "../util/ajax";

export const getRevenueForMonth = async (year, month, accessToken) => {
    const url = `/analytics/revenue/month?year=${year}&month=${month}`;
    return request(url, 'GET', null, accessToken);
};

export const getRevenueForYear = async (year, accessToken) => {
    const url = `/analytics/revenue/year?year=${year}`;
    return request(url, 'GET', null, accessToken);
};

export const getRevenueForPeriod = async (startDate, endDate, accessToken) => {
    const url = `/analytics/revenue/custom?startDate=${startDate}&endDate=${endDate}`;
    return request(url, 'GET', null, accessToken);
};
