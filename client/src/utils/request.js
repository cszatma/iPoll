// @flow

import type { RESTMethod } from './types';

const apiUrl = 'http://localhost:8080/api/';
const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json',
};

// Checks the status of a response from a HTTP request
// If successful the response is returned, otherwise an error is thrown
function checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        // $FlowExpectedError
        error.status = response.statusText;
        // $FlowExpectedError
        error.response = response;
        console.log(error);
        throw error;
    }
}

// Convenience function for parsing HTTP response as JSON
function parseJson(response: Response): Promise<any> {
    return response.json();
}

// Returns a HeaderInit object with the defaultHeader fields
// plus a Authorization field with the given token
function authorizedHeader(token: string): HeadersInit {
    return {
        ...defaultHeaders,
        Authorization: 'Bearer ' + token,
    };
}

// Makes a request to the api and returns the json response
function apiRequest(
    route: string,
    method: RESTMethod,
    headers: HeadersInit = defaultHeaders,
    body?: any,
): Promise<any> {
    if (method === 'get' && body) {
        throw Error('get requests should not have a body');
    }

    return fetch(apiUrl + route, {
        method,
        headers,
        body,
    }).then(checkStatus);
}

function parsedApiRequest(
    route: string,
    method: RESTMethod,
    headers: HeadersInit = defaultHeaders,
    body?: any,
): Promise<any> {
    return apiRequest(route, method, headers, body).then(parseJson);
}

export {
    defaultHeaders,
    checkStatus,
    parseJson,
    authorizedHeader,
    apiRequest,
    parsedApiRequest,
};
