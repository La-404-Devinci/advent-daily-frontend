import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {jwtDecode} from "jwt-decode";

export const cn = (...inputs) => {
    return twMerge(clsx(inputs))
}

export function getEventDay() {
    return new Date().getUTCDate() - 1;
}

export const isAuthenticated = () => {
    const authToken = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(authToken);
    console.log(decodedToken);
    return decodedToken !== null;
};

export const isAdmin = () => {
    const authToken = localStorage.getItem("authToken");
    const { email } = jwtDecode(authToken);
    return ['michel.moccand-jacquet@edu.devinci.fr', 'nicolas.becharat@edu.devinci.fr', 'matteo.marchelli@edu.devinci.fr'].includes(email);
};
