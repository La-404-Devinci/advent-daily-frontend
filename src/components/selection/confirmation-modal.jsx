import { ChevronsDown } from "lucide-react";
import { Button } from "../buttons/Buttons";
import Logo from "../layout/logo";
import { useState } from "react";
import { createAccount } from "../../libs/auth/createAccount";
import { loginAccount } from "../../libs/auth/loginAccount";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ConfirmationModal({ setIsOpen, selectedAssociation, email, password, onClose }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true);
        const username = email.split("@")[0];
        try {
            await createAccount(username, email, password, token, selectedAssociation);
            await loginAccount(email, password, navigate);
        } catch {
            toast.error("Une erreur est survenue lors de la création de l'utilisateur", {
                className: "border-red-800 bg-gray-900",
                classNames: {
                    icon: "text-red-800",
                },
            });
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border
            border-blue-950 rounded-2xl bg-[#030712] w-11/12 max-w-[30rem] z-50">
                <h2 className="p-4 text-gray-50 font-bold text-center">Attention : Ce choix est définitif !</h2>
                <hr className="border-blue-950" />
                <div className="flex flex-col no-scrollbar">
                    <div className="flex flex-col items-center w-full gap-3 p-4">
                        {selectedAssociation ? (
                            <>
                                <div
                                    className="flex items-center justify-center w-full gap-3 p-3 text-sm text-left
                text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950"
                                >
                                    <Logo path={selectedAssociation.avatarUrl} alt={selectedAssociation.name} className="w-10 h-10" />
                                    <p className="text-2xl font-bold">{selectedAssociation.name.toUpperCase()}</p>
                                </div>
                                <ChevronsDown className="w-6 h-6" />
                            </>
                        ) : (
                            <p className="text-2xl font-bold">Pas d&apos;association sélectionnée</p>
                        )}
                        <div
                            className="flex items-center justify-center w-full h-16 gap-3 p-3 text-2xl font-bold
                text-center text-gray-50 bg-opacity-50 border border-blue-950 rounded-xl bg-gray-950"
                        >
                            <p className="text-lg font-bold"> {email} </p>
                        </div>
                    </div>
                    <hr className="border-blue-950" />
                    <div className="flex flex-col gap-4 p-4">
                        <Button styleType="primary" type="submit" onClick={onSubmit} disabled={isLoading}>
                            {isLoading ? "Chargement..." : "Je valide mon asso !"}
                        </Button>
                        <Button styleType="secondary" type="button" onClick={() => setIsOpen(false)}>
                            Annuler
                        </Button>
                    </div>
                </div>
            </div>
            <div 
                className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 backdrop-blur-sm filter-active"
                onClick={() => onClose(false)}
            />
        </>
    );
}
