import celestImage from "../../assets/celest.png";
import Logo from "../layout/logo";

const data = [
    {
        name: "La 808 DeVinci",
        description: "Salut, ici la 808 devinci pour vous faire vibrer ! Rejoignez nous au Pôle pour commencer vos défis",
        avatar_url: "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg"
    },
    {
        name: "Celest",
        description: "Le BDE du pôle Léonard de Vinci, on est là pour vous :)",
        avatar_url: celestImage
    },
];

const DailyAssosList = () => {

    /*    useEffect(() => {
            fetch(`meta.env.API_URL${'/daily'}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, []);*/

    return (

        <section className="flex flex-col gap-2">
            {data.map((asso, index) => (
                <div 
                    key={`asso::daily::${index}`} 
                    className="flex items-start gap-4 p-4 border border-blue-900 bg-gray-900 rounded-xl"
                >
                    <Logo 
                        path={asso.avatar_url} 
                        alt={asso.alt}
                        className="max-w-20"
                    />
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-medium">{asso.name}</h2>
                        <p className="text-gray-300 text-sm leading-tight">
                            {asso.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DailyAssosList;