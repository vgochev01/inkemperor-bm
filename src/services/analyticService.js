import { request } from "../util/ajax";

export const fetchRevenueAndSessionsData = async (calendarId, type, period, customPeriod, accessToken) => {
    let url;
    const { year, month, start, end } = customPeriod;

    switch (type) {
        case 'revenue':
            switch (period) {
                case 'month':
                    url = `/analytics/revenue?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/revenue?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/revenue?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for revenue');
            }
            break;
        case 'sessions':
            switch (period) {
                case 'month':
                    url = `/analytics/sessions?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/sessions?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/sessions?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for sessions');
            }
            break;
        default:
            throw new Error('Invalid type');
    }

    if(calendarId) {
        url += `&calendarId=${calendarId}`;
    }

    return request(url, 'GET', null, accessToken);
};

export const fetchArtistPerformanceData = async (type, period, customPeriod, accessToken) => {
    let url;
    const { year, month, start, end } = customPeriod;

    switch (type) {
        case 'performance':
            switch (period) {
                case 'month':
                    url = `/analytics/artist/month?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/artist/year?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/artist/custom?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for artist performance');
            }
            break;
        case 'revenue-contribution':
            switch (period) {
                case 'month':
                    url = `/analytics/artist/revenue-contribution?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/artist/revenue-contribution?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/artist/revenue-contribution?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for revenue contribution');
            }
            break;
        case 'average-revenue':
            switch (period) {
                case 'month':
                    url = `/analytics/artist/average-revenue?year=${year}&month=${month}`;
                    break;
                case 'year':
                    url = `/analytics/artist/average-revenue?year=${year}`;
                    break;
                case 'custom':
                    url = `/analytics/artist/average-revenue?startDate=${start}&endDate=${end}`;
                    break;
                default:
                    throw new Error('Invalid period for revenue contribution');
            }
            break;
        default:
            throw new Error('Invalid type');
    }

    return request(url, 'GET', null, accessToken);
};