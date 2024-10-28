import { Button } from "../components/buttons/Buttons";
import Layout from "../layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    navigate("/selection", {
      state: {
        email: data.email,
      },
    });
  };

  const meta = {
    title: "Login",
    description: "Login",
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Hey !</h1>
          <p className="mt-4 text-3xl">Bon retour</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4 py-36 "
          >
            <div className="flex flex-col items-start max-w-full">
              <label htmlFor="email">Email</label>
              <input
                className="w-full py-2 pl-3 pr-8 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-blue-900"
                {...register("Email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder="Email"
                value={history.state.usr.email ? history.state.usr.email : ""}
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="password">Mot de passe</label>
              <input
                className="w-full py-2 pl-3 pr-8 mt-2 text-black bg-white border border-gray-300 rounded-md focus:border-blue-900"
                {...register("Password", {
                  required: true,
                  minLength: 8,
                })}
                placeholder="Mot de passe"
              />
            </div>

            {errors.password && <p role="alert">{errors.password.message}</p>}
            {errors.email && <p role="alert">{errors.email.message}</p>}
            <Button styleType="primary" type="submit">
              Connexion
            </Button>
          </form>
          <p>
            J'ai pas de 404ID{" "}
            <span>
              <a href="/" className="font-medium text-blue-400 underline">
                Dommage MDR
              </a>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
