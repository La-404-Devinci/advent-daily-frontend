import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { Check, CheckCircle, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/buttons/Buttons";
import Layout from "../layout";
import usePasswordStore from "../store/passwordStore";

const passwordValidation = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const schema = z.object({
    email: z
        .string()
        .email({ message: "Email invalide." })
        .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {
            message: "L'email de ton compte doit être de type 'edu.devinci.fr' ou 'devinci.fr'",
        }),
    password: z.string().min(1, { message: "Mot de passe requis." }).regex(passwordValidation, {
        message: "Ton mot de passe n'est pas assez sécurisé.",
    }),
    confirmPassword: z.string().min(1, { message: "Confirmation du mot de passe requise." })
}).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Les mot de passes de sont pas identiques.",
      path: ["confirmPassword"],
    }
);


export default function Register() {    
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);
    const { password, setPassword } = usePasswordStore();
    const [email, setEmail] = useState(localStorage.getItem("email"));

    const token = useMemo(() => {
        const url = new URL(window.location.href);
        const tokenUrl = url.hash.substring(1);

        localStorage.setItem("token", tokenUrl);
        return tokenUrl;
    }, []);

    useEffect(() => {
        if (localStorage.getItem("authToken")) navigate("/calendar");
    }, [navigate]);

    useEffect(() => {
        if (!token) return;
        try {
            const { email: tokenEmail, exp } = jwtDecode(token);

            if (Date.now() > exp * 1000) throw "";

            localStorage.setItem("email", tokenEmail);
            setEmail(tokenEmail);
        } catch {
            localStorage.removeItem("token");
            navigate("/");
        }
    }, [token, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            email: email,
        },
    });

    const checkStrength = (pass) => {
        const requirements = [
            { regex: /.{8,}/, text: "Au moins  8 characters" },
            { regex: /[0-9]/, text: "Au moins 1 chiffre" },
            { regex: /[a-z]/, text: "Au moins 1 minuscule" },
            { regex: /[A-Z]/, text: "Au moins 1 majuscule" },
            { regex: /[#?!@$%^&*-]/, text: "Au moins un caractère spécial" },
        ];

        return requirements.map((req) => ({
            met: req.regex.test(pass),
            text: req.text,
        }));
    };

    const strength = checkStrength(password);

    const onSubmit = async (data) => {
        setPassword(data.password);
        navigate("/selection", { state: { email } });
    };

    return (
        <Layout>
            <div className="flex flex-col gap-40 min-h-screen px-6 py-32 text-center w-full">
                <div>
                    <h1 className="text-5xl font-bold">Deviens joueur</h1>
                    <p className="mt-4 text-sm text-gray-300">Rentre un mot de passe sécurisé pour continuer ton inscription.</p>
                    <p className="mt-4 text-sm inline-flex align-center gap-2 p-2 rounded-md border border-gray-700 bg-gray-900">
                        <span>{email}</span>
                        <CheckCircle size={20} className="text-emerald-500" />
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start w-full gap-4">
                    <div className="flex flex-col items-start max-w-full gap-4">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="password">Mot de passe *</label>
                            <div className="w-full">
                                <div
                                    className="w-full mt-2 bg-white border flex items-center justify-between
                                    border-gray-300 rounded-md focus:border-blue-900 text-gray-950 pr-2 focus-within:ring-4"
                                >
                                    <input
                                        id="password"
                                        type={isVisible ? "text" : "password"}
                                        className="w-full py-2 pl-3 focus:outline-none"
                                        placeholder="Ton mot de passe sécurisé"
                                        {...register("password")}
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                    />
                                    <button
                                        className="flex h-full w-9 items-center justify-center rounded-lg transition-shadow"
                                        type="button"
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p role="alert" className="text-start mt-2 text-red-500">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        
                        </div>
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="password">Confirmer le mot de passe *</label>
                            <div className="w-full">
                                <div
                                    className="w-full mt-2 bg-white border flex items-center justify-between
                                    border-gray-300 rounded-md focus:border-blue-900 text-gray-950 pr-2 focus-within:ring-4"
                                >
                                    <input
                                        id="password"
                                        type="password"
                                        className="w-full py-2 pl-3 focus:outline-none"
                                        placeholder="Confirmation de ton mot de passe"
                                        {...register("confirmPassword")}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p role="alert" className="text-start mt-2 text-red-500">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                            
                        </div>
                        <div className="w-full text-start">

                            <ul
                                className="flex flex-col w-full gap-1.5 mt-4 bg-gray-900/50 border border-gray-800 rounded-lg p-2"
                                aria-label="Password requirements"
                            >
                                {strength.map((req, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        {req.met ? (
                                            <Check size={16} className="text-emerald-500" aria-hidden="true" />
                                        ) : (
                                            <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                                        )}
                                        <span className={`text-xs ${req.met ? "text-emerald-500" : "text-muted-foreground"}`}>
                                            {req.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <Button styleType="primary" type="submit">
                        Dernière étape
                    </Button>
                </form>
            </div>
        </Layout>
    );
}