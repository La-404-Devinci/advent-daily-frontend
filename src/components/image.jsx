import { useEffect, useState } from "react";
import { cn } from "../libs/functions";

const Image = ({ blobUrl, fallback, className }) => {
    
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!blobUrl) return;
        fetch(`${import.meta.env.VITE_API_URL}/blob/${blobUrl}`)
            .then(res => res.json())
            .then(data => setData(`data:image/jpeg;base64,${atob(data.response[0].data)}`))
            .catch(err => console.error(err));
    }, [blobUrl]);

    return ( 
        <img 
            src={data ?? fallback} 
            alt="avatar" 
            className={cn("w-full h-full object-contain", className)} 
        />
     );
}
 
export default Image;