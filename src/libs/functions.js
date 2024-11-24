
import { clsx } from 'clsx';
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
