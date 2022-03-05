import { check, fail } from "k6";
import http, { RefinedResponse, ResponseType } from "k6/http";
import { jsonHeaders } from "../http/headers";
import { User } from "../util/user"

const loginUrl = 'http://localhost:4000/users/signin'

type loginResponse = {
    token: string
}

export const login = (user: User): string => {
    const loginResponse = http.post(loginUrl, loginBody(user), {
        headers: jsonHeaders,
    });
    check(loginResponse, { "login is status 200": (r) => r.status === 200 });
    return getToken(loginResponse)
}

const getToken = (loginResponse: RefinedResponse<ResponseType>) => {
    const checkTokenPresence = check(loginResponse, {
        'token present': (r) => {
            const loginResponseBody = r.json() as loginResponse
            return typeof loginResponseBody.token === 'string'
        }
    });
    if (!checkTokenPresence) {
        fail('unexpected response');
    }
    const loginResponseBody = loginResponse.json() as loginResponse
    return loginResponseBody.token
}

const loginBody = (user: User) => {
    const body = {
        username: user.username,
        password: user.password
    }

    return JSON.stringify(body)
}