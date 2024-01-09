import { request } from "../util/ajax";

export const fetchData = async (type, period, customPeriod, accessToken) => {
    let url;
    const { year, month, start, end } = customPeriod;

    switch (type) {
        case 'revenue':
            switch (period) {
                case 'month':
                    url = `/analytics/revenue/month?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/revenue/year?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/revenue/custom?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for revenue');
            }
            break;
        case 'sessions':
            switch (period) {
                case 'month':
                    url = `/analytics/sessions/month?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/sessions/year?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/sessions/custom?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for sessions');
            }
            break;
        default:
            throw new Error('Invalid type');
    }
    return request(url, 'GET', null, accessToken);
};
