import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import type { FormLoginValues } from "../../types/types";
import { Controller, useForm } from "react-hook-form";


const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const context = useContext(AuthContext);



  const onSubmit = async (data: FormLoginValues) => {
    setIsLoading(true);
    console.log("Submitting login form", data, data.remember);
    try {
      await context.login(data.name, data.password, data.remember);
      console.log("Login successful", data);

      toast("Welcome!", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        closeButton: false,
        hideProgressBar: true,
        style: { background: "transparent", boxShadow: "none", padding: 0 },
      });
    } catch (error) {
      console.log("authError", error);
      const errorMessage = {
        title: "Auth Error",
        body: (error as Error).message,
      };
      toast(`${errorMessage.title}: ${errorMessage.body}`, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        closeButton: false,
        hideProgressBar: true,
        style: { background: "transparent", boxShadow: "none", padding: 0 },
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex max-w-1440 mx-auto min-h-screen">

        <div className=" flex-1 flex flex-col  justify-center items-center">
          <div className="max-w-[360px]">
            <div className="mb-10">
              <img src="/src/assets/svg/logo_with_text.svg" alt="Logo" />
            </div>
            <div className="mb-8">
              <div className="font-bold text-4xl mb-3">Login</div>
              <div className="text-gray-600">Welcome back! Please enter your details.</div>
            </div>
          </div>
        </div>


        <div className="bg-black flex-1 relative p-8">

          <div className="text-end">
            <button className="text-white inline-flex gap-2 items-center justify-center px-3 py-2 bg-gray-800 rounded-lg">
              <img src="/src/assets/svg/life-buoy.svg" />
              Need Help!
            </button>
          </div>

          <img src="/login_lower_logo.png" alt="Login Background" className="absolute bottom-16" />

        </div>
      </div>
    </>
  );
};

export default LoginForm;
