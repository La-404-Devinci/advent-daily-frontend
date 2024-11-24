
import { clsx } from 'clsx';
import compress from 'compress-base64';
import { twMerge } from 'tailwind-merge';

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
};
