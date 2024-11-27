import {clsx} from 'clsx';
import compress from 'compress-base64';
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
    return authToken !== null;
};

export const isGranterAuthenticated = () => {
    const grantersToken = localStorage.getItem("grantersToken");
    return grantersToken !== null;
};

export const cropImage = (imageData) => {
    return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.src = imageData;

        img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const size = Math.min(img.width, img.height);
            canvas.width = size;
            canvas.height = size;

            ctx.drawImage(
                img,
                (img.width - size) / 2,
                (img.height - size) / 2,
                size,
                size,
                0,
                0,
                size,
                size
            );

            const squareImage = canvas.toDataURL("image/jpeg");
            resolve(squareImage);
        }
    });
}


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
    const {email} = jwtDecode(authToken);
    return ['michel.moccand-jacquet@edu.devinci.fr', 'nicolas.becharat@edu.devinci.fr', 'matteo.marchelli@edu.devinci.fr'].includes(email);
};
