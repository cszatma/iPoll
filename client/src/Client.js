// @flow

import type { RESTMethod } from './types';

// Global constants
const apiUrl = 'http://localhost:8080/api/';
const LOCAL_TOKEN_KEY = 'ipoll-api-token-auth';
const defaultHeaders = { accept: 'application/json' };
const storage = sessionStorage; // Use either session or local storage

class Client {
    token: ?string;

    constructor() {
        // Set the auth token if it exists
        this.token = storage.getItem(LOCAL_TOKEN_KEY);
    }

    // Makes a request to the api at the given route
    request(route: string, method: RESTMethod, authenticated: boolean = false, headers: HeadersInit = defaultHeaders): Promise<any> {
        return fetch(apiUrl + route, {
            headers: headers,
            body: authenticated ? this.token : null,
        }).then(checkStatus).then(parseJson)
    }
}

// Checks the status of a response from a HTTP request
// If successful the response is returned, otherwise an error is thrown
function checkStatus(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
    }
}

// Convenience function for parsing HTTP response as JSON
function parseJson(response: Response): Promise<any> {
    return response.json();
}

const client = new Client();

export default client;
export { defaultHeaders };
export type { RESTMethod };