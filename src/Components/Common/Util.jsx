import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import toast from "react-hot-toast";

function jwtdecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );
    return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------
export const isValidToken = (accessToken) => {
    // console.log('accessToken :>> ', accessToken);
    if (!accessToken) {
        return false;
    }
    try {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        const expTimestamp = decodedToken.exp;
        const expirationDate = new Date(expTimestamp * 1000);
        console.log('expirationDate :>> ', expirationDate);
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
};





// ----------------------------------------------------------------------
export const tokenExpired = (exp) => {
    // eslint-disable-next-line prefer-const
    let expiredTimer;
    const currentTime = Date.now();
    // Test token expires after 10s
    // const timeLeft = currentTime + 10000 - currentTime; // ~10s
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer);
    expiredTimer = setTimeout(() => {
        alert('Token expired');
        sessionStorage.removeItem('accessToken');
        window.location.href = "/";
    }, timeLeft);
};
// ----------------------------------------------------------------------
export const setSession = (accessToken) => {
    if (accessToken) {
        sessionStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // This function below will handle when token is expired
        const { exp } = jwtdecode(accessToken); // ~3 days by minimals server
        tokenExpired(exp);
    } else {
        sessionStorage.removeItem('accessToken');
        delete axios.defaults.headers.common.Authorization;
    }
};