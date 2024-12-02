import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {Button} from "../components/buttons/Buttons";
import Layout from "../layout";
import sendEmail from "../libs/auth/sendEmail";
import useMeStore from "../store/meStore";
import PwaPrompt from "../components/pwa-prompt";
import {ArrowRight} from "lucide-react";

const schema = z.object({
    email: z
        .string()
        .trim()
        .email({message: "Email invalide"})
        .regex(/(edu\.devinci\.fr|devinci\.fr)$/, {
            message: "L'email de ton compte doit être de type 'edu.devinci.fr' ou 'devinci.fr'",
        }),
});

export default function Root() {
    const navigate = useNavigate();
    const {me, getMe} = useMeStore();

    useEffect(() => {
        // Check if the user has a token email in the local storage
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/register#" + token);
        }

        // Check if the user is logged in
        getMe().then(() => {
            if (me) {
                navigate("/calendar");
            }
        });
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {

        if (await sendEmail(data.email, false)) {
            navigate("/confirmation-email", {
                state: {email: data.email},
            });
        }
    };

    return (

        <Layout>
            <div className="flex flex-col justify-between min-h-svh px-6 py-32 w-full">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Bienvenue !</h1>
                    <p className="mt-4 text-sm text-gray-300">
                        Gagne des points en participant à des défis organisés par différentes associations au pôle
                        Léonard de Vinci.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-start w-full gap-4">
                    <div className="flex flex-col items-start max-w-full gap-4">
                        <div className="flex flex-col items-start w-full">
                            <label htmlFor="email">Email *</label>
                            <input
                                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md 
                                focus:border-blue-900 text-gray-950"
                                {...register("email", {
                                    required: true,
                                    pattern: /edu\.devinci\.fr|devinci\.fr$/,
                                })}
                                placeholder="john.doe@edu.devinci.fr"
                            />
                            {errors.email && (
                                <p role="alert" className="mt-1 text-rose-500 w-full leading-tight">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button styleType="primary" type="submit">
                        Je reçois mon email
                    </Button>
                </form>


                <div className="flex items-center justify-center w-full gap-2 max-w-[25rem]">
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 bg-white/5 px-4 py-2 rounded-md text-sm font-medium"
                    >

                        Me connecter <ArrowRight size={16}/>

                    </Link>
                </div>
            </div>
            <PwaPrompt/>
        </Layout>
    );
}
