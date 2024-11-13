import Logo from "../layout/logo";

const data = [
    {
        name: "La 808 DeVinci",
        description: "Salut, ici la 808 devinci pour vous faire vibrer! Rejoignez nous au Pôle pour commencer vos défis",
        avatar_url: "https://www.shutterstock.com/image-vector/wireframe-icon-thin-outline-style-260nw-1335621422.jpg"
    }
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

        <section className="flex flex-col gap-4">
            {data.map((asso) => (
                <div key={`asso:${asso.name}`} className="flex items-start gap-4 p-4 border border-blue-900 bg-gray-950 rounded-xl">
                    <Logo path={asso.avatar_url} alt={asso.alt}/>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-medium">{asso.name}</h2>
                        <p className="text-white opacity-75">{asso.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DailyAssosList;