import { Button } from "../components/buttons/Buttons";
import Layout from "../layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    navigate("/login", {
        state: {
            email: data.email,
        },
    });

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Test !</h1>
          <p className="mt-4 text-3xl">Relève des défis</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-36"
          >
            <div className="flex flex-col items-start max-w-full">
              <label htmlFor="email">Email</label>
              <input
                className="w-full py-2 pl-3 pr-8 mt-2 bg-white border border-gray-300 rounded-md focus:border-blue-900 text-gray-950"
                {...register("email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder="Email"
              />
            </div>

            {errors.email && <p role="alert">{errors.email.message}</p>}
            <Button styleType="primary" type="submit">
              Reçois ton email pour te connecter
            </Button>
          </form>
          <p>
            J'ai déjà un 404ID{" "}
            <span>
              <a href="/login" className="font-medium text-blue-400 underline">
                Me connecter
              </a>
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
