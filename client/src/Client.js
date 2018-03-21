// @flow

import { defaultHeaders, authorizedHeader, apiRequest, parsedApiRequest } from './utils/request';
import type { Course, CourseType, Token } from './utils/types';

// Global constants
type CallbackFunction = boolean => void;
const LOCAL_TOKEN_KEY = 'ipoll-api-token-auth';
const storage = localStorage; // Use either session or local storage

class Client {
    token: ?Token;
    subscribers: CallbackFunction[];

    constructor() {
        // Set the auth token if it exists
        const tokenJson = storage.getItem(LOCAL_TOKEN_KEY);
        this.token = tokenJson ? JSON.parse(tokenJson) : null;
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

    setToken(token: Token) {
        this.token = token;
        storage.setItem(LOCAL_TOKEN_KEY, JSON.stringify(token));
    }

    removeToken() {
        this.token = null;
        storage.removeItem(LOCAL_TOKEN_KEY);
    }

    async isTokenValid(): Promise<boolean> {
        const token = this.token;

        if (!token) {
            return Promise.resolve(false);
        }

        const isValid = await parsedApiRequest(
            `tokens/check-token?token=${encodeURIComponent(token.token)}`,
            'get',
            defaultHeaders
        );

        return isValid === 1;
    }

    register(username: string, school: string, password: string): Promise<void> {
        const json = JSON.stringify({ username, school, password });
        return apiRequest('users', 'post', defaultHeaders, json)
            .then(() => this.login(username, password));
    }

    login(username: string, password: string): Promise<void> {
        return parsedApiRequest('users/login', 'post', {
            ...defaultHeaders,
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        }).then(json => this.setToken(json));
    }

    logout(): Promise<void> {
        const token = this.token;

        if (!token) {
            return Promise.resolve();
        }

        this.removeToken();
        return apiRequest(`tokens?token=${token.token}`, 'delete', defaultHeaders);
    }

    subscribe(callback: CallbackFunction) {
        this.subscribers.push(callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(callback =>
            callback(this.isLoggedIn()));
    }

    getCourses(type: CourseType): Promise<Course[]> {
        const token = this.token;

        if (!token) {
            throw Error('User is not authenticated.');
        }

        const route = type === 'enrolled' ? 'enrolled' : 'owned-courses';
        const url = `users/${route}/${token.userID}`;

        return parsedApiRequest(url, 'get', defaultHeaders);
    }
}

const client = new Client();

export default client;
