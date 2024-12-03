import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../components/buttons/Buttons";
import Layout from "../layout";
import { loginAccount } from "../libs/auth/loginAccount";
import { ArrowLeft, ArrowRight } from "lucide-react";

const schema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Email invalide" })
    .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {
      message:
        "L'email de ton compte doit être de type 'edu.devinci.fr' ou 'devinci.fr'",
    }),
  password: z.string().min(1, { message: "Mot de passe requis" }),
});

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) navigate("/calendar");
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await loginAccount(data.email, data.password, navigate);
    } catch {
      toast.error("Une erreur est survenue lors de la connexion", {
        className: "border-red-800 bg-gray-900",
        classNames: {
          icon: "text-red-800",
        },
        cancel: {
          label: "Fermer",
        },
        cancelButtonStyle: {
          backgroundColor: "#f9fafb",
          color: "#030712",
        },
      });
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-between min-h-screen px-6 py-32 text-center w-full">
        <div>
          <h1 className="text-5xl font-bold">Bon retour !</h1>
          <p className="mt-4 text-sm text-gray-300">
            Reviens prendre ta place au sommet de la compétition.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-start w-full gap-4"
        >
          <div className="flex flex-col items-start max-w-full gap-4">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                {...register("email")}
                placeholder="john.doe@edu.devinci.fr"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-start w-full">
              <label htmlFor="password">Mot de passe *</label>
              <input
                id="password"
                type="password"
                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                {...register("password")}
                placeholder="Un mot de passe sécurisé"
              />
              {errors.password && (
                <p role="alert" className="mt-1 text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <Button styleType="primary" type="submit">
            Je me connecte
          </Button>
        </form>

        <div className="flex items-center justify-center w-full gap-2 max-w-[25rem] mx-auto">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-md text-sm font-medium flex-1"
          >
            <ArrowLeft size={16} />
            M&apos;inscrire
          </Link>

          <p>|</p>

          <Link
            to="/admin/login"
            className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-md text-sm font-medium flex-1"
          >
            Je suis une asso
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
