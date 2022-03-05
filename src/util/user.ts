import { getRandomString } from "./random"

export type User = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string
} 

export const getUser = (): User => {
    return {
        firstName: 'k6' + getRandomString(),
        lastName: 'k6' + getRandomString(),
        username: 'k6' + getRandomString(),
        password: 'k6' + getRandomString(),
        email: 'k6' + getRandomString() + '@k6.io'
    }
}