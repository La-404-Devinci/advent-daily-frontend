import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../components/buttons/Buttons.jsx";
import Input from "../components/ui/input.jsx";
import { useNavigate } from 'react-router'


const schema = z.object({
    name: z.string().min(1, {message: "Le nom de l'asso est obligatoire"}),
    avatarUrl: z.string().url({message: "L'avatar doit être une URL"}),
});

const ModalAsso = ({isOpen, onClose}) => {


    const navigate = useNavigate()

    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(schema),

    })

    const onSubmit = async (data) => {

            await fetch(`${import.meta.env.VITE_API_URL}/admin/clubs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ADMIN-KEY': import.meta.env.VITE_ADMIN_KEY
                },
                body: JSON.stringify({
                    name: data.name,
                    avatarUrl: data.avatarUrl,
                    dailyDate: new Date().toISOString().split('T')[0],
                    description: "Description de l'asso"
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);})
                .catch((error) => {
                    console.error(error);
                });

        onClose();
        navigate(0)
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
            <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 rounded-xl h-fit w-96">
                <h2 className="p-4 text-lg font-bold">Ajouter une asso</h2>
                <hr className="border-blue-700"/>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
                    <Input
                        errors={errors}
                        register={register}
                        name="name"
                        type="text"
                        label="Nom de l'asso"
                        id="name"
                        placeholder="Nom de l'asso"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        errors={errors}
                        register={register}
                        name="avatarUrl"
                        type="text"
                        label="Avatar"
                        id="avatarUrl"
                        placeholder="Lien de l'avatar"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button styleType="secondary" type="button" onClick={onClose}
                                className={"px-4 py-2 w-fit h-fit"}>
                            Annuler
                        </Button>
                        <Button styleType="primary" type="submit" className={"px-4 py-2 w-fit h-fit"}>
                            Ajouter
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAsso;

