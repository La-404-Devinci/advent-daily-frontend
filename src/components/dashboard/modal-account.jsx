import {Button} from "../buttons/Buttons.jsx";
import React from "react";

export const ModalAccount = ({ isOpen, onClose }) => {
    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        localStorage.removeItem("username");
        localStorage.removeItem("image");
        console.log("Logout");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed z-50 flex flex-col justify-between mx-4 -translate-x-1/2 -translate-y-1/2 bg-black border border-blue-700 top-1/2 left-1/2 rounded-xl h-fit w-fit">
                <h2 className="p-4 text-lg font-bold">Profil</h2>
                <hr className="border-blue-700" />
                <div className="flex flex-col gap-4 p-4">
                    <h2 className="text-lg font-bold">Nicolas</h2>
                    <Button styleType="secondary" type="button" onClick={handleLogout}>
                        Déconnexion
                    </Button>
                </div>
            </div>
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-opacity-50 bg-gray-950" onClick={() => onClose(false)}/>
        </>
    );
};
