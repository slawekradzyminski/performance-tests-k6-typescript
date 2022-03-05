import { check } from "k6";
import http from "k6/http";
import { getAuthHeaders } from "../http/headers";

const getAllUsersUrl = 'http://localhost:4000/users'

export const getAllUsers = (token: string) => {
    const getUsersResponse = http.get(getAllUsersUrl, {
        headers: getAuthHeaders(token),
      });
      check(getUsersResponse, { "get user status 200": (r) => r.status === 200 });
}