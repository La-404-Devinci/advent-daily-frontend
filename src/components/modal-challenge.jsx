import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/buttons/Buttons.jsx";
import Input from "../components/ui/input.jsx";
import TextArea from "../components/ui/text-area.jsx";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  score: z.preprocess((val) => Number(val), z.number().min(1, { message: "Score must be at least 1" })),
});

const ModalChallenge = ({ isOpen, onClose, challenge }) => {

    const [title, setTitle] = useState(challenge?.title || "");
    const [description, setDescription] = useState(challenge?.description || "");
    const [score, setScore] = useState(challenge?.score || 0);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: challenge || {},
  })




  const onSubmit = (data) => {
    if (challenge) {
        console.log(data, "update");
        onClose();
    } else {
      console.log(data, "create");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
      <div className="flex flex-col justify-between mx-10 bg-black border border-blue-700 rounded-xl h-fit w-96">
        <h2 className="p-4 text-lg font-bold">Edit Challenge</h2>
        <hr className="border-blue-700" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
          <Input
            errors={errors}
            register={register}
            name="title"
            type="text"
            label="Title"
            id="title"
            placeholder="Challenge Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            errors={errors}
            register={register}
            name="description"
            type="text"
            label="Description"
            id="description"
            placeholder="Challenge Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            errors={errors}
            register={register}
            name="score"
            type="number"
            label="Score"
            id="score"
            placeholder="Challenge Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button styleType="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button styleType="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalChallenge;

