import { PrimaryButton } from "../components/buttons/Buttons";
import Layout from "../layout";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Hey !</h1>
          <p className="mt-4 text-3xl">Welcome back</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-36"
          >
            <div className="flex flex-col items-start max-w-full">
              <label htmlFor="email">Email</label>
              <input
                className="w-full py-2 pl-3 mt-2 bg-white border border-gray-300 rounded-md pr-14 focus:border-blue-900"
                {...register("Email", {
                  required: true,
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="password">Password</label>
              <input
                className="w-full py-2 pl-3 mt-2 bg-white border border-gray-300 rounded-md pr-14 focus:border-blue-900"
                {...register("Password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    minLength: 8,
                })}
                placeholder="Password"
              />
            </div>

            {errors.exampleRequired && <span>This field is required</span>}
            <PrimaryButton type={"submit"}>Continue</PrimaryButton>
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
