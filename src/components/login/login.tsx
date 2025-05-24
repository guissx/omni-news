"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

type ApiErrorResponse = {
  message?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    try {
      setApiError("");
      
      const response = await axios.post(
        "https://news-letter-backend.vercel.app/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta do login:", response.data);
      
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/admin/CarouselSettingsPage"); // Redireciona após login para area logada
      }
    } catch (error) {
      console.error("Erro no login:", error);
      const axiosError = error as AxiosError<ApiErrorResponse>;
      
      if (axiosError.response) {
        setApiError(axiosError.response.data?.message || "Credenciais inválidas");
      } else {
        setApiError("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <div className="lg:w-[50vw] w-[80vw] flex items-center justify-center bg-white rounded-lg shadow-2xl relative z-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] p-6 bg-white flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        
        {apiError && (
          <div className="mb-4 w-full p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{apiError}</p>
          </div>
        )}

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { 
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4 w-full relative">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Senha:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            {...register("password", { 
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter pelo menos 6 caracteres"
              }
            })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black pr-10"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-9 text-gray-600"
          >
            {passwordVisible ? "👁️" : "👁️‍🗨️"}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors disabled:bg-gray-400 cursor-pointer"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Não tem uma conta?{" "}
            <Link href="/registerPage" className="text-red-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p className="mt-2 text-gray-600">
            <Link href="/forgot-password" className="text-red-600 hover:underline">
              Esqueceu sua senha?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}