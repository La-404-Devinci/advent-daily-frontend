import {ChevronsDown} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {Button} from "../buttons/Buttons";
import Logo from "../layout/logo";
import {useState} from "react";

const ConfirmationModal = ({
                               setIsOpen,
                               selectedAssociation,
                               email,
                               password,
                           }) => {
    const navigate = useNavigate();


    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (data) => {
        setIsLoading(true);
        const username = email.split("@")[0];




        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    email: email,
                    password: password,
                    clubId: String(selectedAssociation.id),
                    username: username,

                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Erreur :", errorText);
                throw new Error("Erreur lors de la création de l'utilisateur");
            }

            const result = await response.json();
            const data = result.response?.[0]?.data;
            console.log(data);



            if (data) {
                localStorage.setItem("user", JSON.stringify(
                    {
                        id : data.uuid,
                        username: data.username,
                        email: data.email,
                        clubId: data.clubId,
                        avatarUrl: "",
                        authToken: "",
                        quote: "",
                    }
                ));
                navigate("/login");
            }

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-gray-950">
            <div
                className="flex flex-col justify-between mx-10 bg-gray-950 border border-blue-950 h-fit w-96 rounded-2xl">
                <h2 className="p-4 text-gray-50 font-bold text-center">
                    Attention : Ce choix est définitif !
                </h2>
                <hr className="border-blue-950"/>
                <div className="flex flex-col no-scrollbar">
                    <div className="flex flex-col items-center w-full gap-3 p-4">
                        <div className="flex items-center justify-center w-full gap-3 p-3 text-sm text-left
               text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950">
                            <Logo
                                path={selectedAssociation.avatarUrl}
                                alt={selectedAssociation.name}
                                className="w-10 h-10"
                            />
                            <p className="text-2xl font-bold">
                                {selectedAssociation.name.toUpperCase()}
                            </p>
                        </div>
                        <ChevronsDown className="w-6 h-6"/>
                        <div className="flex items-center justify-center w-full h-16 gap-3 p-3 text-2xl font-bold
               text-center text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950">
                            <p className="text-lg font-bold"> {email} </p>
                        </div>
                    </div>
                    <hr className="border-blue-950"/>
                    <div className="flex flex-col gap-4 p-4">
                        <Button
                            styleType="primary"
                            type="submit"
                            onClick={onSubmit}
                            disabled={isLoading}
                        >
                            Je valide mon asso !
                        </Button>
                        <Button
                            styleType="secondary"
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Annuler
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;