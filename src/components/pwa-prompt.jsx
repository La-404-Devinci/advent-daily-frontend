import PWAPrompt from "react-ios-pwa-prompt";
import {useEffect, useState} from "react";

export default function PwaPrompt() {

    const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false)
    useEffect(() => {
        setShouldShowPWAPrompt(Math.random() < 0.9) //

    }, []);
    return (
        <>
            <PWAPrompt
                copyTitle="Installer l'App"
                copyDescription={"Ajoutez cette app à votre écran d'accueil pour une meilleure expérience !"}
                onAfterInstall={() => {
                    window.location.reload();
                }}
                isShown={shouldShowPWAPrompt}
                appIconPath={"https://static.404devinci.fr/advent/clubs/logo-404.png"}
                copyShareStep={"1. Appuyez sur le bouton de partage"}
                copyAddToHomescreenStep={"2. Appuyez sur 'Ajouter à l'écran d'accueil'"}

            />
        </>
    );
}