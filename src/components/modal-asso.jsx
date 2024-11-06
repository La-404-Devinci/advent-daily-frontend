import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/buttons/Buttons.jsx";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";

const schema = z.object({
    name: z.string().min(1, { message: "Le nom de l'asso est obligatoire" }),

});

const ModalAsso = ({ isOpen, onClose }) => {

    const [name, setName] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),

    })

    const onSubmit = (data) => {
            console.log(data, "create");
            onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
            <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 rounded-xl h-fit w-96">
                <h2 className="p-4 text-lg font-bold">Ajouter une asso</h2>
                <hr className="border-blue-700" />
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
                    <div className="flex justify-end gap-2">
                        <Button styleType="secondary" type="button" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button styleType="primary" type="submit">
                            Ajouter
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalAsso;

