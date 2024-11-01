import Layout from "../layout";
import Header from "../components/layout/header";
import Logo from "../components/layout/logo";
import {Button} from "../components/buttons/Buttons";
import {Scanner} from '@yudiel/react-qr-scanner';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { LoaderCircle} from "lucide-react";


export default function AdminScan() {
    const [cameraAccessible, setCameraAccessible] = useState(null);
    const navigate = useNavigate();

    const meta = {
        title: "Scanner",
        description: "Scanner des QR codes",
    };

    useEffect(() => {
        const access = localStorage.getItem("cameraAccessible");
        if (access === "true") {
            requestCameraAccess();
        } else {
            setCameraAccessible(false);
        }
    }, []);

    const requestCameraAccess = () => {
        navigator.mediaDevices.getUserMedia({video: true})
            .then(() => {
                setCameraAccessible(true);
                localStorage.setItem("cameraAccessible", "true");
            })
            .catch(err => {
                console.error("L'accès à la caméra a été refusé :", err);
                setCameraAccessible(false);
                localStorage.setItem("cameraAccessible", "false"); // Mémoriser le refus d'accès
            });
    };

    const handleScan = (data) => {
        if (data) {
            window.location.href = data[0].rawValue;
        }
    };

    const data = {
        name: "La 808 DeVinci",
        description:
            "Salut, ici la 808 devinci pour vous faire vibrer! Rejoignez nous au Pôle pour commencer vos défis",
        avatar_url: "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg",
    };

    return (
        <Layout>
            <Header title={meta.title}/>
            <div className="flex flex-col gap-8 p-6 mt-16">
                <div className="flex flex-col items-start gap-4 text-left">
                    <h1 className="text-4xl font-bold">Créditez des points</h1>
                    <p className="text-base">
                        Scannez un QR Code joueur pour créditer des points
                    </p>
                </div>

                {cameraAccessible === null ? (
                    <div className={"flex flex-col items-center justify-center h-[26rem] gap-3"}>
                        <p className={"text-2xl font-bold"}>Chargement...</p>
                        <LoaderCircle className={"animate-spin h-10 w-10"}/>
                    </div>
                ) : cameraAccessible ? (
                    <Scanner onScan={handleScan}/>
                ) : (
                    <div>
                        <Button onClick={requestCameraAccess} styleType={"primary"}>
                            Activela caméra
                        </Button>
                    </div>
                )}
                <div className='flex flex-col gap-3 p-3'>
                    <h2>Connecté en tant que :</h2>
                    <div className='flex gap-4 p-3 bg-opacity-50 border border-blue-900 rounded-xl items-start'>
                        <Logo path={data.avatar_url} alt={data.alt} className="w-10 h-10"/>
                        <div className='flex flex-col gap-1'>
                            <p>{localStorage.getItem("email")}</p>
                            <p>{data.name}</p>
                        </div>

                    </div>

                    <Button onClick={() => navigate("/login")} styleType={"destructive"}>Déconnexion</Button>
                </div>
            </div>
        </Layout>
    );
}
