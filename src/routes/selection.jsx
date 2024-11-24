import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Buttons";
import Logo from "../components/layout/logo";
import ConfirmationModal from "../components/selection/confirmation-modal";
import SelectAssociationModal from "../components/selection/select-association-modal";
import Layout from "../layout";
import useAssociationStore from "../store/associationStore.js";
import usePasswordStore from "../store/passwordStore.js";
import { createAccount } from "../libs/auth/createAccount.js";

export default function Selection() {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedAssociation, setSelectedAssociation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

    const { associations, getAssociations } = useAssociationStore();
    const { password } = usePasswordStore();
    const { email } = location.state || {};

    const token = localStorage.getItem("token");

    useEffect(() => {
        getAssociations();
    }, [getAssociations]);

    const { handleSubmit } = useForm();

    const onSubmit = () => {
        setIsModalConfirmOpen(true);
    };

    const handleCreateAccount = async () => {
        const username = email.split("@")[0];
        await createAccount(username, email, password, token, selectedAssociation, navigate);
    };

    return (
        <Layout>
            <div className="flex flex-col justify-between min-h-screen px-6 py-32 text-center w-full">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Choisis ton association</h1>
                    <p className="mt-4 text-sm text-gray-300">Pour finir, rejoins ton association. Tu ne peux en choisir qu&apos;une.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
                    <div className="flex flex-col items-start max-w-full">
                        <label htmlFor="association" className="hidden">
                            Association
                        </label>
                        <button
                            type="button"
                            className="flex items-center justify-between w-full gap-3
               p-3 text-sm text-left text-gray-50 bg-opacity-50 border
              border-blue-700 rounded-xl bg-gray-950"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <div className="flex items-center justify-between w-full gap-3">
                                {selectedAssociation ? (
                                    <>
                                        <div className="flex items-center justify-start w-full gap-3">
                                            <Logo
                                                path={selectedAssociation.avatarUrl}
                                                alt={selectedAssociation.name}
                                                className="w-10 h-10"
                                            />
                                            <p className="text-base"> {selectedAssociation.name.toUpperCase()}</p>
                                        </div>
                                        <ChevronDown className="w-6 h-6" />
                                    </>
                                ) : (
                                    <div className="flex items-center justify-between w-full h-10 gap-2">
                                        <p className="font-semibold text-base">Sélectionne une association</p>
                                        <ChevronDown className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                        </button>
                    </div>
                    <Button
                        styleType="primary"
                        type="button"
                        onClick={() => setIsModalConfirmOpen(true)}
                        className={!selectedAssociation && "opacity-50"}
                        disabled={!selectedAssociation}
                    >
                        Finaliser mon inscription
                    </Button>
                </form>

                <div onClick={handleCreateAccount} className="flex flex-col items-center justify-center">
                    <p className="text-blue-400 underline">M&apos;inscrire sans association</p>
                </div>

                {isModalOpen && (
                    <SelectAssociationModal
                        setIsOpen={setIsModalOpen}
                        selectedAssociation={selectedAssociation}
                        associations={associations}
                        setSelectedAssociation={setSelectedAssociation}
                    />
                )}
                {isModalConfirmOpen && (
                    <ConfirmationModal
                        email={email}
                        password={password}
                        setIsOpen={setIsModalConfirmOpen}
                        selectedAssociation={selectedAssociation}
                    />
                )}
            </div>
        </Layout>
    );
}
