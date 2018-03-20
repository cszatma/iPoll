// @flow

import { defaultHeaders, authorizedHeader, apiRequest, parsedApiRequest } from './utils/request';

// Global constants
type CallbackFunction = boolean => void;
const LOCAL_TOKEN_KEY = 'ipoll-api-token-auth';
const storage = localStorage; // Use either session or local storage

class Client {
    token: ?string;
    subscribers: CallbackFunction[];

    constructor() {
        // Set the auth token if it exists
        this.token = storage.getItem(LOCAL_TOKEN_KEY);
        this.subscribers = [];

        // Check that it's a valid token
        if (this.token) {
            this.isTokenValid().then(isValid => {
                if (!isValid) {
                    this.removeToken();
                    this.notifySubscribers();
                }
            });
        }
    }

    isLoggedIn(): boolean {
        return !!this.token;
    }

    setToken(token: string): void {
        this.token = token;
        storage.setItem(LOCAL_TOKEN_KEY, token);
    }

    removeToken(): void {
        this.token = null;
        storage.removeItem(LOCAL_TOKEN_KEY);
    }

    async isTokenValid(): Promise<boolean> {
        const token = this.token;

        if (!token) {
            return Promise.resolve(false);
        }

        const isValid = await parsedApiRequest(
            `tokens/check-token?token=${encodeURIComponent(token)}`,
            'get',
            defaultHeaders
        );

        return isValid === 1;
    }

    register(username: string, school: string, password: string): Promise<any> {
        const json = JSON.stringify({ username, school, password });
        return apiRequest('users', 'post', defaultHeaders, json)
            .then(() => this.login(username, password));
    }

    login(username: string, password: string): Promise<any> {
        return parsedApiRequest('users/login', 'post', {
            ...defaultHeaders,
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        }).then(json => this.setToken(json.token));
    }

    logout(): Promise<void> {
        const token = this.token;

        if (!token) {
            return Promise.resolve();
        }

        this.removeToken();
        return apiRequest(`tokens?token=${token}`, 'delete', defaultHeaders);
    }

    subscribe(callback: CallbackFunction): void {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.isLoggedIn()));
    }
}

const client = new Client();

export default client;
