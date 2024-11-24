import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Menu from "../components/layout/menu";
import EditUserAvatar from "../components/profile-edit/edit-user-avatar";
import EditUserInfo from "../components/profile-edit/edit-user-info";
import Layout from "../layout";
import { cn } from "../libs/functions";
import useMeStore from "../store/meStore";
import useProfileStore from "../store/profileStore";

const schema = z.object({
  username: z.string().min(1).max(20),
  quote: z.string().max(50).optional(),
  avatar: z.string().optional().nullable(),
});

async function updateProfile(data, uuid) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${uuid}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({
          username: data.username,
          quote: data.quote,
          avatar: data.avatar,
      }),
  });

  if (!response.ok) {
      throw new Error("Une erreur est survenue lors de la mise à jour du profil");
  }

  return response.json();
}

export default function ProfileEditPage() {

  const { me, getMe } = useMeStore();
  const { profiles, getProfile, revalidateProfile } = useProfileStore()
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    me && getProfile(me);
  }, [me, getProfile]);

  const user = useMemo(() => profiles[me].user, [profiles, me]);

  const { register, handleSubmit, reset, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
        username: user.username ?? "",
        quote: user.quote ?? "",
    },
  });

  
  const onSubmit = async (data) => {
    const parsedAvatar = avatar ? avatar.replace(/^data:image\/(jpg|jpeg);base64,/, "") : avatar;
    try {
        await updateProfile({...data, avatar: parsedAvatar}, user.uuid);
        await revalidateProfile(user.uuid);
        toast.success("Le profil a été mis à jour avec succès !", {
            className: "border-green-800 bg-gray-900",
            classNames: {
                icon: "text-green-800",
            },
        });
    } catch (error) {
        toast.error(error.message, {
            className: "border-red-800 bg-gray-900",
            classNames: {
                icon: "text-red-800",
            },
        });
    }
  }

  const handleReset = (e) => {
    e.preventDefault();
    setAvatar(undefined);
    reset();
  }

  return (
    <Layout>
      <Header title="Editer le profil" />
        <form 
          className="mt-16 mb-36 w-full max-w-[30rem] p-6 mx-auto flex flex-col 
            items-center gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <EditUserAvatar 
              user={user} 
              register={register} 
              handleSubmit={handleSubmit} 
              watch={watch}
              avatar={avatar}
              setAvatar={setAvatar}
            />
            <EditUserInfo 
              user={user} 
              register={register} 
              handleSubmit={handleSubmit} 
              watch={watch}
            />
            <div 
                className={cn(`
                    flex p-4 gap-4 justify-center items-center fixed bottom-20 left-0 right-0 
                    bg-gradient-to-t from-black/100 to-black/0 transition-all duration-200`,
                    !watch("username") && !watch("quote") && "opacity-0 bottom-0"
                )}
            >
                <Button 
                  styleType="secondary" 
                  className="flex-1 max-w-[9rem]"
                  onClick={handleReset}
                >
                  Réinitialiser
                </Button>
                <Button 
                    styleType="primary" 
                    className="flex-1 max-w-[20rem]"
                    type="submit"
                    disabled={!watch("username") || !watch("quote")}
                >
                    Sauvegarder
                </Button>
            </div>
        </form>
      <Menu />
    </Layout>
  )
}