export const getTokenFromLocalStorage = (token?: string) => {
    const localToken = localStorage.getItem('X_FR_token')
    if (localToken === null || localToken === undefined) {
        return token
    }
    return localToken;
};