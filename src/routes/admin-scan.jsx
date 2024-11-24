import { Scanner } from "@yudiel/react-qr-scanner";
import { LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Buttons";
import Header from "../components/layout/header";
import Logo from "../components/layout/logo";
import Layout from "../layout";

export default function AdminScan() {
    const [cameraAccessible, setCameraAccessible] = useState(null);
    const navigate = useNavigate();

    const grantersToken = JSON.parse(localStorage.getItem("grantersToken"));
    const [club, setClub] = useState(null);

    useEffect(() => {
        if (grantersToken) {
            fetch(`${import.meta.env.VITE_API_URL}/clubs/${grantersToken.clubId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${grantersToken.token}`,
                    "Authorization-Type": "granter",
                },
            })
                .then((response) => response.json())
                .then((response) => setClub(response.response[0].data))
                .catch((error) => console.error(error));
        }
    }, [grantersToken]);

    const meta = {
        title: "Scanner",
        description: "Scanner des QR codes",
    };

    useEffect(() => {
        const access = localStorage.getItem("cameraAccessible");
        if (access === "true") {
            setCameraAccessible(true);
        } else {
            setCameraAccessible(false);
        }
    }, []);

    const requestCameraAccess = useCallback(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(() => {
                setCameraAccessible(true);
                localStorage.setItem("cameraAccessible", "true");
            })
            .catch((err) => {
                console.error("L'accès à la caméra a été refusé :", err);
                setCameraAccessible(false);
                localStorage.setItem("cameraAccessible", "false"); // Mémoriser le refus d'accès
            });
    }, []);

    const handleScan = useCallback(
        (data) => {
            if (data) {
                const rawUrl = data[0].rawValue;
                const userUuid = rawUrl.split("/").pop();
                navigate(`/admin/profile/${userUuid}`);
            }
        },
        [navigate],
    );

    return (
        <Layout>
            <Header title={meta.title} />
            <div className="flex flex-col gap-8 p-6 mt-16">
                <div className="flex flex-col items-start gap-4 text-left">
                    <h1 className="text-4xl font-bold">Créditez des points</h1>
                    <p className="text-base">Scannez un QR Code joueur pour créditer des points</p>
                </div>

                {cameraAccessible === null ? (
                    <div className={"flex flex-col items-center justify-center h-[26rem] gap-3"}>
                        <p className={"text-2xl font-bold"}>Chargement...</p>
                        <LoaderCircle className={"animate-spin h-10 w-10"} />
                    </div>
                ) : cameraAccessible ? (
                    <Scanner constraints={{ aspectRatio: 1, facingMode: "environment" }} onScan={handleScan} />
                ) : (
                    <div>
                        <Button onClick={requestCameraAccess} styleType={"primary"} className="w-full">
                            Activer la caméra
                        </Button>
                    </div>
                )}
                <div className="flex flex-col gap-3 p-3">
                    <h2>Connecté en tant que :</h2>
                    {club ? (
                        <div className="flex items-center gap-4 p-4 border border-blue-900 bg-gray-900 rounded-xl">
                            <Logo path={club.avatarUrl} alt={club.name} className="size-8" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-xl font-medium">{club.name}</h2>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center p-6 border border-blue-900 bg-gray-900 rounded-xl">
                            <span>Chargement ...</span>
                        </div>
                    )}

                    <Button onClick={() => navigate("/auth/login")} styleType={"destructive"}>
                        Déconnexion
                    </Button>
                </div>
            </div>
        </Layout>
    );
}
