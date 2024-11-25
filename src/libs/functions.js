import { clsx } from 'clsx';
import compress from 'compress-base64';
import { twMerge } from 'tailwind-merge';
import {jwtDecode} from "jwt-decode";


export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}

export function getEventDay() {
    return new Date().getUTCDate() - 1;
}

export const isAuthenticated = () => {
    const authToken = localStorage.getItem("authToken");
    return authToken !== null;
};

export const isGranterAuthenticated = () => {
    const grantersToken = localStorage.getItem("grantersToken");
    return grantersToken !== null;
};

export const compressImage = async (data) => {

    return await compress(data, {
        quality: 0.6,
        type: "image/jpeg",
        max: 300,
        min: 0,
        width: 350,
        height: 350,
    })

    const decodedToken = jwtDecode(authToken);
    return decodedToken !== null;
};

export const isAdmin = () => {
    const authToken = localStorage.getItem("authToken");
    const { email } = jwtDecode(authToken);
    return ['michel.moccand-jacquet@edu.devinci.fr', 'nicolas.becharat@edu.devinci.fr', 'matteo.marchelli@edu.devinci.fr'].includes(email);
};
