import {useEffect} from 'react';
import {toast} from 'sonner';
import socket from "../services/web-socker.js";
import Logo from "./layout/logo";
export default function PointsNotification() {
    useEffect(() => {
        socket.connect();

        socket.on('notification', (title, message, iconUrl) => {
            toast.info(
                <div className={'flex justify-between items-start gap-4 '}>
                    {iconUrl && <Logo path={iconUrl} alt="icon" className='w-24 h-full ' />}
                    <div className='flex flex-col gap-1 w-full'>
                        <strong className='text-lg'>{title}</strong>
                        <p>{message}</p>
                    </div>
                </div>
            );
        });

        return () => {
            socket.off('notification');
        };
    }, []);

    return null;
};