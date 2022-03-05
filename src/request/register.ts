import { check } from "k6";
import http from "k6/http";
import { jsonHeaders } from "../http/headers";
import { User } from "../util/user"

const registerUrl = 'http://localhost:4000/users/signup'

export const register = (user: User) => {
    const registerResponse = http.post(registerUrl, registerBody(user), {
        headers: jsonHeaders,
      });
    check(registerResponse, { "is status 201": (r) => r.status === 201 });
}

const registerBody = (user: User) => {
    const body = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        email: user.email,
        roles: ['ROLE_CLIENT']
    }

    return JSON.stringify(body)
}