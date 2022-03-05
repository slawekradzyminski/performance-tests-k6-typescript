export const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const getAuthHeaders = (token: string) => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}