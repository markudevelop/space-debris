const API_URL = '/api';

export const pickDebris = (reportId, ticketState) => {
    return fetch(API_URL + `/reports/${reportId}`, {
        method: 'PUT',
        body: JSON.stringify({
            ticketState
        }),
    });
};
