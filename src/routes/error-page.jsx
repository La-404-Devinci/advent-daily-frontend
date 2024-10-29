import {useRouteError, Link} from "react-router-dom";
import {Button} from "../components/buttons/Buttons";
import Layout from "../layout";
import image404 from "../assets/404.png";
import celest from "../assets/celest.png";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Layout>
            <div id="error-page" className="flex flex-col justify-between min-h-screen px-12 py-32 text-center">
                <div>
                    <h1 className="text-4xl font-bold">Oops !</h1>

                    <p className="mt-4 text-3xl opacity-50">
                        La page que vous recherchez n'existe pas
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <img
                        src={image404}
                        alt="404 page not found"
                        className="w-24 h-auto opacity-50"
                        draggable="false"
                    />
                    <img
                        src={celest}
                        alt="404 page not found"
                        className="w-32 h-auto opacity-50"
                        draggable="false"
                    />
                </div>

                <Link to="/">
                    <Button styleType="primary" type="button">
                        Retourner à l'accueil
                    </Button>
                </Link>
            </div>
        </Layout>
    );
}