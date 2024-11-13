import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/buttons/Buttons.jsx";
import Input from "../components/ui/input.jsx";
import { useNavigate } from "react-router";



const schema = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  score: z.preprocess((val) => Number(val), z.number().min(1, { message: "Score must be at least 1" })),
});

const ModalChallenge = ({ isOpen, onClose, challenge, clubId }) => {

    const [name, setName] = useState(challenge?.name || "");
    const [score, setScore] = useState(challenge?.score || "0");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: challenge || {},
  })
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-ADMIN-KEY": import.meta.env.VITE_ADMIN_KEY,
        },
        body: JSON.stringify ({
          clubId : parseInt(clubId),
          name: data.name,
          score: data.score,
        }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du défi");
      }
      const result = await response.json();
      console.log(result);

      onClose();
      navigate(0);
    }
    catch (error) {
      console.error("Erreur lors de l'ajout du défi :", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
      <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 rounded-xl h-fit w-96">
        <h2 className="p-4 text-lg font-bold">Ajouter un défi</h2>
        <hr className="border-blue-700" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
          <Input
            errors={errors}
            register={register}
            name="name"
            type="text"
            label="Nom"
            id="name"
            placeholder="Nom du défi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            errors={errors}
            register={register}
            name="score"
            type="number"
            label="Score"
            id="score"
            placeholder="Score du défi"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button styleType="secondary" type="button" onClick={onClose} className={"w-fit h-fit px-4 py-2"}>
              Annuler
            </Button>
            <Button styleType="primary" type="submit" className={"w-fit h-fit px-4 py-2"}>
                Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalChallenge;

